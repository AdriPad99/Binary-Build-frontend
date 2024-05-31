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
import Divider from '@mui/material/Divider';
import DropdownMenuComponent from './DropdownMenuComponent';

function Navbare() {
  const { token, logout } = useContext(AuthContext);

  const userLogout = () => {
    logout();
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'white',
    margin: '0 10px'
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src='/images/logo3.png' alt='bodybuilder in binary' width='150' height='150' />
          <Box>
            <Button>
              <a style={linkStyle} id='middle' href="/">Home</a>
            </Button>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {String(token).length > 4 ? (
              <a style={linkStyle} id='middle' href="/signup">
                <Button style={{ color: 'white' }}>Try for Free</Button>
              </a>
            ) : (
              <>
                <a style={linkStyle} id='middle' href="/signin">
                  <Button style={{ color: 'white' }}>Sign-In</Button>
                </a>
                <a style={linkStyle} id='middle' href="/signup">
                  <Button style={{ color: 'white' }}>Try for Free</Button>
                </a>
              </>
            )}
            <DropdownMenuComponent />
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
                      <a style={linkStyle} id='profile' href="/profile">Profile</a>
                    </>
                  ) : (
                    <>
                      <a style={linkStyle} id='profile' href="/signin">Sign-In</a>
                    </>
                  )}
                </Typography>
                <Divider />
                <Typography textAlign="center">
                  {String(token).length > 4 ? (
                    <a style={linkStyle} id='profile' onClick={() => userLogout()} href="/signin">Sign-Out</a>
                  ) : (
                    <a style={linkStyle} id='profile' href="/signup">Try for Free</a>
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
