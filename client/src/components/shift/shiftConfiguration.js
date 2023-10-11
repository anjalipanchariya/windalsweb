import React from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { addShift, getShift, deleteShift, updateShift } from '../../helper/helper';
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import WindalsNav from '../navbar';
import Footer from '../footer';
import './shiftConfiguration.css';

function ShiftConfiguration() {
    const [shiftData, setShiftData] = useState([])
    const [showEditModal, setShowEditModal] = useState(false);

    const addFormFormik = useFormik({
        initialValues: {
            shiftName: '',
            startTime: '',
            endTime: '',
            active: false
        },
        onSubmit: async (values) => {
            const addShiftPromise = addShift(values)
            toast.promise(
                addShiftPromise,
                {
                    loading: 'Adding shift',
                    success: (result) => {
                        addFormFormik.resetForm()
                        getShiftData()
                        return result.msg
                    },
                    error: (err) => {
                        return err.msg
                    }
                }
            )

        }
    })

    const editFormFormik = useFormik({
        initialValues: {
            shiftName: '',
            startTime: '',
            endTime: '',
            active: false
        },
        onSubmit: async (values) => {
            const updateShiftPromise = updateShift(values)
            toast.promise(
                updateShiftPromise,
                {
                    loading: "Updating data",
                    success: result => {
                        editFormFormik.resetForm();
                        setShowEditModal(false);
                        getShiftData();
                        // handleSearch();
                        return <b>{result.msg}</b>; // Return a React element
                    },
                    error: err => <b>{err.msg}</b>, // Return a React element
                }
            )
        }
    })


    const handleDelete = (shiftId) => {
        console.log(shiftId);
        const deleteShiftPromise = deleteShift(shiftId)

        toast.promise(
            deleteShiftPromise,
            {
                loading: "Deleting data",
                success: result => {
                    editFormFormik.resetForm()
                    // searchFormFormik.resetForm()
                    setShiftData([])
                    getShiftData();

                    return result.msg
                },
                error: err => { return err.msg }
            }
        )

    };

    const handleEdit = (shiftData) => {
        const editValues = {
            shiftId: shiftData.shift_id,
            shiftName: shiftData.shift_name,
            startTime: shiftData.start_time,
            endTime: shiftData.end_time,
            active: shiftData.active
        }
        editFormFormik.setValues(editValues)
        setShowEditModal(true)
    };



    const handleModalClose = () => {
        editFormFormik.resetForm()
        setShowEditModal(false);
    }

    useEffect(() => {
        getShiftData();
    }, [])

    const getShiftData = () => {
        const getShiftPromise = getShift()
        getShiftPromise.then(async (result) => {
            setShiftData(result)
            console.log("hi");
        }).catch((err) => { })
    }

    const handleTickBoxChangeAdd = () => {
        addFormFormik.setFieldValue("active", !addFormFormik.values.active)
    }
    console.log("The shift value is " + addFormFormik.values.active);
    const handleTickBoxChangeEdit = () => {
        editFormFormik.setFieldValue("active", !editFormFormik.values.active)
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        ctg();
    });

    const ctg=()=>{
        const rows = document.querySelectorAll('td');
        rows.forEach((row) => {
            if (row.innerHTML === 'yes') {
                const parent = row.parentNode;
                parent.style.backgroundColor = '#96DD96';
            }

            else if (row.innerHTML === 'no') {
                const parent = row.parentNode;
                parent.style.backgroundColor = '#DB8F8F';
            }
        });
        console.log("page is loaded")
    }

    function loadRowBackgroundColors() {
        var tableRows = document.querySelectorAll("td");
    
        tableRows.forEach(function (row) {
            var rowId = row.textContent;
            var rowColor = localStorage.getItem(rowId);
            if (rowColor) {
                row.classList.add(rowColor);
            }
            console.log(rowId)
        });
        
    }
    
    loadRowBackgroundColors();

    

    // window.addEventListener("click", function () {
    //     window.reload();
    // });

    // document.addEventListener("load", function () {
    //     const rows = document.querySelectorAll('td');
    //     rows.forEach((row) => {
    //         if (row.innerHTML === 'yes') {
    //             const parent = row.parentNode;
    //             parent.style.backgroundColor = 'green';
    //         }
    //     });
    // });

    
    
    
    return (
        <div>
            <WindalsNav />
            
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className='shiftconf'>
                <div className="form-container">
                    <h1>Shift Configuration</h1>
                    <p>Add a new shift</p>

                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <label>Shift Name</label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Shift Name"
                                value={addFormFormik.values.shiftName}
                                name="shiftName"
                                onChange={addFormFormik.handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicTime">
                            <label>Start Time</label>
                            <Form.Control
                                type="time"
                                placeholder="start time"
                                value={addFormFormik.values.startTime}
                                name="startTime"
                                onChange={addFormFormik.handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicTime">
                            <label>End Time</label>
                            <Form.Control
                                type="time"
                                placeholder="end time"
                                value={addFormFormik.values.endTime}
                                name="endTime"
                                onChange={addFormFormik.handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <div>
                                <label>Active</label>
                                <input
                                    type="checkbox"
                                    name="active"
                                    checked={addFormFormik.values.active}
                                    onChange={handleTickBoxChangeAdd}
                                // onClick={changetogreen}
                                />
                            </div>
                        </Form.Group>

                        <Button className="submit-button" variant="primary" type="submit" onClick={addFormFormik.handleSubmit}>
                            Submit
                        </Button>
                    </Form>
                </div>
                <button onClick={ctg}>refresh</button>
                {/* <button onClick={window.location.reload()}>Refresh Page</button> */}
                <br />
               
                <div>
                    <table striped responsive>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <th>#</th>
                                <th>Shift Name</th>
                                <th>Start time</th>
                                <th>End time</th>
                                <th>Active</th>
                                <th>edit</th>
                                <th>delete</th>
                            </tr>
                            {

                                Array.isArray(shiftData) && shiftData.map((shiftdata, index) => (
                                    <tr key={index}>
                                        <td id='tabletd'>
                                            {index + 1}
                                        </td>
                                        <td id='tabletd'>
                                            {shiftdata.shift_name}
                                        </td>
                                        <td id='tabletd'>
                                            {shiftdata.start_time}
                                        </td>
                                        <td id='tabletd'>
                                            {shiftdata.end_time}
                                        </td>
                                        <td id='tabletd'>
                                            {shiftdata.active == 1 ? "yes" : "no"}
                                        </td>
                                        <td id='tabletd'>
                                            <button
                                                className="edit-button"
                                                onClick={() => handleEdit(shiftdata)}
                                            >
                                                <FontAwesomeIcon icon={faEdit} />
                                            </button>
                                        </td>
                                        <td id='tabletd'>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(shiftdata.shift_id)}
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>

                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />

            <div>
                <Modal
                    show={showEditModal}
                    onHide={handleModalClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit the Shift as per required</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            Shift Name: {editFormFormik.values.shiftName}

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <label>Start Time</label>
                                <Form.Control type="time" placeholder="Enter Start Time" value={editFormFormik.values.startTime} name="startTime" onChange={editFormFormik.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <label>End Time</label>
                                <Form.Control type="time" placeholder="Enter End Time " value={editFormFormik.values.endTime} name="endTime" onChange={editFormFormik.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <div>
                                    <label> Active </label>
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={editFormFormik.values.active}
                                        onChange={handleTickBoxChangeEdit}
                                    />
                                </div>
                            </Form.Group>

                        </Form>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="danger" onClick={handleModalClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={editFormFormik.handleSubmit}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>
            <Footer />
        </div>
    )
}

export default ShiftConfiguration
