import { useContext, useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function TestLogin() {

    const navigate = useNavigate();

    // grabs token from context
    const { assignUserId, userId } = useContext(AuthContext)

    // grabs login function and user token from context
    const { login } = useContext(AuthContext)

    // holds fields for needed information
    const [userInfo, setUserInfo] = useState({
        "username": "",
        "password": ""
    })

    // Handle changes in form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch('https://capstone-db.onrender.com/login', {
            method: 'POST', // Method itself
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            },
            body: JSON.stringify({
                "username": userInfo.username,
                "password": userInfo.password
            }) // We send data in JSON format
        });
        // Check if the request was successful
        if (response.ok) {
            const data = await response.json(); // Parse JSON response
            // sets the context token to the access token passed as the response
            login(data['Access token'])
            navigate('/');
        } else {
            // Handle errors, such as displaying a message to the user
            console.error('Failed to fetch:', response.statusText);
        }
    };

    return (
        <>

            <div className='id'>

                {/* start of the form for the users input */}
                <Form onSubmit={handleSubmit}>

                    {/* responsible for the details of the box that contains the content */}
                    <Card
                        variant="outlined"
                        sx={{
                            maxHeight: 'max-content',
                            maxWidth: '100%',
                            mx: 'auto',
                            // to make the demo resizable
                            overflow: 'auto',
                            resize: 'horizontal',
                        }}
                    >
                        {/* The top tile of the card telling the user to sign in */}
                        <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                            Sign Into Binary Build
                        </Typography>

                        {/* The divider between the title of the sign in box and the other input fields */}
                        <Divider inset="none" />

                        {/* controls the layout of the form */}
                        <CardContent
                            sx={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                                gap: 1.5,
                            }}
                        >

                            {/* username segment of the sign in window */}
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel>Username: </FormLabel>
                                <Input onChange={handleChange} type='text' value={userInfo.username} name="username" placeholder="Enter Your username" />
                            </FormControl>

                            {/* password segment of the password window */}
                            <FormControl sx={{ gridColumn: '1/-1' }}>
                                <FormLabel>Password: </FormLabel>
                                <Input onChange={handleChange} type='password' name='password' value={userInfo.password} placeholder="Enter your password" />
                            </FormControl>

                            {/* details of the button positioning */}
                            <CardActions sx={{ gridColumn: '1/-1' }}>

                                {/* responsible for the button of the bottom of the sign in window */}
                                <BootstrapButton type='submit' variant="contained" disableRipple>
                                    Sign-In
                                </BootstrapButton>
                            </CardActions>
                        </CardContent>
                    </Card>
                </Form>
            </div>

        </>
    )
}

const BootstrapButton = styled(Button)({
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
    },
    '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
    },
    '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
});