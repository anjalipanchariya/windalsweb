import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modal from 'react-modal';
import { Formik, Form, Field, useFormik, validateYupSchema } from 'formik';
import * as Yup from 'yup';
import {
  getOneStation,
  createJobId,
  insertInStationyyyyFirst,
  insertInStationyyyyFirstNextStation,
  getJobesAtStation,
} from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';

const StationPage = () => {
  const stationName = "S2";
  const employeeId = "1";
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stationAllInfo, setStationAllInfo] = useState("");
  const [stationOneProductInfo, setStationOneProductInfo] = useState("");
  const [availableProducts, setAvailableProducts] = useState([]);
  const [product_name, setProductName] = useState("");
  const [jobsAtStation, setJobsAtStation] = useState([]);
  const [parameterNames, setParameterNames] = useState([]); // Store parameter names as an array

  const formik = useFormik({
    initialValues:{
      selectedJob:null,
      status:"",  //1-ok,0-rework,-1-rejected
      reason:"",
      parameterValues:{}
    },
    // validationSchema: validateYupSchema,
    onSubmit:(values)=>{
      console.log(values);
      formik.resetForm()
      setDropdownOptions([])
      setDropdownPosition(null)
      closeModal()
    }
  })

  useEffect(() => {
    const getStationAllInfoPromise = getOneStation(stationName);
    getStationAllInfoPromise.then((result) => {
      setStationAllInfo(result);
    }).catch((err) => {
      toast.error(err.msg);
    });
  }, []);

  useEffect(() => {
    if (stationAllInfo.length > 0) {
      const productNames = [...new Set(stationAllInfo.map((station) => station.product_name))];
      setAvailableProducts(productNames);
    }
  }, [stationAllInfo]);

  useEffect(() => {
    if (product_name !== "") {
      const stationOneProductInfo = stationAllInfo.filter((station) => {
        return station.station_name === stationName && station.product_name === product_name;
      });
      setStationOneProductInfo(stationOneProductInfo);

      // Split the parameter names string into an array
      const parameterNamesArray = stationOneProductInfo[0].station_parameters.split(',');
      setParameterNames(parameterNamesArray);
    }
  }, [product_name]);

  useEffect(() => {
    if (stationOneProductInfo.length > 0) {
      const getJobesAtStationPromise = getJobesAtStation(stationOneProductInfo[0].station_id,stationOneProductInfo[0].product_name);
      getJobesAtStationPromise.then((result) => {
        setJobsAtStation(result);
      }).catch((err) => {
        toast.error(err.msg);
      });
    }
  }, [stationOneProductInfo]);

  const handleJobIdClick = async (job, event) => {
    formik.setFieldValue("selectedJob",job);
    const rect = event.target.getBoundingClientRect();
    const middleTop = (window.innerHeight - rect.height) / 2;
    setDropdownPosition({
      top: middleTop,
      left: rect.left,
    });

    // Access the station_parameters from stationOneProductInfo
    const stationParameters = stationOneProductInfo[0]?.station_parameters;

    // Create an object with keys from station_parameters and empty strings as values
    const parametersObject = stationParameters
      ? await stationParameters.split(',').reduce((acc, paramName) => {
          acc[paramName.trim()] = '';
          return acc;
        }, {})
      : null;

    formik.setFieldValue("parameterValues",parametersObject)

    const options = stationOneProductInfo.length > 0 && stationOneProductInfo[0].report === 1
      ? ['✅ Ok', '❌ Not Okay', '↪ Rework', 'Parameters']
      : ['✅ Ok', '❌ Not Okay', '↪ Rework'];
    setDropdownOptions(options);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === '✅ Ok') {
      formik.setFieldValue("status",1)
      formik.handleSubmit()
    } else if (option === '❌ Not Okay') {
      formik.setFieldValue("status",-1)
      openModal();
    } else if (option === '↪ Rework') {
      formik.setFieldValue("status",0)
      openModal();
    }
  };

  const setParameterValue = (parameter, value) => {
    // Clone the existing parameterValues object
    const updatedParameterValues = { ...formik.values.parameterValues };
  
    // Set the value for the parameter
    updatedParameterValues[parameter] = value;
  
    // Update the parameterValues field in Formik
    formik.setFieldValue("parameterValues", updatedParameterValues);
  };

  console.log({jobsAtStation:jobsAtStation,stationOneProductInfo:stationOneProductInfo,stationAllInfo:stationAllInfo});
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <h1>{stationName}</h1>
      <div className="form-group">
        <label htmlFor="productSelect">Select a Product:</label>
        <select
          className="form-control"
          id="productSelect"
          value={product_name}
          name="product_name"
          onChange={(e) => {
             setProductName(e.target.value)
             closeModal()
            }}
        >
          <option value="">--Select Product--</option>
          {availableProducts.map((product, index) => (
            <option key={index} value={product}>
              {product}
            </option>
          ))}
        </select>
      </div>
      <h3>Job At Station</h3>
      <ul>
        { jobsAtStation.map((job) => (
          <li
            key={job.job_id}
            onClick={(e) => handleJobIdClick(job, e)}
            style={{ cursor: 'pointer' }}
          >
            {job.job_name}
          </li>
        ))}
      </ul>

      {formik.values.selectedJob != null && (
        <div
          style={{
            position: 'absolute',
            top: dropdownPosition ? dropdownPosition.top : '0',
            left: dropdownPosition ? dropdownPosition.left : '0',
            border: '1px solid #ccc',
            background: '#fff',
            padding: '8px',
          }}
        >
          <h2> {formik.values.selectedJob.job_name}</h2>

          <ul>
            {dropdownOptions.map((option) => {
              if(option!="Parameters")
              {
                return (<li
                  key={option}
                  onClick={() => handleDropdownOptionClick(option)}
                  style={{ cursor: 'pointer' }}
                >
                  {option}
                </li>)
              }
              else
              {
                return (
                  parameterNames.map((parameter) => (
                    <div key={parameter}>
                      <label>{parameter}</label>
                      <input
                        type="number"
                        placeholder="Enter the value"
                        onChange={(e) => setParameterValue(parameter, e.target.value)}
                      />
                    </div>
                  ))
                )
              }
            })}
          </ul>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Reason</h2>
          <div>
            <label htmlFor="reason">Enter a reason:</label>
            <input type="text" name="reason" id="reason" value={formik.values.reason} onChange={formik.handleChange}/>
            <button onClick={formik.handleSubmit}>Submit</button>
            <button onClick={closeModal}>Close Modal</button>
          </div>
      </Modal>

    </div>
  );
};

export default StationPage;
