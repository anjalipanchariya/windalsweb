import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';

function WindalsNav() {

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <img src={process.env.PUBLIC_URL} alt='' style={{ height: 40, width: 50 }} />
          <Navbar.Brand as={Link} to='/'>Windals Precision Ltd.</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Users" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/user/adduser">Add User</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user/deleteuser">Delete User</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Product" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/product/addProduct">Add Product</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/product/updateproduct">Update Product</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Station" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/station/addStation">Add Station</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/station/updateStation">Update Station</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav.Link href="#" style={{ margin: 15 }}>My Profile</Nav.Link>
            
            <Nav.Link as={Link} to="/login" style={{ margin: 15 }}>Login</Nav.Link>
            
            <Button variant="outline-dark">Login</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      
    </>
  );
}

export default WindalsNav;