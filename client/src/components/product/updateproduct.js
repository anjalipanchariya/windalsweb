import React from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import './updateproduct.css'

function UpdateProduct() {
    const [formData, setFormData] = useState({
        id: '',
        productName: '',
        maximum: '',
        minimum: '',
        unit: ''
    })

    const [errors, setErrors] = useState({
        id: '',
        productName: '',
        maximum: '',
        minimum: '',
        unit: ''
    })

    const validateID = () => {
        if (formData.id.trim() === '') {
            setErrors((prevErrors) => ({ ...prevErrors, id: 'Product Name is required' }));
            return false;
        }
        return true;
    };

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
        const isValidID = validateID();
        const isValidProductName = validateProductName();
        const isValidMaximum = validateMaximum();
        const isValidMinimum = validateMinimum();
        const isValidUnit = validateUnit();
        return isValidID && isValidProductName && isValidMaximum && isValidMinimum && isValidUnit;
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
            <div className="header-div">
                <h2 className="header">Update / Delete Product</h2>
            </div>
            <div className="complete-form">
                <Form onSubmit={handleSubmit}>
                    <div className="search-form">
                        <div className="search-form-row">
                            <div className="search-for">
                                <Form.Group className="mb-3" controlId="formBasicSearch">
                                    <Form.Control type="text" placeholder="Search Product by ID" name="id" value={formData.id} onChange={handleChange}></Form.Control>
                                    {errors.id && <Form.Text className="text-danger">{errors.id}</Form.Text>}
                                </Form.Group>
                            </div>
                            <div className="search-but">
                                <Button variant="danger" type="submit" className="search-button">Search</Button>
                            </div>
                        </div>
                    </div>
                    <div className="all-inputs">
                        <div className="product-name">
                            <Form.Group className="mb-3" controlId="formBasicSearch">
                                <Form.Control type="text" placeholder="Enter Product Name" name="productName" value={formData.productName} onChange={handleChange}></Form.Control>
                                {errors.productName && <Form.Text className="text-danger">{errors.productName}</Form.Text>}
                            </Form.Group>
                        </div>
                        <div className="select-param">
                            <Form.Select className="mb-3" aria-label="Default select example">
                                <option>Select Parameters</option>
                                <option value="1">Parameter 1</option>
                                <option value="2">Parameter 2</option>
                                <option value="3">Parameter 3</option>
                            </Form.Select>
                        </div>
                        <div className="search-for">
                            <Form.Group className="mb-3" controlId="formBasicSearch">
                                <Form.Control type="number" placeholder="Enter Maximum Value" name="maximum" value={formData.id} onChange={handleChange}></Form.Control>
                                {errors.id && <Form.Text className="text-danger">{errors.id}</Form.Text>}
                            </Form.Group>
                        </div>
                        <div className="search-for">
                            <Form.Group className="mb-3" controlId="formBasicSearch">
                                <Form.Control type="text" placeholder="Search Product by ID" name="id" value={formData.id} onChange={handleChange}></Form.Control>
                                {errors.id && <Form.Text className="text-danger">{errors.id}</Form.Text>}
                            </Form.Group>
                        </div>
                        <div>

                        </div>

                    </div>
                </Form>
            </div>
        </div>
    )
}

export default UpdateProduct;
