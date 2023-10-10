import React from 'react';
import { Button, Form, Modal, Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { addShift, getShift, deleteShift, updateShift } from '../../helper/helper';
import { useState, useEffect } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import WindalsNav from '../navbar';
import * as Yup from "yup";
import moment from 'moment';
import Footer from '../footer';
import './shiftConfiguration.css';


function ShiftConfiguration() {
  const [shiftData, setShiftData] = useState([])
  const [showEditModal, setShowEditModal] = useState(false);

  const shiftValidationSchema = Yup.object().shape({
    shiftName: Yup.string().max(100, "Too long").required("Required"),
    startTime: Yup.string()
      .required("Start time is required")
      .test(
        "is-greater",
        "End time should be greater than start time",
        function (value) {
          const { startTime, endTime } = this.parent;
          if (startTime === endTime) {
            return false; // Start and end times are equal, return false
          }
          return moment(value, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"));
        }
      ),
    endTime: Yup.string()
      .required("End time is required")
      .test(
        "is-greater",
        "End time should be greater than start time",
        function (value) {
          const { startTime, endTime } = this.parent;
          if (startTime === endTime) {
            return false; // Start and end times are equal, return false
          }
          return moment(value, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"));
        }
      ),
  });


  const addFormFormik = useFormik({
    initialValues: {
      shiftName: '',
      startTime: '',
      endTime: '',
      active: false
    },
    validationSchema: shiftValidationSchema,
    onSubmit: async (values) => {
      const addShiftPromise = addShift(values)
      if (values.startTime === values.endTime) {
        alert('Start time and end time cannot be the same.');
      }
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
    validationSchema: shiftValidationSchema,
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
  const handleTickBoxChangeEdit = () => {
    editFormFormik.setFieldValue("active", !editFormFormik.values.active)
  }
  return (
    <div>
      <WindalsNav />
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className='shiftconf' style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
      <div className="form-container">
        <h1>Shift Configuration</h1>
        <p>Add a new shift</p>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Control type="text" placeholder="Enter Shift Name" value={addFormFormik.values.shiftName} name="shiftName" onChange={addFormFormik.handleChange} />
            {addFormFormik.touched.shiftName && addFormFormik.errors.shiftName ? (
              <Alert variant="danger" className="error-message">{addFormFormik.errors.shiftName}</Alert>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTime">
            <Form.Control type="time" placeholder="start time" value={addFormFormik.values.startTime} name="startTime" onChange={addFormFormik.handleChange} />
            {addFormFormik.touched.startTime && addFormFormik.errors.startTime ? (
              <Alert variant="danger" className="error-message">{addFormFormik.errors.startTime}</Alert>
            ) : null}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicTime">
            <Form.Control type="time" placeholder="end time" value={addFormFormik.values.endTime} name="endTime" onChange={addFormFormik.handleChange} />
            {addFormFormik.touched.endTime && addFormFormik.errors.endTime ? (
              <Alert variant="danger" className="error-message">{addFormFormik.errors.endTime}</Alert>
            ) : null}
          </Form.Group>


          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <div>
              <label>Active</label>
              <input
                type="checkbox"
                name="active"
                checked={addFormFormik.values.active}
                onChange={handleTickBoxChangeAdd}
              />
            </div>
          </Form.Group>

          <Button className="submit-button" variant="primary" type="submit" onClick={addFormFormik.handleSubmit}>
            Submit
          </Button>
        </Form>
      </div>
      </div>
      <div>
        <Table striped responsive hover className='table'>
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
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {shiftdata.shift_name}
                  </td>
                  <td>
                    {shiftdata.start_time}
                  </td>
                  <td>
                    {shiftdata.end_time}
                  </td>
                  <td>
                    {shiftdata.active == 1 ? "yes" : "no"}
                  </td>
                  <td>
                    <button
                      className="edit-button"
                      onClick={() => handleEdit(shiftdata)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
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
        </Table>

      </div>
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
                {editFormFormik.touched.startTime && editFormFormik.errors.startTime ? (
                  <Alert variant="danger" className="error-message">{editFormFormik.errors.startTime}</Alert>) : null}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <label>End Time</label>
                <Form.Control type="time" placeholder="Enter End Time " value={editFormFormik.values.endTime} name="endTime" onChange={editFormFormik.handleChange} />
                {editFormFormik.touched.endTime && editFormFormik.errors.endTime ? (
                  <Alert variant="danger" className="error-message">{editFormFormik.errors.endTime}</Alert>) : null}
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
