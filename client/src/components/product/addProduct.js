import React from "react";
import { Button, Form } from 'react-bootstrap';
import './addProduct.css'

function AddProduct() {
    return (
        <div>
            <div className="header-add-product">
                <h2 className="add-product-header">Add Product</h2>
            </div>
            <div className="add-product-container">
                <div className="add-product-inputs">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Product Name" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Select className="mb-3 select-param" aria-label="Default select example">
                            <option>Select Parameters</option>
                            <option value="1">Parameter 1</option>
                            <option value="2">Parameter 2</option>
                            <option value="3">Parameter 3</option>
                        </Form.Select>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Maximum" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Minimum" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Unit" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form>
                </div>
            </div>

            <div className="add-product-button">
                <Button variant="danger" className="add-button">Add Product</Button>
            </div>
        </div>
    )
}

export default AddProduct;
