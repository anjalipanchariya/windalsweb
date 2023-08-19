import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function DeleteUser() {
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
    <Form style={{margin:30}}>
      <h3 style={{width:500, textAlign:'center'}}>Add Username and password you want to delete</h3>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{width:300}}>
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1" style={{width:300}}>
        <Form.Label>Admin Password</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>

      <Button variant="danger" type="submit">
        Delete User
      </Button>
      
    </Form>
    </div>
  );
}

export default DeleteUser;