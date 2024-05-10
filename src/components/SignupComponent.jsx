import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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

export default function SignupComponent() {

  // assigns navigate function to variable
  const navigate = useNavigate();

  // holds empty state for each user input category
  const [userInfo, setUserInfo] = useState({
    "username": "",
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": ""
  });

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
    // fetches from server
    const response = await fetch('http://127.0.0.1:5000/signup', {
      // sets the method
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // Indicates the content 
      },
      // takes the inputed values from the form and assigns them to the appropriate body detail
      body: JSON.stringify({
        "username": userInfo.username,
        "email": userInfo.email,
        "password": userInfo.password,
        "first_name": userInfo.first_name,
        "last_name": userInfo.last_name

      })
    });
    // if successful request
    if (response.ok) {
      // log out it was successfully added
      console.log('Sign up created successfully!')
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
            Sign Up Binary Build
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
              <FormLabel>Email: </FormLabel>
              <Input onChange={handleChange} type='text' value={userInfo.email} name="email" placeholder="Enter Your email" />
            </FormControl>

            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>Password: </FormLabel>
              <Input onChange={handleChange} type='password' name='password' value={userInfo.password} placeholder="Enter your password" />
            </FormControl>

            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>First Name: </FormLabel>
              <Input onChange={handleChange} type='text' value={userInfo.first_name} name="first_name" placeholder="Enter Your first name" />
            </FormControl>

            <FormControl sx={{ gridColumn: '1/-1' }}>
              <FormLabel>Username: </FormLabel>
              <Input onChange={handleChange} type='text' value={userInfo.last_name} name="last_name" placeholder="Enter Your last name" />
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
