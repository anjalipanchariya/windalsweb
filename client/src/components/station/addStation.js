import React, { useState } from "react";
import { Button, Form } from 'react-bootstrap';
import './addStation.css'

function AddStation() {
    return (
        <div>
            <div className="header-add-station">
                <h2 className="add-station-header">Add Station</h2>
            </div>
            <div className="add-station-container">
                <div className="add-station-inputs">
                    <Form>
                        <div className="station-name-id">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter Station Name" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter Station ID" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </div>

                        <Form.Select className="mb-3 select-param" aria-label="Default select example">
                            <option>Select Parameters</option>
                            <option value="1">Parameter 1</option>
                            <option value="2">Parameter 2</option>
                            <option value="3">Parameter 3</option>
                        </Form.Select>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="Maximum" />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="number" placeholder="Minimum" />
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

            <div className="add-station-button">
                <Button variant="danger" className="add-button-stn">Add Product</Button>
            </div>
        </div>
    )
}

export default AddStation;
