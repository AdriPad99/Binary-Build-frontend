import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

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
      <Form onSubmit={handleSubmit}>

        <Form.Group>
          <br />
          <Form.Label htmlFor="inputPassword5">Username</Form.Label>
          <br />
          <Form.Control
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            placeholder="Username"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label htmlFor="inputEmail">Email</Form.Label>
          <br />
          <Form.Control
            type="text"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            placeholder="Email"
          />

        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label htmlFor="inputPassword5">Password</Form.Label>
          <br />
          <Form.Control
            type="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            placeholder="Password"
          />
          <br />
          <Form.Text id="passwordHelpBlock" muted>
          </Form.Text>

        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label htmlFor="inputFirstName">First Name</Form.Label>
          <br />
          <Form.Control
            type="text"
            name="first_name"
            value={userInfo.first_name}
            onChange={handleChange}
            placeholder="First Name"
          />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label htmlFor="inputLastName">Last Name</Form.Label>
          <br />
          <Form.Control
            type="text"
            name="last_name"
            value={userInfo.last_name}
            onChange={handleChange}
            placeholder="Last Name"
          />

        </Form.Group>
        <br />
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  )
}
