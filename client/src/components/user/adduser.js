import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    mobNo: '',
    userName: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    name: '',
    mobNo: '',
    userName: '',
    password: ''
  });

  const validateName = () => {
    if (formData.name.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Name is required' }));
      return false;
    }
    return true;
  };

  const validateMobNo = () => {
    const mobilePattern = /^[0-9]{10}$/;
    if (!formData.mobNo.match(mobilePattern)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        mobNo: 'Invalid mobile number. Please enter a 10-digit number.',
      }));
      return false;
    }
    return true;
  }

  const validateUsername = () => {
    if (formData.userName.trim() === '') {
      setErrors((prevErrors) => ({ ...prevErrors, userName: 'Username is required' }));
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    if (formData.password.length < 6) {
      setErrors((prevErrors) => ({ ...prevErrors, password: 'Password must be at least 6 characters' }));
      return false;
    }
    return true;
  };

  const validateForm = () => {
    const isValidName = validateName();
    const isValidMobNo = validateMobNo();
    const isValidUsername = validateUsername();
    const isValidPass = validatePassword();
    return isValidName && isValidMobNo && isValidUsername && isValidPass;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form Submitted : ", formData);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Form style={{ width: 300, margin: 30 }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="" name='name' value={formData.name} onChange={handleChange}/>
          {errors.name && <Form.Text className="text-danger">{errors.name}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control type="number" placeholder="" name='mobNo' value={formData.mobNo} onChange={handleChange}/>
          {errors.mobNo && <Form.Text className="text-danger">{errors.mobNo}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Create Username</Form.Label>
          <Form.Control type="text" placeholder="" name='userName' value={formData.userName} onChange={handleChange}/>
          {errors.userName && <Form.Text className="text-danger">{errors.userName}</Form.Text>}
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Create Password</Form.Label>
          <Form.Control type="password" placeholder="" name='password' value={formData.password} onChange={handleChange}/>
          {errors.password && <Form.Text className="text-danger">{errors.password}</Form.Text>}
        </Form.Group>

        <Button variant="danger" type="submit">
          Add User
        </Button>

      </Form>
    </div>
  );
}

export default AddUser;