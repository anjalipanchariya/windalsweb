import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './firstStation.css';
import { getOneStation,createJobId,insertInStationyyyyFirst,insertInStationyyyyFirstNextStation,getWorkAtStationInDay } from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useFormik } from "formik";

const FirstStation = () => {
    
    const { employeeId, userName, stationName } = useParams();
    const [stationAllInfo,setStationAllInfo] = useState("");
    const [stationOneProductInfo,setStationOneProductInfo] = useState("");
    const [availableProducts,setAvailableProducts] = useState([]);
    const [workAtStationInDay,setWorkAtStationInDay] = useState([])

    const formik = useFormik({
        initialValues:{
            job_name:"",
            product_name:""
        },
        onSubmit:(values)=>{
            const newValues = {
                ...values,
                station_id: stationOneProductInfo[0].station_id,
                employee_id:employeeId  
            }
            const createJobIdPromise = createJobId(newValues)
            createJobIdPromise.then((createJobResult)=>{
                console.log({createJobResult:createJobResult});
                if (formik.values.product_name) 
                {
                    const insertInStationyyyyFirstPromise = insertInStationyyyyFirst(newValues)
                    insertInStationyyyyFirstPromise.then((insertInStationyyyyResult)=>{
                        console.log({insertInStationyyyyResult:insertInStationyyyyResult});
                        const insertInStationyyyyFirstNextStationPromise = insertInStationyyyyFirstNextStation(newValues)
                        insertInStationyyyyFirstNextStationPromise.then((insertInStationyyyyFirstNextResult)=>{
                            toast.success(insertInStationyyyyFirstNextResult.msg)
                            getSubmitedJobs()
                        }).catch((insertInStationyyyyFirstNextErr)=>{
                            toast.error(insertInStationyyyyFirstNextErr.msg)
                        })
                    }).catch((insertInStationyyyyErr)=>{
                        toast.error(insertInStationyyyyErr.msg)
                    })
                    formik.resetForm(); 
                }
            }).catch((createJobErr)=>{
                toast.error(createJobErr.msg)
            }) 
        }
    })

    useEffect(()=>{
        getSubmitedJobs()
    },[stationOneProductInfo])
   
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
        if (formik.values.product_name !== "") 
        {
            const stationOneProductInfo = stationAllInfo.filter((station) => {
                return station.station_name === stationName && station.product_name === formik.values.product_name;
            });
            setStationOneProductInfo(stationOneProductInfo);
        }
    },[formik.values.product_name])

    const getSubmitedJobs = () =>{
        if(stationOneProductInfo!="")
        {
            const stationId = stationOneProductInfo[0].station_id
            const getWorkAtStationInDayPromise = getWorkAtStationInDay(stationId)
            getWorkAtStationInDayPromise.then((result)=>{
                setWorkAtStationInDay(result)
            }).catch((err)=>{
                console.log(err);
                toast.error(err.msg)
            })
        }
    }
    console.log({"stationOneProductInfo":stationOneProductInfo,"stationAllinfo":stationAllInfo});
    console.log({"workAtStationInDay":workAtStationInDay});
    return (
        <div className="container text-center mt-4">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <h1>STATION NAME:{stationName}</h1>
            <h1>EMPLOYEE ID: {employeeId}</h1>
            <h1>USER NAME: {userName}</h1>
            <h1 className="centered-text">First Station</h1>
            <div className="form-group">
                <label htmlFor="job_nameInput">Enter the Job Name:</label>
                <input
                    type="text"
                    className="form-control"
                    id="job_nameInput"
                    value={formik.values.job_name}
                    name="job_name"
                    onChange={formik.handleChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="productSelect">Select a Product:</label>
                <select
                    className="form-control"
                    id="productSelect"
                    value={formik.values.product_name}
                    name="product_name"
                    onChange={formik.handleChange}
                >
                    <option value="">--Select Product--</option>
                    {availableProducts.map((product, index) => (
                        <option key={index} value={product}>
                            {product}
                        </option>
                    ))}
                </select>
            </div>
            <button className="btn btn-danger" onClick={formik.handleSubmit}>
                Add Product
            </button>
            <div>
                <h2>Jobs Submitted:</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Job Name</th>
                            <th>Status</th>
                            <th>Reason</th>    
                            <th>Parameter values</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(workAtStationInDay) && workAtStationInDay.map((job, index) => (
                            <tr key={index}>
                                <td>{job.product_name}</td>
                                <td>{job.job_name}</td>
                                <td>{job.status==1 ? "OK" : "Not-Ok"}</td>
                                <td>{(job.reason!="" || job.reason!=null) ? job.reason : "N.A"}</td>
                                <td>{(job.parameters!="" || job.parameters!=null) ? job.parameters : "N.A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default FirstStation;