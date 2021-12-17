import { Alert, Button, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'

const MakeAdmin = () => {

    const[email, setEmail] = useState('')
    const[success, setSuccess] = useState(false)
    const {token} = useAuth()

    const handleOnBlur = e =>{
        setEmail(e.target.value)
    }

    const handleAdminSubmit = e =>{
        const user = { email }
        fetch('http://localhost:5000/users/admin', {
            method: 'PUT',
            headers:{
                'authorization' : `Bearer ${token}`,
                'content-type':'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response=>response.json())
        .then(data=>{
            if(data.modifiedCount){
                console.log(data)
                setSuccess(true)
                setEmail('')
            }
            
        })
        e.preventDefault()
    }

    return (
        <div>
            <h2>Make Admin</h2>
            <form onSubmit={handleAdminSubmit}>
                <TextField sx={{width: '50%'}} type="email" onBlur={handleOnBlur} label="Email" variant="standard" />
                <Button type="submit" variant="contained">Make Admin</Button>
            </form>
            {success && <Alert severity="success">Admin Added successfully</Alert>}
        </div>
    )
}

export default MakeAdmin
