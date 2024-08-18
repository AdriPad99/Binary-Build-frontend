import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

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

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export default function SignupComponent() {

  // assigns navigate function to variable
  const navigate = useNavigate();

  const [errorText, setErrorText] = useState();

  const defaultSummary = 'Hello! welcome to my profile!';

  //Snackbar information/////////////////////////
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  ///////////////////////////////////////////////

  // holds empty state for each user input category
  const [userInfo, setUserInfo] = useState({
    "username": "",
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": "",
    "summary" : defaultSummary
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
    if (!userInfo['username'] && !userInfo['password'] && !userInfo['email']  && !userInfo['first_name'] && !userInfo['last_name']) {
      setErrorText('fields')
      handleClick();
    }
    else if(!userInfo['username'] || !userInfo['password']){
      setErrorText('username or password')
      handleClick();
    }
    else if (!userInfo['email']){
      setErrorText('email')
      handleClick();
    }
    else if (!userInfo['first_name']){
      setErrorText('first name')
      handleClick();
    }
    else if (!userInfo['last_name']){
      setErrorText('last name')
      handleClick();
    }
    else if (!userInfo['summary']){
      setErrorText('summary')
      handleClick();
    }
    else{
      const response = await fetch('https://capstone-db.onrender.com/signup', {
        
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
          "last_name": userInfo.last_name,
          "summary" : userInfo.summary
        })
      });
      // if successful request
      if (response.ok) {
        // log out it was successfully added
        console.log('Sign up created successfully!')
        navigate('/');
      } else {
        console.log(userInfo)
        // Handle errors, such as displaying a message to the user
        handleClick()
        console.error('Failed to fetch:', response.statusText);
      }
    }
  };

  return (
    <>
    {/* test segment */}
    {/* <button onClick={() => console.log(userInfo.summary, userInfo.username, userInfo.email, userInfo.first_name, userInfo.last_name)}>test</button> */}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity='error'
          variant="filled"
          sx={{ width: '100%' }}
        >
          Please enter/correct the {errorText}.
        </Alert>
      </Snackbar>

      <div className='id'>

        {/* start of the form for the user to fill out.
          make an api call when submitted. */}
        <Form onSubmit={handleSubmit}>

          {/* contains the content for the sign in window */}
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

            <h1>Temporarily Unavailable</h1>
          </Card>
        </Form>
      </div>

      <br />
      <br />
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