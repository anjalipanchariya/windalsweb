import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { logout,getOneEmployee } from '../helper/helper';
import { useEffect, useState } from 'react';


function WindalsNav({userName}) {

  const [workerData,setWorkerData] = useState("")

  useEffect(()=>{
    const getWorkerDataPromise = getOneEmployee(userName)
    getWorkerDataPromise.then((result)=>{
      setWorkerData(result)
    })
  })

  console.log({workerData:workerData});
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
                {/* <NavDropdown.Item as={Link} to="/station">Station Page</NavDropdown.Item>
                 */}
              </NavDropdown>
            </Nav>

            <Nav.Link href="/shiftConfig">Shift</Nav.Link> 

            <Nav.Link href="#" style={{ margin: 15 }}>My Profile</Nav.Link>
            
            <Button variant="outline-dark" onClick={()=>{
              logout()
            }}>Login Out</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </>
  );
}

export default WindalsNav;