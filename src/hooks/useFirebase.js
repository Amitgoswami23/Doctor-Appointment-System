import { useState, useEffect } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  onAuthStateChanged ,GoogleAuthProvider ,signInWithPopup, updateProfile ,  signOut } from "firebase/auth";

initializeFirebase()

const useFirebase = () =>{
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState('')

    const auth = getAuth();


  //google login
    const Googleprovider = new GoogleAuthProvider()

    //register user
    const registerUser = (email, password, name, history) => {
        setIsLoading(true)
        createUserWithEmailAndPassword(auth, email, password)

        .then((userCredential) => {
         
            setAuthError('');
            const newUser = {email, displayName: name}
            
            setUser(newUser)

            //send name to firebase after creation
              updateProfile(auth.currentUser, {
                displayName: name,
              }).then(() => {
                // Profile updated!
                // ...
              }).catch((error) => {
                // An error occurred
                // ...
              });
            history.replace('/');
        
          })
          .catch((error) => {
            setAuthError(error.message);
        
          })
          
          .finally(()=> setIsLoading(false));
    }

    //login user
    const loginUser = (email, password, location, history) => {

        setIsLoading(true)

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

              //after loading going to the destination
              const destination = location?.state?.from || '/';
              history.replace(destination)
              //end after login going to the destination

              setAuthError('');
            
            })
            .catch((error) => {
                setAuthError(error.message);
            })
            
            .finally(()=> setIsLoading(false));
    }


    const signInWithGoogle = (location, history) =>{
      setIsLoading(true)
      signInWithPopup(auth, Googleprovider)
        .then((result) => {
          
          const user = result.user;
          setAuthError('');
          // ...
        }).catch((error) => {
          setAuthError(error.message);
        })
        
        .finally(()=> setIsLoading(false));

    }

    //objerved user present

    useEffect(()=>{
       const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
              setUser(user)
              
            } else {
              setUser({})
            }

            setIsLoading(false)
          });

          return ()=> unsubscribed
    },[])


    //logout user

    const logOut = () =>{

        setIsLoading(true)

        signOut(auth).then(() => {
            // Sign-out successful.
          }).catch((error) => {
            // An error happened.
          })
          
          .finally(()=> setIsLoading(false));
    }

    return {
        user,
        isLoading,
        registerUser,
        loginUser,
        authError,
        logOut,
        signInWithGoogle

    }

}

export default useFirebase;