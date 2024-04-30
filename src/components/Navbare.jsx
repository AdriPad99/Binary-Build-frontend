import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navbare() {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Container>
          <Navbar.Brand className='brand' href="#home">React-Bootstrap</Navbar.Brand>
          <Nav.Link id='nav' href="#home">Sign-In</Nav.Link>
          <Nav.Link id='nav' href="#link">Sign-Out</Nav.Link>
          <Nav.Link id='nav' href="#link">Workouts</Nav.Link>
        </Container>
      </Container>
    </Navbar>
    </>
  );
}

export default Navbare;