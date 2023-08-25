import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function AddUser() {
  return (
    <div style={{display:'flex',justifyContent:'center'}}>
    <Form style={{width:300, margin:30}}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Mobile No</Form.Label>
        <Form.Control type="number" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Create Username</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Create Password</Form.Label>
        <Form.Control type="text" placeholder="" />
      </Form.Group>

      <Button variant="danger" type="submit">
        Add User
      </Button>
      
    </Form>
    </div>
  );
}

export default AddUser;