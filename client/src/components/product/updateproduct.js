import React from "react";
import { Button, Form } from "react-bootstrap";
import './updateproduct.css'

function UpdateProduct() {
    return (
        <div>
            <div className="header-div">
                <h2 className="header">Update / Delete Product</h2>
            </div>
            <div className="search-form">
                <div className="input-field-search">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder="Search Product by ID" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>
                    </Form>
                    <div className="search-button">
                        <Button variant="danger" className="button">Search</Button>
                    </div>
                </div>
            </div>
            <div className="all-inputs">
                <div className="input-fields">
                    <Form className="inputs">
                        <div className="input-param">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter Product Name" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="input-param">
                            <Form.Select className="mb-3 select-param" aria-label="Default select example">
                                <option>Select Parameters</option>
                                <option value="1">Parameter 1</option>
                                <option value="2">Parameter 2</option>
                                <option value="3">Parameter 3</option>
                            </Form.Select>
                        </div>
                        <div className="input-param">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Enter Maximum Value" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="input-param">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Enter Minimum Value" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </div>
                        <div className="input-param">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter Unit" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </div>
                    </Form>
                </div>
            </div>
            <div className="up-del-button">
                <div className="update-button">
                    <Button variant="danger" className="up-button">Update</Button>
                </div>
                <div className="delete-button">
                    <Button variant="danger" className="del-button">Delete</Button>
                </div>
            </div>
        </div>
    )
}

export default UpdateProduct;
