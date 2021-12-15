import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useLocation, useHistory } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import LoginImage from '../../../images/login.png'

const Login = () => {
    const [loginData, setLoginData] = useState({})
    //import all the things in firebase
    const {user, loginUser, signInWithGoogle, isLoading, authError} = useAuth();

    //location detect
    const location = useLocation()
    const history = useHistory()

    const handleOnChange = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        setLoginData(newLoginData)
    }

    const handleLoginSubmit = e => {

        loginUser(loginData.email, loginData.password, location, history)

        e.preventDefault();
    }

    const handleGoogleSignIn = () =>{
        signInWithGoogle(location, history)
    }
    return (
        <Container>
                <Grid container spacing={2}>
                    <Grid item sx={{mt: 8}} xs={12} md={6} sm={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            Login
                        </Typography>

                        { !isLoading && <form onSubmit={handleLoginSubmit}>
                            <TextField sx={{width: '75%', m:1 }} onChange={handleOnChange} name="email" id="standard-basic" label="Your Email" variant="standard" />
                            <TextField sx={{width: '75%', m:1 }} onChange={handleOnChange} name="password" id="standard-basic" type="password" label="Your Password" variant="standard" />
                            
                            <Button sx={{width: '75%', m:1 }}  variant="contained" type="submit">Login</Button>

                            <NavLink to="/register" style={{textDecoration: 'none'}}>
                                <Button variant="text">New User ? Please Register.</Button>
                            </NavLink>
                        </form>}
                        {isLoading && <CircularProgress />}

                        {user?.email && <Alert severity="success">User Created successfully</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}

                        {/* sign in with google button */}
                        <Button onClick={handleGoogleSignIn} variant="contained" type="submit">Google Sign In</Button>
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                        <img style={{width:'100%'}} src={LoginImage} alt="login-image"></img>
                    </Grid>
        
                </Grid>
        </Container>
    )
}

export default Login
