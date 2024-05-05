import { useState, useContext, useEffect } from 'react';
import { TokenContext } from '../contexts/ContextComponent'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function TestLogin() {

    const [userInfo, setUserInfo] = useState({
        "username": "",
        "password": ""
    })

    const {userToken, setUserToken} = useContext(TokenContext);

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
            setUserToken(data['Access token'])
            setUserInfo({
              "username": "",
              "password": ""
            })
        } else {
            // Handle errors, such as displaying a message to the user
            console.error('Failed to fetch:', response.statusText);
        }
        console.log(userToken)
    };



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
                ''
                {/* Current Token : {userToken} */}
                <br />
            </div>

            <div>
                ''
                {/* Logged In?: {isLoggedIn ? 'yes' : 'no'} */}

            </div>

        </>
    )
}

// import { useState, useContext, useEffect } from 'react';
// import ThemeContext from './ContextComponent';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import { response } from 'express';

// export default function TestLogin() {

//     const [userInfo, setUserInfo] = useState({
//         "username": "",
//         "password": ""
//     })

//     const { userToken, setUserToken , setToken} = useContext(ThemeContext)

//     const [isLoggedIn, setIsLoggedIn] = useState(false)

//     // Handle changes in form inputs
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         setUserInfo(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     // Handle form submission
//     const handleSubmit = async () => {
//         console.log('user token: ', userToken)
//         const response = await fetch('http://127.0.0.1:5000/login', {
//             method: 'POST', // Method itself
//             headers: {
//                 'Content-Type': 'application/json' // Indicates the content 
//             },
//             body: JSON.stringify({
//                 "username": userInfo.username,
//                 "password": userInfo.password
//             }) // We send data in JSON format
//         });
        
//         if (response.ok) {
//             const data = await response.json(); // Parse JSON response
//             setIsLoggedIn(true);
//             setToken(data['Access token'])
//             console.log('access token: ',data['Access token'])
//             setUserInfo({
//                 "username": "",
//                 "password": ""
//             })
//         } else {
//             // Handle errors, such as displaying a message to the user
//             console.error('Failed to fetch:', response.statusText);
//         }
//     };

//     // when all the states are set for the random choices submit to the server
//     // useEffect(() => {
//     //     if (userToken) {
//     //         handleSubmit();
//     //     }
//     // }, [userToken]);

//     return (
//         <>
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <div>
//                         <Form.Label>Username</Form.Label>
//                     </div>

//                     <Form.Control
//                         type="text"
//                         name="username"
//                         value={userInfo.username}
//                         onChange={handleChange}
//                         placeholder="Email"
//                     />

//                     <div>
//                         <Form.Text className="text-muted">
//                             We'll never share your email with anyone else.
//                         </Form.Text>
//                     </div>
//                 </Form.Group>

//                 <br />

//                 <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <div>
//                         <Form.Label>Password</Form.Label>
//                     </div>

//                     <Form.Control
//                         type="password"
//                         name="password"
//                         value={userInfo.password}
//                         onChange={handleChange}
//                         placeholder="Password"
//                     />

//                 </Form.Group>
//                 <br />
//                 <Button variant="primary" type="submit">
//                     Submit
//                 </Button>

//             </Form>

//             <div>
//                 Current Token : {userToken}
//                 <br />
//             </div>

//             <div>
//                 Logged In?: {isLoggedIn ? 'yes' : 'no'}

//             </div>

//         </>
//     )
// }
