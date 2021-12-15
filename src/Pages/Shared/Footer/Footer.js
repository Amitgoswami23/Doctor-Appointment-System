import { Container, Grid } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <div>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={6} sm={12}>
                        <p>Emergency Dental Care</p>
                        <p>Check Up</p>
                        <p>Dental Extension</p>
                    </Grid>

                    <Grid item xs={6} md={6} sm={12}>
                        <p>Home</p>
                        <p>About</p>
                        <p>Doctor Portal</p>
                        <p>Appointment</p>
                    </Grid>
        
                </Grid>
            </Container>
            <p>Copyright 2021 All rights reserved</p>
        </div>
    )
}

export default Footer
