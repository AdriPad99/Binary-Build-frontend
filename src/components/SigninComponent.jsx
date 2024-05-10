import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import AuthContext from '../context/AuthContext';

import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';

export default function TestLogin() {

    const navigate = useNavigate();

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
        const response = await fetch('http://127.0.0.1:5000/login', {
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

            <Form onSubmit={handleSubmit}>

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
                    <Typography level="title-lg" startDecorator={<InfoOutlined />}>
                        Sign Into Binary Build
                    </Typography>
                    <Divider inset="none" />
                    <CardContent
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
                            gap: 1.5,
                        }}
                    >
                        <FormControl sx={{ gridColumn: '1/-1' }}>
                            <FormLabel>Username: </FormLabel>
                            <Input onChange={handleChange} type='text' value={userInfo.username} name="username" placeholder="Enter Your username" />
                        </FormControl>

                        <FormControl sx={{ gridColumn: '1/-1' }}>
                            <FormLabel>Password: </FormLabel>
                            <Input onChange={handleChange} type='password' name='password' value={userInfo.password} placeholder="Enter your password" />
                        </FormControl>

                        <CardActions sx={{ gridColumn: '1/-1' }}>
                            <Button type='submit' variant="solid" color="primary">
                                Sign-In
                            </Button>
                        </CardActions>
                    </CardContent>
                </Card>
            </Form>
        </div>

        </>
    )
}
