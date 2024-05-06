import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';



function Navbare() {

  // grabs the token and logout function from context
  const { token, logout } = useContext(AuthContext);

  // calls the logout function from the context to logout the user
  const userLogout = () => {
    logout();
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand className='brand' href="/">Home</Navbar.Brand>
          {/* If a token doesn't exist display the signin link
              If a token DOES exist display the signout link */}
          {String(token).length <= 4 ? 
          (
          <Nav.Link id='nav' href="/signin">Sign-In</Nav.Link>
          ): (
          <Nav.Link onClick={() => userLogout()} id='nav' href='/signin'>Sign-out</Nav.Link>
          )}
          <Nav.Link id='nav' href="/signup">Sign-Up</Nav.Link>
          <Nav.Link id='nav' href="/workouts">Workouts</Nav.Link>
          {/* testing purposes. Logs out the current token thats in local storage/context */}
          <Nav.Link onClick={() => { console.log(token) }}>Navbar Token</Nav.Link>
          {/* testing purposes. keeps track if the user is logged in or out */}
          {String(token).length > 4 ? ' logged in'  : ' logged out' }
        </Container>
      </Navbar>
    </>
  );
}

export default Navbare;