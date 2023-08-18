import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';

function WindalsNav() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <img src = "./images/logo.png" style={{height:40, width:50}}/>
        <Navbar.Brand href="#home">Windals Precision Ltd.</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Admin Panel</Nav.Link>
            <Nav.Link href="#link">Home</Nav.Link>
            <NavDropdown title="Product" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Add Product</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Update Product
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Delete Product</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Station" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Add station</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Update Station
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Delete Station</NavDropdown.Item>
              
            </NavDropdown>
            <NavDropdown title="Users" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Add User</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Update User
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Delete User</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav.Link href="#link" style={{margin:15}}>My Profile</Nav.Link>
          <Button variant="outline-dark">Login</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default WindalsNav;