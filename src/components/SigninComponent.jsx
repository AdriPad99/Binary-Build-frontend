import { useState, useContext, useEffect } from 'react';
import ThemeContext from './ContextComponent';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { response } from 'express';

export default function TestLogin() {

    const [userInfo, setUserInfo] = useState({
        "username": "",
        "password": ""
    })

    const { userToken, setUserToken , setToken} = useContext(ThemeContext)

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    // Handle changes in form inputs
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async () => {
        console.log('user token: ', userToken)
        try{
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
        }
        catch (err){
            //debugger;
            //console.log('this is response', response)
            console.log('hit catch block', err)
        }
        console.log('this is below the catch block')
        // if(response === undefined) {
        //     console.log('response is null')
        // }
        // Check if the request was successful
        if (response.ok) {
            const data = await response.json(); // Parse JSON response
            setIsLoggedIn(true);
            setToken(data['Access token'])
            console.log('access token: ',data['Access token'])
            setUserInfo({
                "username": "",
                "password": ""
            })
        } else {
            // Handle errors, such as displaying a message to the user
            console.error('Failed to fetch:', response.statusText);
        }
    };

    // when all the states are set for the random choices submit to the server
    // useEffect(() => {
    //     if (userToken) {
    //         handleSubmit();
    //     }
    // }, [userToken]);

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
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

                <Form.Group className="mb-3" controlId="formBasicPassword">
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
                Current Token : {userToken}
                <br />
            </div>

            <div>
                Logged In?: {isLoggedIn ? 'yes' : 'no'}

            </div>

        </>
    )
}
