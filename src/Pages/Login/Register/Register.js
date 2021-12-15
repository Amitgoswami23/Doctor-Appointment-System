import { Alert, Button, CircularProgress, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import LoginImage from '../../../images/login.png'

const Register = () => {
    const [loginData, setLoginData] = useState({})
    
    const history = useHistory()

    const {user, registerUser, isLoading, authError} = useAuth();

    const handleOnBlur = e =>{
        const field = e.target.name;
        const value = e.target.value;
        const newLoginData = {...loginData};
        newLoginData[field] = value;
        console.log(newLoginData)
        setLoginData(newLoginData)
    }

    const handleLoginSubmit = e => {
        if(loginData.password !== loginData.password2){
            alert("Your password does not match")
            return;
        }

        registerUser(loginData.email, loginData.password, loginData.name, history)
        e.preventDefault();
    }

    return (
        <Container>
                <Grid container spacing={2}>
                    <Grid item sx={{mt: 8}} xs={12} md={6} sm={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            Register
                        </Typography>

                        { !isLoading && <form onSubmit={handleLoginSubmit}>
                            <TextField sx={{width: '75%', m:1 }} onBlur={handleOnBlur} name="name" id="standard-basic" type="text" label="Your Name" variant="standard" />
                            <TextField sx={{width: '75%', m:1 }} onBlur={handleOnBlur} name="email" id="standard-basic" type="email" label="Your Email" variant="standard" />
                            <TextField sx={{width: '75%', m:1 }} onBlur={handleOnBlur} name="password" id="standard-basic" type="password" label="Your Password" variant="standard" />
                            <TextField sx={{width: '75%', m:1 }} onBlur={handleOnBlur} name="password2" id="standard-basic" type="password" label="Confirm Password" variant="standard" />

                            <Button sx={{width: '75%', m:1 }}  variant="contained" type="submit">Register</Button>

                            <NavLink to="/login" style={{textDecoration: 'none'}}>
                                <Button variant="text">Already registerd ? Please Login.</Button>
                            </NavLink>
                        </form>}

                        {isLoading && <CircularProgress />}

                        {user?.email && <Alert severity="success">User Created successfully</Alert>}
                        {authError && <Alert severity="error">{authError}</Alert>}
                    </Grid>

                    <Grid item xs={12} md={6} sm={12}>
                        <img style={{width:'100%'}} src={LoginImage} alt="login-image"></img>
                    </Grid>
        
                </Grid>
        </Container>
    )
}

export default Register
