import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import WindalsNav from '../navbar';

function DeleteUser() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <WindalsNav/>
      <Form style={{ margin: 30 }}>
        <h3 style={{ width: 500, textAlign: 'center' }}>Enter Username of the User to Delete</h3>

        <div className='form' style={{margin: "10px"}}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ width: 300 }}>
            {/* <Form.Label>Username</Form.Label> */}
            <Form.Control type="text" placeholder="Enter Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{ width: 300 }}>
            {/* <Form.Label>Admin Password</Form.Label> */}
            <Form.Control type="text" placeholder="Enter Admin Password" />
          </Form.Group>

          <Button variant="danger" type="submit">
            Delete User
          </Button>
        </div>

      </Form>
    </div>
  );
}

export default DeleteUser;