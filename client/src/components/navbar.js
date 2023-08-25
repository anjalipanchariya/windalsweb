import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Routes, Route, Link} from 'react-router-dom';
import AddUser from './user/adduser';
import DeleteUser from './user/deleteuser';
import UpdateProduct from './product/updateproduct';
import UpdateStation from './station/updateStation';
import AddProduct from './product/addProduct';
import AddStation from './station/addStation';


function WindalsNav() {

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <img src="./logo.png" alt='' style={{ height: 40, width: 50 }} />
          <Navbar.Brand href="#home">Windals Precision Ltd.</Navbar.Brand>
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
            <Nav.Link href="#link" style={{ margin: 15 }}>My Profile</Nav.Link>
            <Button variant="outline-dark">Login</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/user/adduser' element={<AddUser />} />
        <Route path='/user/deleteuser' element={<DeleteUser />} />

        <Route path='/product/addProduct' element={<AddProduct />}></Route>
        <Route path='/product/updateproduct' element={<UpdateProduct />}></Route>

        <Route path='/station/addStation' element={<AddStation />}></Route>
        <Route path='/station/updateStation' element={<UpdateStation />}></Route>
      </Routes>
    </>
  );
}

export default WindalsNav;