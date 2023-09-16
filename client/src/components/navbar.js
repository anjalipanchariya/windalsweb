import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Routes, Route, Link} from 'react-router-dom';
import WorkerReg from './user/adduser';
import DeleteUser from './user/deleteuser';
import UpdateProduct from './product/updateproduct';
import UpdateStation from './station/updateStation';
import AddProduct from './product/addProduct';
import AddStation from './station/addStation';
import Home from './Home';
import LoginPage from './login';
import ViewUser from './user/viewUser';
import ViewProduct from './product/viewProduct';
import ViewStation from './station/viewStation';
import StationAllocation from './station/allocateStation';
import StationPage from './station/stationPage';
import FirstStation from './station/firstStation';
import NextStationAllocation from './station/nextStationAllocation';

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
                <NavDropdown.Item as={Link} to="/user/deleteuser">Update User</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/user/viewuser">View User</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Product" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/product/addProduct">Add Product</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/product/updateproduct">Update Product</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/product/viewproduct">View Product</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Station" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/station/addStation">Add Station</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/station/updateStation">Update Station</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/station/viewstation">View Station</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/station/allocatestation">Allocate Station</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/station/allocatenextStation">Allocate Next Station</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/station">Station Page</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/firststation">First Station Page</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav.Link href="#" style={{ margin: 15 }}>My Profile</Nav.Link>
            
            <Nav.Link as={Link} to="/login" style={{ margin: 15 }}>Login</Nav.Link>
            
            <Button variant="outline-dark">Login</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/user/adduser' element={<WorkerReg />} />
        <Route path='/user/deleteuser' element={<DeleteUser />} />
        <Route path='/user/viewuser' element={<ViewUser />} />

        <Route path='/product/addProduct' element={<AddProduct />}></Route>
        <Route path='/product/updateproduct' element={<UpdateProduct />}></Route>
        <Route path='/product/viewproduct' element={<ViewProduct />}></Route>
        <Route path='/station/addStation' element={< AddStation/>}></Route>
        <Route path='/station/updateStation' element={<UpdateStation />}></Route>
        <Route path='/station/viewStation' element={<ViewStation />}></Route>
        <Route path='/station/allocateStation' element={<StationAllocation />}></Route>
        <Route path='/station/allocatenextStation' element={<NextStationAllocation />}></Route>
        <Route path='/station' element={<StationPage />}></Route>
        <Route path='/firststation' element={<FirstStation />}></Route>
        
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default WindalsNav;