import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import DropdownMenuComponent from './DropdownMenuComponent';

function Navbare() {

  // grabs the token and logout function from context
  const { token, logout } = useContext(AuthContext);

  // calls the logout function from the context to logout the user
  const userLogout = () => {
    logout();
  }

  // state related stuff for the menus
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
      // The start of the navbar being created
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* image of the body builder on the navbar */}
            <img src='/images/logo3.png' alt='bodybuilder in binary' width='150' height='150' />

            {/* button linking to the home page */}
            <Box>
              <Button>
                <a id='middle' href="/">Home</a>
              </Button>
            </Box>

            {/* Controls the contents of the profile menu dropdown */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {/* if user is logged in, have an option for the sign-in page OR
                  if the user is logged out show options for the sign-in page or sign-up page */}
              <Button>
                {String(token).length > 4 ? (
                  <>
                    <a id='middle' href="/signup">Try for Free</a>
                  </>
                ) : (
                  <>
                    <a id='middle' href="/signin">Sign-In</a>
                    <a id='middle' href="/signup">Try for Free</a>
                  </>
                )}
              </Button>

              {/* shows the workouts dropdown menu on the navbar assuming the user is logged in
                  if not logged in, it won't show up on the navbar */}
              <Button>
                <DropdownMenuComponent />
              </Button>
            </Box>

            {/* Everything below this is for the profile things in the top right */}
            <Box sx={{ flexGrow: 0 }}>
              {/* shows a tooltip if you hover on the prifile icon */}
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  {/* controls the image for the profile picture */}
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              {/* Everything below is responsible for the menu and its controls */}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                {/* This is responsible for the mini menu popup after clicking the profile image */}
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">

                    {/* if user is logged in, the user hass access to their profile and sign-out capabilities OR
                        if user is logged out, display the ability to sign in or sign up */}
                    {String(token).length > 4 ? (
                      <>
                        <a id='profile' href="/profile">Profile</a>
                        <hr />
                        <a id='profile' onClick={() => userLogout()} href="/signin">Sign-Out</a>
                      </>
                    ) : (
                      <>
                        <a id='profile' href="/signin">Sign-In</a>
                        <hr />
                        <a id='profile' href="/signup">Try for Free</a>
                      </>
                    )}
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
  );
}
export default Navbare;