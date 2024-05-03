import { useState, useContext } from 'react';
import { tokenContext } from '../App';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function SignupComponent() {

  const [userInfo, setUserInfo] = useState({
    "username": "",
    "email": "",
    "password": "",
    "first_name": "",
    "last_name": ""
  });

  const [isLoggedIn, setIsLoggedIn] = useContext(tokenContext);

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
    const response = await fetch('http://127.0.0.1:5000/signup', {
      method: 'POST', // Method itself
      headers: {
        'Content-Type': 'application/json' // Indicates the content 
      },
      body: JSON.stringify({
        "username": userInfo.username,
        "email": userInfo.email,
        "password": userInfo.password,
        "first_name": userInfo.first_name,
        "last_name": userInfo.last_name

      }) // We send data in JSON format
    });
    // Check if the request was successful
    if (response.ok) {
      const data = await response.json(); // Parse JSON response
      setIsLoggedIn(true);
      setUserInfo({
        "username": "",
        "email": "",
        "password": "",
        "first_name": "",
        "last_name": ""
      })
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
            Your password must be 8-20 characters long, contain letters and numbers,
            and must not contain spaces, special characters, or emoji.
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
