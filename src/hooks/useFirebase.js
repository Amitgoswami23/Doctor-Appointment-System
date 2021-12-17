import { useState, useEffect } from "react";
import initializeFirebase from "../Pages/Login/Firebase/firebase.init";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,  onAuthStateChanged ,GoogleAuthProvider ,signInWithPopup, updateProfile , getIdToken,  signOut } from "firebase/auth";

initializeFirebase()

const useFirebase = () =>{
    const [user, setUser] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [authError, setAuthError] = useState('')
    const [admin, setAdmin] = useState(false)
    const [token, setToken] = useState('')

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

            //save user to the database
            saveUser(email, name, 'POST')

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
          saveUser(user.email, user.displayName, 'PUT')
          setAuthError('');

          //after login send to the proper destination
          const destination = location?.state?.from || '/';
          history.replace(destination)

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
              getIdToken(user)
              .then(idToken => {
                  setToken(idToken)
              })
              
            } else {
              setUser({})
            }

            setIsLoading(false)
          });

          return ()=> unsubscribed
    },[])


    const saveUser = (email, displayName, method) =>{
        const user = {email, displayName};
        fetch('http://localhost:5000/users', {
          method: method,
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(user)
        })
        .then()
    }


    //finding admin by useing email address
    useEffect(()=> {
      fetch(`http://localhost:5000/users/${user.email}`)
        .then(response => response.json())
        .then(data => setAdmin(data.admin))
    }, [user.email])


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
        admin,
        token,
        isLoading,
        registerUser,
        loginUser,
        authError,
        logOut,
        signInWithGoogle

    }

}

export default useFirebase;