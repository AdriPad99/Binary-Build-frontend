import * as React from 'react';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { styled } from '@mui/system';

import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DropdownMenuComponent() {

    const { token } = useContext(AuthContext)

    // controls the state for opening
    const [isOpen, setIsOpen] = useState(false)

    // used to navigate to different pages
    const navigate = useNavigate()

    // function to toggle if something is open
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }


    return (
        <>
            {/* if user is logged in, display the access to the different methods of managing workouts OR
                if user is not logged in, display nothing */}
            {String(token).length > 4 ? (
                <>
                    {/* if the object is deemed as open, reveal the list of different things to do OR
                        if the object is closed, just show the button in the navbar */}
                    {isOpen ? (
                        <>
                            <Dropdown onOpenChange={toggleOpen}>
                                <MenuButton>Workouts v</MenuButton>
                                <Menu slots={{ listbox: Listbox }}>
                                    <MenuItem onClick={() => navigate('/createCustom')}>
                                        Create a Custom Workout
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/updateCustom')}>
                                        Update a Custom Workout
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/createNormal')}>
                                        Create a Normal Workout
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/updateNormal')}>
                                        Update a Normal Workout
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/createRandom')}>
                                        Create a Random Workout
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate('/getWorkouts')}>
                                        Get All Workouts
                                    </MenuItem>
                                </Menu>

                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <Dropdown onOpenChange={toggleOpen} >
                                <MenuButton>Workouts ^</MenuButton>
                            </Dropdown>

                        </>
                    )}
                </>
            ) : (
                <>

                </>
            )}

        </>
    );
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
