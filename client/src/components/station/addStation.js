import React from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import './addStation.css'
import { useState } from "react";

function AddStation() {
    const checkArray = ['param1', 'param2', 'param3', 'param4'];
    const proArraay = ['product 1', 'product 2', 'product 3'];
    const [show, setShow] = useState(false);
    const [selectedReportType, setSelectedReportType] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleReportTypeChange = (event) => {
        setSelectedReportType(event.target.value);
        if (event.target.value === "2") {
            handleShow();
        }
        else {
            setSelectedParams([]);
            setSelectedParams(["Ok/ Not OK"]);
        }
    };

    const [stationName, setStationName] = useState('');
    const [work, setWork] = useState('');
    const [product, setProduct] = useState('');
    const [selectedParams, setSelectedParams] = useState([]);

    const [stationData, setStationData] = useState([]);

    const parameterChange = (parameter) => {
        const updatedParams = selectedParams.includes(parameter) ? (selectedParams.filter(item => item !== parameter)) : [...selectedParams, parameter]

        setSelectedParams(updatedParams);
    }

    const printVal = () => {
        // console.log("Station : ", stationName)
        // console.log("Work : ", work)
        // console.log("Product : ", product)
        // console.log("Report : ", selectedParams)

        const newRow = {
            stationName: stationName,
            // work: work, 
            product: product,
            selectedParams: selectedParams.join(", ")
        };

        setStationData(prevData => [...prevData, newRow]);
    }

    const handleDelete = (index) => {
        const updatedStationData = [...stationData];
        updatedStationData.splice(index, 1);
        setStationData(updatedStationData);
    };

    const [editingIndex, setEditingIndex] = useState(-1); // -1 indicates no editing
    const [editableValues, setEditableValues] = useState({
        stationName: "",
        product: "",
        selectedParams: "",
    });

    const handleEdit = (index) => {
        const row = stationData[index];
        setEditingIndex(index);
        setEditableValues({
            stationName: row.stationName,
            product: row.product,
            selectedParams: row.selectedParams,
        });
    };

    const handleUpdate = () => {
        const updatedData = stationData.map((row, index) => {
            if (index === editingIndex) {
                return {
                    ...row,
                    stationName: editableValues.stationName,
                    product: editableValues.product,
                    selectedParams: editableValues.selectedParams,
                };
            }
            return row;
        });

        setStationData(updatedData);
        setEditingIndex(-1);
        setEditableValues({
            stationName: "",
            product: "",
            selectedParams: "",
        });
    };
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
                                <Form.Control type="text" placeholder="Enter Station Name" value={stationName} onChange={(event) => { setStationName(event.target.value) }} />
                            </Form.Group>

                            <Form.Select className="mb-3 select-param" aria-label="Default select example" value={product} onChange={(event) => { setProduct(event.target.value) }}>
                                <option>Product</option>
                                {
                                    proArraay.map((product, index) => (
                                        <option key={index} value={product}>{product}</option>
                                    ))
                                }
                            </Form.Select>

                            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Work" onChange={(event) => { setWork(event.target.value) }} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group> */}

                            <Form.Select className="mb-3 select-param" aria-label="Default select example" value={selectedReportType} onChange={handleReportTypeChange}>
                                <option>Report Type</option>
                                <option value="1">Okay/Not okay</option>
                                <option value="2">Parameters</option>
                            </Form.Select>
                        </div>

                        <div className="add-station-button">
                            <Button variant="danger" className="add-button-stn" onClick={printVal}>Add Station</Button>
                        </div>
                    </Form>
                </div>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Select Parameters</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {checkArray.map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id={`default-${type}`}
                                    label={type}
                                    checked={selectedParams.includes(type)}
                                    onChange={() => { parameterChange(type) }}
                                />
                            </div>
                        ))}
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className="station-table">
                <table className="table styled-table">
                    <thead>
                        <tr className="head-contents">
                            <th scope="col">Station Name</th>
                            <th scope="col">Product</th>
                            <th scope="col">Report Type</th>
                        </tr>
                    </thead>
                    <tbody className="table-body">
                        {stationData.map((row, index) => {
                            const isEditing = index === editingIndex;

                            return (
                                <tr key={index} className="body-contents">
                                    <div className="edits">
                                        <td className="station-row">
                                            {isEditing ? (
                                                <Form.Control
                                                    type="text"
                                                    value={editableValues.stationName}
                                                    onChange={(e) =>
                                                        setEditableValues({
                                                            ...editableValues,
                                                            stationName: e.target.value,
                                                        })
                                                    }
                                                />
                                            ) : (
                                                row.stationName
                                            )}
                                        </td>
                                        <td className="product-row">
                                            {isEditing ? (
                                                <Form.Control
                                                    as="select"
                                                    value={editableValues.product}
                                                    onChange={(e) =>
                                                        setEditableValues({
                                                            ...editableValues,
                                                            product: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Product</option>
                                                    {proArraay.map((product, index) => (
                                                        <option key={index} value={product}>
                                                            {product}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                            ) : (
                                                row.product
                                            )}
                                        </td>
                                        <td className="param-row">{row.selectedParams}</td>
                                        <td>
                                            {isEditing ? (
                                                <Button variant="success" onClick={handleUpdate}>
                                                    Save
                                                </Button>
                                            ) : (
                                                <Button variant="primary" onClick={() => handleEdit(index)}>
                                                    Edit
                                                </Button>
                                            )}
                                        </td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => {
                                                    handleDelete(index);
                                                    setEditingIndex(-1);
                                                }}
                                                className="table-delete-button"
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </div>
                                </tr>
                            );
                        })}
                    </tbody>;
                </table>
            </div>
        </div>
    )
}

export default AddStation;