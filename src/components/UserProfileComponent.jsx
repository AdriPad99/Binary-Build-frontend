import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { Form, Button } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

export default function UserProfileComponent() {

    const { token } = useContext(AuthContext);

    //const [formBool, setFormBool] = useState(false)

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
                const response = await fetch('http://127.0.0.1:5000/signup/1');
                if (response.ok) {
                    const data = await response.json();
                    setUserData({
                        email: data.email || '',
                        firstName: data.first_name || '',
                        lastName: data.last_name || '',
                        username: data.username || '',
                        age: data.age || '',
                        gender: data.gender || '',
                        height: data.height || '',
                        weight: data.weight || '',
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
    

    // Handle form submission for updating a workout
    // const handleUpdate = async (event) => {
    //     event.preventDefault(); // Prevent the default form submit behavior
    //     const response = await fetch(`http://127.0.0.1:5000/signup/1`, {
    //         method: 'PUT', // sets method
    //         headers: {
    //             'Content-Type': 'application/json' // Indicates the content 
    //         }
    //         ,
    //         // body: JSON.stringify(userData)
    //         body: JSON.stringify({
    //             "username": userData.username,
    //             "email": userData.email,
    //             "first_name": userData.firstName,
    //             "last_name": userData.lastName,
    //             "age": userData.age,
    //             "gender": userData.gender,
    //             "height": userData.height,
    //             "weight": userData.weight,
    //         }),
    //     }
    //     );
    //     console.log(userData)
    //     // if successful
    //     if (response.ok) {
    //         console.log(`${userData.firstName} successfully updated workout!`)
    //         setUserInputs({
    //             "age": "",
    //             "gender": "",
    //             "height": "",
    //             "weight": "",
    //         })
    //         // resets the user chosen workout number to delete
    //     } else {
    //         // handles the errors
    //         console.error('Failed to update the workout:', response.statusText);
    //     }
    // }

    // Handle changes in form inputs and displays them on screen as they happen
    // const handleChange = (event) => {
    //     const { name, value } = event.target;
    //     setUserData(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    // };

    // const toggleForm = () => {
    //     setFormBool(!formBool)
    // }

    const test = () => {
        console.log(userData);
    }

    return (
        <>
            <button onClick={test}>Test button</button>

            <div>
                <div></div>
                <div>First Name: {userData.firstName}</div>
                <div>Last Name: {userData.lastName}</div>
                <div>Username: {userData.username}</div>
                <div>Email: {userData.email}</div>
                {/* <Form onSubmit={handleUpdate}>
                    <div>
                        Age: {userData.age}
                        {formBool ? (
                            <>
                                <Form.Group>
                                    <Form.Label>Age</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="age"
                                        value={userData.age}
                                        onChange={handleChange}
                                        placeholder="Age"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update Age
                                </Button>

                            </>
                        ) : (
                            <>
                                <button onClick={toggleForm}> Change Age</button>
                            </>
                        )}
                    </div>
                    <br />
                    <div>
                        Gender: {userData.gender}
                        {formBool ? (
                            <>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="gender"
                                        value={userData.gender}
                                        onChange={handleChange}
                                        placeholder="Gender"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update Gender
                                </Button>
                            </>
                        ) : (
                            <>
                                <button onClick={toggleForm}> Change Gender</button>
                            </>
                        )}
                    </div>
                    <br />
                    <div>
                        Height: {userData.height}
                        {formBool ? (
                            <>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="height"
                                        value={userData.height}
                                        onChange={handleChange}
                                        placeholder="height"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update Height
                                </Button>
                            </>
                        ) : (
                            <>
                                <button onClick={toggleForm}> Change Height</button>
                            </>
                        )}
                    </div>
                    <br />
                    <div>
                        Weight: {userData.weight}
                        {formBool ? (
                            <>
                                <Form.Group>
                                    <Form.Control
                                        type="text"
                                        name="weight"
                                        value={userData.weight}
                                        onChange={handleChange}
                                        placeholder="Weight"
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Update Weight
                                </Button>
                            </>
                        ) : (
                            <>
                                <button onClick={toggleForm}> Change Weight</button>
                            </>
                        )}
                    </div>
                </Form> */}
            </div>
        </>
    )
}
