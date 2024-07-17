import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

//import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Chip from '@mui/joy/Chip';
import Box from '@mui/joy/Box';
//import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import CardActions from '@mui/joy/CardActions';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import SvgIcon from '@mui/joy/SvgIcon';

export default function UserProfileComponent() {

    const { token } = useContext(AuthContext);

    const [userInfo, setUserInfo] = useState();

    // Combined state for all user data
    const [userData, setUserData] = useState({
        age: "",
        gender: "",
        height: "",
        weight: "",
        email: "",
        firstName: "",
        lastName: "",
        username: "",
    });

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await fetch('https://capstone-db.onrender.com/signup/1');
                if (response.ok) {
                    const data = await response.json();
                    setUserInfo(data);
                    setUserData({
                        email: data.email || '',
                        firstName: data.first_name || '',
                        lastName: data.last_name || '',
                        username: data.username || '',
                        age: data.age || '',
                        gender: data.gender || '',
                        height: data.height || '',
                        weight: data.weight || '',
                        target_weight: data.target_weight || '',
                        target_body_fat_percentage: data.target_body_fat_percentage || '',
                        fitness_level: data.fitness_level || '',
                        daily_activity_level: data.daily_activity_level || '',
                        pref_workout_types: data.pref_workout_types || '',
                        pref_workout_duration: data.pref_workout_duration || '',
                        available_equipment: data.available_equipment || '',
                        chest: data.chest || '',
                        waist: data.waist || '',
                        hips: data.hips || '',
                        amnt_workouts_completed: data.amnt_workouts_completed || '',
                    });
                } else {
                    console.error("Failed to fetch user data:", response.statusText);
                    // Handle errors or set default values here
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        getUserData();
    }, [token]); // Assuming token is correctly triggering useEffect when it changes

    const test = () => {
        console.log(userInfo)
        console.log(userData)
    }


    return (
        <>
        <button onClick={test}>test</button>
            <div className='id'>
                <Card
                    sx={{
                        width: 320,
                        maxWidth: '100%',
                        boxShadow: 'lg',
                    }}
                >
                    <CardContent sx={{ alignItems: 'center', textAlign: 'center' }}>
                        <Avatar src="/static/images/avatar/1.jpg" sx={{ '--Avatar-size': '4rem' }} />
                        <Typography level="title-lg">{userData.firstName} {userData.lastName} ({userData.username})</Typography>
                        <Typography level="body-sm" sx={{ maxWidth: '24ch' }}>
                            Hello, this is my bio and I am a Student currently attending the Coding Temple program.
                            <hr />
                            Contact Me: {userData.email}
                        </Typography>
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 2,
                                mt: 2,
                                '& > button': { borderRadius: '2rem' },
                            }}
                        >
                        </Box>
                    </CardContent>
                    <CardOverflow sx={{ bgcolor: 'background.level1' }}>
                    </CardOverflow>
                </Card>
            </div>
        </>
    )
}
