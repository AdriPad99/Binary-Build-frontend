import { useContext } from 'react';
//import { tokenContext } from '../App';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Navbare() {

  //const [isLoggedIn, setIsLoggedIn] = useContext(tokenContext);
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Container>
          <Navbar.Brand className='brand' href="/">Home</Navbar.Brand>
          <Nav.Link id='nav' href="/signup">Sign-Up</Nav.Link>
          <Nav.Link id='nav' href="/signin">Sign-In</Nav.Link>
          <Nav.Link id='nav' href='/signout'>Sign-out</Nav.Link>
          <Nav.Link id='nav' href="/workouts">Workouts</Nav.Link>
        </Container>
      </Container>
    </Navbar>
    </>
  );
}

export default Navbare;