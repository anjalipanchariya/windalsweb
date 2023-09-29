import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {Link, useParams} from 'react-router-dom';
import { logout,getOneEmployee } from '../helper/helper';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


function WindalsNav() {

  const {userName} = useParams()
  const [workerAccess,setWorkerAccess] = useState("")

  const accessOptions = [ "0-AddUser", "1-ViewUser", "2-DeleteUser", "3-UpdateUser", "4-AddProduct", "5-VeiwProduct", "6-DeleteProduct", "7-UpdateProduct",
  "8-AddStation", "9-ViewStation", "10-DeleteStation", "11-UpdateStation", "12-AllocateNextStation", "13-UpdateNextStationAllocated", 
  "14-DeleteNextStationAllocated", "15-ViewNextStationAllocated", "16-AllocateStationToWorker", "17-ViewStationAllocatedToWorker","18-ShiftConfig"] 
 
  useEffect(()=>{
    const getWorkerDataPromise = getOneEmployee(userName)
    getWorkerDataPromise.then((result)=>{
      const access = result[0].access_given.split('').map((char) => parseInt(char));
      setWorkerAccess(access)
    }).catch((err)=>{
      toast.error(err.msg)
    })
  },[])

  // console.log({workerAccess:workerAccess,userName:userName});
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
                {workerAccess[0] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/AddUser`}>Add User</NavDropdown.Item>}
                {(workerAccess[2] === 1 || workerAccess[3] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteUser`}>Update/Delete User</NavDropdown.Item>}
                {workerAccess[1] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/ViewUser`}>View User</NavDropdown.Item>}
              </NavDropdown>

              <NavDropdown title="Product" id="basic-nav-dropdown">
                {workerAccess[4] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/AddProduct`}>Add Product</NavDropdown.Item>}
                  {(workerAccess[6] === 1 || workerAccess[7] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteProduct`}>Update/Delete Product</NavDropdown.Item>}
                {workerAccess[5] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/Viewproduct`}>View Product</NavDropdown.Item>}
              </NavDropdown>

              <NavDropdown title="Station" id="basic-nav-dropdown">
                {(workerAccess[8] === 1 || workerAccess[10] === 1 || workerAccess[11] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/AddUpdateAndDeleteStation`}>Add/Update/Delete Station</NavDropdown.Item>}
                {/* <NavDropdown.Item as={Link} to={`/${userName}/updateStation`}>Update Station</NavDropdown.Item> */}
                {workerAccess[9] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/ViewStation`}>View Station</NavDropdown.Item>}
                {workerAccess[16] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/AllocateStationToWorker`}>Allocate Station To Worker</NavDropdown.Item>}
                {workerAccess[12] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/AllocateNextStation`}>Allocate Next Station</NavDropdown.Item>}
              </NavDropdown>
            </Nav>

            {workerAccess[18] === 1 && <Nav.Link href={`/${userName}/ShiftConfig`}>Shift Configuration</Nav.Link>} 

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