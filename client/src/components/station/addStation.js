import React from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import './addStation.css'
import { useState } from "react";

function AddStation() {

    const checkArray = ['param1', 'param2', 'param3', 'param4'];

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
                                <Form.Control type="text" placeholder="Enter Product name" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Work" />
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>
                        </div>

                        <Form.Select className="mb-3 select-param" aria-label="Default select example">
                            <option>Report Type</option>
                            <option value="1">Okay/Not okay</option>
                            <option value="2">Parameters</option>
                        </Form.Select>
                    </Form>
                </div>
            </div>

            <div className="add-station-button">
                <Button variant="danger" className="add-button-stn">Add Product</Button>
            </div>
            <Button onClick={handleShow}>Click</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form>
                            {checkArray.map((type) => (
                                <div key={`default-${type}`} className="mb-3">
                                    <Form.Check // prettier-ignore
                                        type={type}
                                        id={`default-${type}`}
                                        label={`${type}`}
                                    />
                                </div>
                            ))}
                        </Form>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary">Understood</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default AddStation;