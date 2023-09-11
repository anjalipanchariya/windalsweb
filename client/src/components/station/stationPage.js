import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Modal from 'react-modal';
import { Formik, Form, Field } from 'formik'; 
import * as Yup from 'yup'; 
import { getOneStation,createJobId,insertInStationyyyyFirst,insertInStationyyyyFirstNextStation,getJobesAtStation } from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';

const StationPage = () => {

  const stationName = "A1";
  const employeeId = "1";
  const [jobIds, setJobIds] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [dropdownPosition, setDropdownPosition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isParametersModalOpen, setIsParametersModalOpen] = useState(false);
  const [stationAllInfo,setStationAllInfo] = useState("");
  const [stationOneProductInfo,setStationOneProductInfo] = useState("");
  const [availableProducts,setAvailableProducts] = useState([]);
  const [product_name,setProDuctName] = useState("") 
  const [jobsAtStation,setJobsAtStation] = useState([])

  useEffect(() => {
    const simulatedJobIds = [
      { id: 'JobId1', hasParameters: false },
      { id: 'JobId2', hasParameters: true },
      { id: 'JobId3', hasParameters: false },
    ];
    setJobIds(simulatedJobIds);
  }, []);

  useEffect(() => {
    const getStationAllInfoPromise = getOneStation(stationName)
    getStationAllInfoPromise.then((result)=>{
        setStationAllInfo(result)
    }).catch((err)=>{
        toast.error(err.msg)
    })
  }, []);

  useEffect(()=>{
        if (stationAllInfo.length > 0) {
            const productNames = [...new Set(stationAllInfo.map((station) => station.product_name))];
            setAvailableProducts(productNames);
        }
  },[stationAllInfo])

  useEffect(()=>{
        if (product_name !== "") 
        {
            const stationOneProductInfo = stationAllInfo.filter((station) => {
                return station.station_name === stationName && station.product_name === product_name;
            });
            setStationOneProductInfo(stationOneProductInfo);
        }
  },[product_name])

  useEffect(()=>{
    if(stationOneProductInfo!="")
    {
      const getJobesAtStationPromise = getJobesAtStation(stationOneProductInfo[0].station_id)
      getJobesAtStationPromise.then((result)=>{
        setJobsAtStation(result)
      }).catch((err)=>{
        toast.error(err.msg)
      })
    }
  },[stationOneProductInfo])

  

  const handleJobIdClick = (jobId, event) => {
    setSelectedJobId(jobId);

   
    const rect = event.target.getBoundingClientRect();
    const middleTop = (window.innerHeight - rect.height) / 2;
    setDropdownPosition({
      top: middleTop, 
      left: rect.left,
    });

   
    const options = jobId.hasParameters
      ? ['✅ Ok', '❌ Not Okay', '↪ Rework', 'Parameters']
      : ['✅ Ok', '❌ Not Okay', '↪ Rework'];
    setDropdownOptions(options);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const submitModal = () => {
  
    setIsModalOpen(false);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openParametersModal = () => {
    setIsParametersModalOpen(true);
  };

  const submitParametersModal = () => {
    
    closeParametersModal();
  };

  const closeParametersModal = () => {
    setIsParametersModalOpen(false);
  };

  const handleDropdownOptionClick = (option) => {
    if (option === '✅ Ok') {
     
    } else if (option === '❌ Not Okay') {
     
      openModal();
    } else if (option === '↪ Rework') {
      
      openModal();
    } else if (option === 'Parameters') {
      
      openParametersModal();
    }

   
    setJobIds(jobIds.filter((job) => job.id !== selectedJobId.id));

    
    setSelectedJobId(null);
    setDropdownOptions([]);
  };

  console.log(jobsAtStation);
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
                    onChange={(e)=>setProDuctName(e.target.value)}
                >
                    <option value="">--Select Product--</option>
                    {availableProducts.map((product, index) => (
                        <option key={index} value={product}>
                            {product}
                        </option>
                    ))}
                </select>
            </div>
      <h3>JobIds</h3>
      <ul>
        {jobIds.map((jobId) => (
          <li
            key={jobId.id}
            onClick={(e) => handleJobIdClick(jobId, e)}
            style={{ cursor: 'pointer' }}
          >
            {jobId.id}
          </li>
        ))}
      </ul>

      {selectedJobId && (
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
          <h2> {selectedJobId.id}</h2>

          <ul>
            {dropdownOptions.map((option) => (
              <li
                key={option}
                onClick={() => handleDropdownOptionClick(option)}
                style={{ cursor: 'pointer' }}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}

     
      <Modal
        isOpen={isModalOpen}
        
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Reason</h2>
        <Formik
          initialValues={{ reason: '' }}
          validationSchema={Yup.object().shape({
            reason: Yup.string().required('Reason is required'),
          })}
          onSubmit={(values) => {
            
            closeModal();
          }}
        >
          <Form>
            <label htmlFor="reason">Enter a reason:</label>
            <Field type="text" name="reason" id="reason" />
            <button type="submit" onclick={submitModal}>Submit</button>
            <button onClick={closeModal}>Close Modal</button>
          </Form>
        </Formik>
      </Modal>


     
      <Modal
  isOpen={isParametersModalOpen}
  onRequestClose={closeParametersModal}
  contentLabel="Parameters Modal"
>
  <h2>Parameters</h2>
  <div>
    <label>
      <input type="checkbox" name="length" /> Length
    </label>
  </div>
  <div>
    <label>
      <input type="checkbox" name="width" /> Width
    </label>
  </div>
  <div>
    <label>
      <input type="checkbox" name="radius" /> Radius
    </label>
  </div>
  <button onClick={submitParametersModal}>Submit</button>
  <button onClick={closeParametersModal}>Close Modal</button>
</Modal>


    </div>
  );
};

export default StationPage;