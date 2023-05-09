import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Navigation() {
    return (
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to ='/' href='/'>EtherScanner</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link to='/view_contracts' href='/view_contracts'>Catalog</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    )
}

export default Navigation;