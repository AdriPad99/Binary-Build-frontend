import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import DropdownMenuComponent from "./DropdownMenuComponent";

function Navbare() {
  // reveals what is shown based on if the user is logged in
  const { token, logout } = useContext(AuthContext);

  // logs the user out
  const userLogout = () => {
    logout();
  };

  // handles the state of the user menu and either opens or closes it
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // controls the styles of the links on the navbar
  const linkStyle = {
    textDecoration: "none",
    color: "Black",
    margin: "0 10px",
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Navbar logo */}
          <img
            src="/images/logo3.png"
            alt="bodybuilder in binary"
            width="150"
            height="150"
          />
          {/* conttainer holding the home link */}
          <Box>
            <Button>
              <a style={linkStyle} id="middle" href="/">
                Home
              </a>
            </Button>
          </Box>
          {/* container holding the link between home and the dropdown menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* if user is logged in show the sign-up link OR
                if user is logged outt show the sign-in and sign-up link */}
            {String(token).length > 4 ? (
              <a style={linkStyle} id="middle" href="/signup">
                <Button style={linkStyle}>Try for Free</Button>
              </a>
            ) : (
              <>
                <a style={linkStyle} id="middle" href="/signin">
                  <Button style={linkStyle}>Sign-In</Button>
                </a>
                <a style={linkStyle} id="middle" href="/signup">
                  <Button style={linkStyle}>Try for Free</Button>
                </a>
              </>
            )}
            <DropdownMenuComponent />
          </Box>
          {/* controls how the menu is aligned */}
          <Box sx={{ flexGrow: 0 }}>
            {/* tooltip on menu hover */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/* responsible for the profile image */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            {/* profile menu styling */}
            <Menu
              sx={{ mt: "45px", zIndex: 1500 }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {/* contains the menu items */}
              {/* if user is logged in show the profile and sign-out option OR
      if user is logged out show the sign-in andd sign-up option */}
              {String(token).length > 4
                ? [
                    <MenuItem key="profile" onClick={handleCloseUserMenu}>
                      <a style={linkStyle} id="profile" href="/profile">
                        Profile
                      </a>
                    </MenuItem>,
                    <Divider key="divider1" />,
                    <MenuItem key="sign-out" onClick={handleCloseUserMenu}>
                      <a
                        style={linkStyle}
                        id="profile"
                        onClick={() => userLogout()}
                        href="/signin"
                      >
                        Sign-Out
                      </a>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem key="sign-in" onClick={handleCloseUserMenu}>
                      <a style={linkStyle} id="profile" href="/signin">
                        Sign-In
                      </a>
                    </MenuItem>,
                    <Divider key="divider2" />,
                    <MenuItem key="try-for-free" onClick={handleCloseUserMenu}>
                      <a style={linkStyle} id="profile" href="/signup">
                        Try for Free
                      </a>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbare;
