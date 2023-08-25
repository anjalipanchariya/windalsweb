import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import './addProduct.css'
import { addProduct } from "../../helper/helper";

function AddProduct() {
    const [formData, setFormData] = useState({
        productName: '',
        maximum: '',
        minimum: '',
        unit: ''
    })

    const [errors, setErrors] = useState({
        productName: '',
        maximum: '',
        minimum: '',
        unit: ''
    })

    const validateProductName = () => {
        if (formData.productName.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, productName: 'Product Name is required' }));
            return false;
        }
        return true;
    };

    const validateMaximum = () => {
        if (!formData.maximum || parseFloat(formData.maximum) === 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                maximum: 'Must be a non-zero number',
            }));
            return false;
        }
        return true;
    }

    const validateMinimum = () => {
        if (!formData.minimum || parseFloat(formData.minimum) === 0) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                minimum: 'Must be a non-zero number',
            }));
            return false;
        }
        return true;
    }

    const validateUnit = () => {
        if (formData.unit.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, unit: 'Unit is required' }));
            return false;
        }
        return true;
    };

    const validateForm = () => {
        const isValidProductName = validateProductName();
        const isValidMaximum = validateMaximum();
        const isValidMinimum = validateMinimum();
        const isValidUnit = validateUnit();
        return isValidProductName && isValidMaximum && isValidMinimum && isValidUnit;
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
        <div>
            <div className="header-add-product">
                <h2 className="add-product-header">Add Product</h2>
            </div>
            <div className="add-product-container">
                <div className="add-product-inputs">
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Product Name" name='productName' value={formData.productName} onChange={handleChange} />
                            {errors.productName && <Form.Text className="text-danger">{errors.productName}</Form.Text>}
                        </Form.Group>

                        <Form.Select className="mb-3 select-param" aria-label="Default select example">
                            <option>Select Parameters</option>
                            <option value="1">Parameter 1</option>
                            <option value="2">Parameter 2</option>
                            <option value="3">Parameter 3</option>
                        </Form.Select>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="Maximum" name="maximum" value={formData.maximum} onChange={handleChange} />
                            {errors.maximum && <Form.Text className="text-danger">{errors.maximum}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="Minimum" name="minimum" value={formData.minimum} onChange={handleChange} />
                            {errors.minimum && <Form.Text className="text-danger">{errors.minimum}</Form.Text>}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Unit" name="unit" value={formData.unit} onChange={handleChange} />
                            {errors.unit && <Form.Text className="text-danger">{errors.unit}</Form.Text>}
                        </Form.Group>

                        <Button variant="danger" className="add-button" type="submit">Add Product</Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}



export default AddProduct;
