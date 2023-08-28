import React, { useEffect } from "react";
import { Button, Form, Modal } from 'react-bootstrap';
import './addStation.css'
import { useState } from "react";
import { useFormik } from "formik";
import { addStation, getOneProductAllParameters, getProductNames } from "../../helper/helper";
import toast, { Toaster } from 'react-hot-toast';

function AddStation() {
    const [productNames,setProductNames] = useState([]);
    const [productParameters,setProductParameters] = useState([]);
    const [show, setShow] = useState(false);

    const addFormFromik = useFormik({
        initialValues:{
            stationName: '',
            productName: '',
            reportType: '',
            stationParameter: [],
            cycleTime: '',
            dailyCount:'',
            productPerHour: ''
        },
        onSubmit: (values) =>{
            const addStationPromise = addStation(values)
            toast.promise(
                addStationPromise,
                {
                    loading: 'Adding station',
                    success: (result) => {
                        addFormFromik.resetForm()
                        return result.msg},
                    error: (err) => {
                        return err.msg}
                }
            )
        }
    })

    const searchFormFromik = useFormik({
        initialValues:{
            stationName:"",
            productName:"",
        },
        onSubmit: (values) => {
            console.log(values);
        }
    })
    
    useEffect(()=>{
        const getProductNamesPromise = getProductNames()
        getProductNamesPromise.then(async(result)=>{
            const productnames = await result.map((product)=> product.product_name)
            setProductNames(productnames)
        }).catch((err)=>{})
    },[])
   
    useEffect(()=>{
        const getProductParametersPromise = getOneProductAllParameters(addFormFromik.values.productName)
        getProductParametersPromise.then( async (result)=>{
            const parameters = await result.map( (product) => product.parameter)
            setProductParameters(parameters)
        }).catch((err)=>{})
    },[addFormFromik.values.productName])

    useEffect(()=>{
        handleReportTypeChange(addFormFromik.values.reportType)
    },[addFormFromik.values.reportType])
    
    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => setShow(true);

    const handleReportTypeChange = (value) => {
        if (value === "1") {
            handleShow();
        }
        else {
            addFormFromik.setFieldValue('stationParameter',[])
        }
    };

    const [stationName, setStationName] = useState('');
    const [product, setProduct] = useState('');
    const [selectedParams, setSelectedParams] = useState([]);
    const [stationData, setStationData] = useState([]);

    const parameterChange = (parameter) => {
        const updatedParams = modalSelectedParams.includes(parameter) ? (modalSelectedParams.filter(item => item !== parameter)) : [...modalSelectedParams, parameter]

        setmodalSelectedParams(updatedParams);
    }

    const printVal = () => {

        const newRow = {
            stationName: stationName,
            // work: work, 
            product: product,
            selectedParams: selectedParams.join(", "),
            selectedParams: modalSelectedParams.join(", ")
        };

        setStationData(prevData => [...prevData, newRow]);
        setSelectedParams(modalSelectedParams);
        handleClose();
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

    const [searchStation, setSearchStation] = useState('');
    const search = () => {
        console.log(searchStation)
    }

    const [modalSelectedParams, setmodalSelectedParams] = useState([]);

    const handleParameterChange = (parameterName) => {
        if (addFormFromik.values.stationParameter.includes(parameterName)) {
          addFormFromik.setFieldValue(
            'stationParameter',
            addFormFromik.values.stationParameter.filter((name) => name !== parameterName)
          );
        } else {
          addFormFromik.setFieldValue(
            'stationParameter',
            [...addFormFromik.values.stationParameter, parameterName]
          );
        }
      };


    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="header-add-station">
                <h2 className="add-station-header">Add Station</h2>
            </div>
            <div className="add-station-container">
                <div className="add-station-inputs">
                    <Form>
                        <div className="station-name-id">
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="text" placeholder="Enter Station Name" value={addFormFromik.values.stationName} name="stationName" onChange={addFormFromik.handleChange} />
                            </Form.Group>

                            <Form.Select className="mb-3 select-param" aria-label="Default select example" value={addFormFromik.values.productName} name="productName" onChange={addFormFromik.handleChange}>
                                <option values="">--Select Product--</option>
                                {
                                    Array.isArray(productNames) && productNames.map((product, index) => (
                                        <option key={index} value={product}>{product}</option>
                                    ))
                                }
                            </Form.Select>

                            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="text" placeholder="Work" onChange={(event) => { setWork(event.target.value) }} />
                                    <Form.Text className="text-muted">
                                    </Form.Text>
                                </Form.Group> */}

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Enter Cycle Time" value={addFormFromik.values.cycleTime} name="cycleTime" onChange={addFormFromik.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Enter Daily Count " value={addFormFromik.values.dailyCount} name="dailyCount" onChange={addFormFromik.handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Control type="number" placeholder="Enter Product to be producted per hour" value={addFormFromik.values.productPerHour} name="productPerHour" onChange={addFormFromik.handleChange} />
                            </Form.Group>

                            <Form.Select className="mb-3 select-param" aria-label="Default select example" value={addFormFromik.values.reportType} name="reportType" onChange={addFormFromik.handleChange}>
                                <option value=''>--Select Report Type--</option>
                                <option value="0">Okay/Not okay</option>
                                <option value="1">Parameters</option>
                            </Form.Select>
                        </div>

                        <div className="add-station-button">
                            <Button variant="danger" className="add-button-stn" onClick={addFormFromik.handleSubmit}>Add Station</Button>
                        </div>
                    </Form>
                </div>
                <div className="search-station-form">
                    <Form>
                        <Form.Group className="mb-3" aria-label="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Station Name" value={searchFormFromik.values.stationName} name="stationName" onChange={searchFormFromik.handleChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" aria-label="formBasicEmail">
                            <Form.Control type="text" placeholder="Enter Product Name" value={searchFormFromik.values.productName} name="productName" onChange={searchFormFromik.handleChange}/>
                        </Form.Group>
                    </Form>
                    <Button variant="danger" className="search-station-button" onClick={searchFormFromik.handleSubmit}>Search</Button>
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
                        {/* {checkArray.map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                                <Form.Check
                                    type="checkbox"
                                    id={`default-${type}`}
                                    label={type}
                                    checked={modalSelectedParams.includes(type)}
                                    onChange={() => { parameterChange(type) }}
                                />
                            </div>
                        ))} */}
                     <h3>Select Parameters:</h3>
                        {productParameters.map((parameter,index) => (
                            <div key={index}>
                            <label>
                                <input
                                type="checkbox"
                                checked={addFormFromik.values.stationParameter.includes(parameter)}
                                onChange={() => handleParameterChange(parameter)}
                                />
                                {parameter}
                            </label>
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
        </div>
    )
}

export default AddStation;
