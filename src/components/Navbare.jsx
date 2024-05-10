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

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (

    <div className='navcolor'>

    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
        <img src='images/logo3.png' alt='bodybuilder in binary' width='150' height='150'/>

          <Box>
              <Button>
              <a id='middle' href="/">Home</a>
              </Button>
          </Box>


          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button>
              {String(token).length > 4 ? (
            <>
              <a id='middle'href="/signup">Try for Free</a>
            </>
          ) : (
            <>
            <a id='middle' href="/signin">Sign-In</a>
            <a id='middle' href="/signup">Try for Free</a>
            </>
          )}
              </Button>

              <Button>
              <DropdownMenuComponent/>
              </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
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
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">
                  {String(token).length > 4 ? (
                    <>
                    <a id='profile' href="/profile">Profile</a>
                    <hr/>
                    <a id='profile' onClick={() => userLogout()} href="/signin">Sign-Out</a>
                    </>
                  ) : (
                    <>
                    <a id='profile' href="/signin">Sign-In</a>
                    <hr/>
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
    </div>
  );
}
export default Navbare;