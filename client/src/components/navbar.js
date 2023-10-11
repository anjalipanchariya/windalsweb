import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { logout, getOneEmployee } from '../helper/helper';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import logo from '../images/logo.png'
import './navbar.css';

function WindalsNav() {

  const { userName } = useParams()
  const [workerAccess, setWorkerAccess] = useState("")

  const accessOptions = ["0-AddUser", "1-ViewUser", "2-DeleteUser", "3-UpdateUser", "4-AddProduct", "5-VeiwProduct", "6-DeleteProduct", "7-UpdateProduct",
    "8-AddStation", "9-ViewStation", "10-DeleteStation", "11-UpdateStation", "12-AllocateNextStation", "13-UpdateNextStationAllocated",
    "14-DeleteNextStationAllocated", "15-ViewNextStationAllocated", "16-AllocateStationToWorker", "17-ViewStationAllocatedToWorker", "18-ShiftConfig"]

  useEffect(() => {
    const getWorkerDataPromise = getOneEmployee(userName)
    getWorkerDataPromise.then((result) => {
      const access = result[0].access_given.split('').map((char) => parseInt(char));
      setWorkerAccess(access)
    }).catch((err) => {
      toast.error(err.msg)
    })
  }, [])

  // console.log({workerAccess:workerAccess,userName:userName});
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container>
          <div class="col" style={{ marginLeft: 5 }}>
            <img src={logo} alt='' style={{ height: 40, width: 50 }} />
            <Navbar.Brand as={Link} to='/'>Windals Precision Ltd.</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
          </div>

          <div class="col">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                
                    <NavDropdown title="User" id="basic-nav-dropdown">
                    {workerAccess[1] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/ViewUser`}>View</NavDropdown.Item>}
                      {workerAccess[0] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/AddUser`}>Add</NavDropdown.Item>}
                      {(workerAccess[2] === 1 || workerAccess[3] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteUser`}>Update</NavDropdown.Item>}
                      {(workerAccess[2] === 1 || workerAccess[3] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteUser`}>Delete</NavDropdown.Item>}
                      
                    </NavDropdown>

                    <NavDropdown title="Product" id="basic-nav-dropdown">
                    {workerAccess[5] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/Viewproduct`}>View</NavDropdown.Item>}
                      {workerAccess[4] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/AddProduct`}>Add</NavDropdown.Item>}
                      {(workerAccess[6] === 1 || workerAccess[7] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteProduct`}>Update</NavDropdown.Item>}
                      {(workerAccess[6] === 1 || workerAccess[7] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/UpdateAndDeleteProduct`}>Delete</NavDropdown.Item>}
                      
                    </NavDropdown>

                    <NavDropdown title="Station" id="basic-nav-dropdown">
                      {workerAccess[9] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/ViewStation`}>View</NavDropdown.Item>}
                      {(workerAccess[8] === 1 || workerAccess[10] === 1 || workerAccess[11] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/AddUpdateAndDeleteStation`}>Add</NavDropdown.Item>}
                      {(workerAccess[8] === 1 || workerAccess[10] === 1 || workerAccess[11] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/AddUpdateAndDeleteStation`}>Update</NavDropdown.Item>}
                      {(workerAccess[8] === 1 || workerAccess[10] === 1 || workerAccess[11] === 1) && <NavDropdown.Item as={Link} to={`/${userName}/AddUpdateAndDeleteStation`}>Delete</NavDropdown.Item>}
                      {workerAccess[16] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/AllocateStationToWorker`}>Allocate Station To Worker</NavDropdown.Item>}
                      {workerAccess[12] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/AllocateNextStation`}>Allocate Next Station</NavDropdown.Item>}
                    </NavDropdown>

                    <NavDropdown title="Shift" id="basic-nav-dropdown">
                    {workerAccess[18] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/ViewShifts`}>View</NavDropdown.Item>}
                    {workerAccess[18] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/ShiftConfig`}>Add</NavDropdown.Item>}
                    {workerAccess[18] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/ShiftConfig`}>Update</NavDropdown.Item>}
                    {workerAccess[18] === 1 && <NavDropdown.Item as={Link} to={`/${userName}/ShiftConfig`}>Delete</NavDropdown.Item>}
                      
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
                </div>
              <div class="nav navbar-nav navbar-right" style={{marginRight:10}}>
              <Nav.Link href="#" >My Profile</Nav.Link>
                <Button variant="outline-dark" onClick={() => {
                  logout()
                }}>Log Out</Button>
              </div>
            </Container>
          </Navbar>

        </>
        );
}

        export default WindalsNav;