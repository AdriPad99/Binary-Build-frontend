import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect } from 'react';

//import { useAuth } from '../context/AuthContext.jsx';
import AuthContext from '../context/AuthContext';

export default function TestLogin() {

    // grabs login function and user token from context
    const { login, token } = useContext(AuthContext)

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
            console.log(data['Access token'])
            login(data['Access token'])
            setUserInfo({
                "username": "",
                "password": ""
            })
        } else {
            // Handle errors, such as displaying a message to the user
            console.error('Failed to fetch:', response.statusText);
        }
    };

    return (
        <>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" >
                    <div>
                        <Form.Label>Username</Form.Label>
                    </div>

                    <Form.Control
                        type="text"
                        name="username"
                        value={userInfo.username}
                        onChange={handleChange}
                        placeholder="Email"
                    />

                    <div>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </div>
                </Form.Group>

                <br />

                <Form.Group className="mb-3">
                    <div>
                        <Form.Label>Password</Form.Label>
                    </div>

                    <Form.Control
                        type="password"
                        name="password"
                        value={userInfo.password}
                        onChange={handleChange}
                        placeholder="Password"
                    />

                </Form.Group>
                <br />
                <Button variant="primary" type="submit">
                    Submit
                </Button>

            </Form>

            <div>
                Current Token : {token}
                <br />
            </div>

            <div>
                ''
                {/* Logged In?: {isLoggedIn ? 'yes' : 'no'} */}

            </div>

            <button onClick={handleSubmit}>Login</button>

        </>
    )
}
