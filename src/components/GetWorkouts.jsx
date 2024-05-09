import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";

import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';

export default function GetWorkouts() {

    // grabs token from context
    const { token } = useContext(AuthContext);

    // set state for whether or not the box is open
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        // fetches the workout endpoint to grab all the workouts
        const getDBData = async () => {

            // fetches the server api that has all the workouts
            const res = await fetch('http://127.0.0.1:5000/workouts')
            if (res.ok) {
                const data = await res.json();
                setUserData(data)
            }
            // if not error out
            else {
                console.error("Couldn't get the workouts :(")
                console.log(user)
            }
        }

        getDBData();
    }, [])

    // Handle form submission for deleting a workout
    const handleDelete = async (id) => {
        //event.preventDefault(); // Prevent the default form submit behavior
        const response = await fetch(`http://127.0.0.1:5000/workouts/${id}`, {
            method: 'DELETE', // sets method
            headers: {
                'Content-Type': 'application/json' // Indicates the content 
            }
        });
        // if successful
        if (response.ok) {
            setUserData(prevUserData => prevUserData.filter(user => user.workout_id !== id));
            console.log('successfully deleted')
        } else {
            // handles the errors
            console.error('Failed to delete workout:', response.statusText);
        }
    }

    const toggleNewWorkoutBox = async () => {
        setIsOpen(!isOpen)
        const res = await fetch('http://127.0.0.1:5000/workouts')
    }

    // state for fetched data
    const [userData, setUserData] = useState([])



    return (
        <>
            <Dropdown onOpenChange={toggleNewWorkoutBox}>
                {isOpen ? (
                    <>
                        <MenuButton>Your Workouts v</MenuButton>
                        <div className="parent-container">
                            {userData && userData.length > 0 ? (
                                userData.map((user, i) => (
                                    <div key={i} id="test">
                                        <h3>
                                            Workout Id: {user.workout_id} <br />
                                            Day: {user.day} <br />
                                            Equipment: {user.equipment}<br />
                                            Muscle group: {user.muscle_group}<br />
                                            Rep Range: {user.rep_range} reps <br />
                                            Weight range: {user.weight_range} lbs<br />
                                            Workout variation: {user.workout_variation}
                                            <br />
                                            <button onClick={() => handleDelete(user.workout_id)}>Delete Workout</button>
                                        </h3>
                                    </div>
                                ))
                            ) : (
                                <p>No workouts found. Please add some workouts.</p>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <Dropdown onOpenChange={toggleNewWorkoutBox}>
                            <MenuButton>Your Workouts ^</MenuButton>
                        </Dropdown>
                    </>
                )}
            </Dropdown>
        </>
    )
}

const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'};
    z-index: 1;
    `,
);

const MenuItem = styled(BaseMenuItem)(
    ({ theme }) => `
    list-style: none;
    padding: 8px;
    border-radius: 8px;
    cursor: default;
    user-select: none;
  
    &:last-of-type {
      border-bottom: none;
    }
  
    &:focus {
      outline: 3px solid ${theme.palette.mode === 'dark' ? blue[600] : blue[200]};
      background-color: ${theme.palette.mode === 'dark' ? grey[800] : grey[100]};
      color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    }
  
    &.${menuItemClasses.disabled} {
      color: ${theme.palette.mode === 'dark' ? grey[700] : grey[400]};
    }
    `,
);

const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    line-height: 1.5;
    padding: 8px 16px;
    border-radius: 8px;
    color: white;
    transition: all 150ms ease;
    cursor: pointer;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[200] : grey[900]};
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  
    &:hover {
      background: ${theme.palette.mode === 'dark' ? grey[800] : grey[50]};
      border-color: ${theme.palette.mode === 'dark' ? grey[600] : grey[300]};
    }
  
    &:active {
      background: ${theme.palette.mode === 'dark' ? grey[700] : grey[100]};
    }
  
    &:focus-visible {
      box-shadow: 0 0 0 4px ${theme.palette.mode === 'dark' ? blue[300] : blue[200]};
      outline: none;
    }
    `,
);
