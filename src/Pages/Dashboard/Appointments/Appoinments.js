import React, { useState } from 'react'
import { useEffect } from 'react'
import useAuth from '../../../hooks/useAuth'

const Appoinments = () => {

    const{ user } = useAuth()
    const[appointments, setAppointments] = useState([])

    useEffect(()=>{
        fetch('')
    }, [])

    return (
        <div>
            Appoinments
        </div>
    )
}

export default Appoinments
