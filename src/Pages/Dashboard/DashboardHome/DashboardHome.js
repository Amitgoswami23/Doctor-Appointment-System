import React from 'react'
import Grid from '@mui/material/Grid';
import Calender from '../../Shared/Calender/Calender';
import Appoinments from '../Appointments/Appoinments';
import { useState } from 'react';

const DashboardHome = () => {
    const [date, setDate] = useState(new Date())
    return (
        <div>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Calender date={date} setDate={setDate} />
              </Grid>
              <Grid item xs={8}>
                <Appoinments date={date} />
              </Grid>
            </Grid>
        </div>
    )
}

export default DashboardHome
