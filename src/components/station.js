import Form from 'react-bootstrap/Form';

function Station() {
  return (
    <Form style={{width:300, margin:20}}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Station Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Station ID</Form.Label>
        <Form.Control type="number" placeholder="ID" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Maximum</Form.Label>
        <Form.Control type="number" placeholder="Max" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Minimum</Form.Label>
        <Form.Control type="number" placeholder="Min" />
      </Form.Group>
      
    </Form>
  );
}

export default Station;