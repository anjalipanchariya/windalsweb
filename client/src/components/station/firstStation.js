import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './firstStation.css';
import { getOneStation,createJobId,insertInStationyyyyFirst,insertInStationyyyyFirstNextStation } from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from "formik";

const FirstStation = () => {
    
    const stationName = "A1";
    const employeeId = "1";
    const [stationAllInfo,setStationAllInfo] = useState("");
    const [stationOneProductInfo,setStationOneProductInfo] = useState("");
    const [availableProducts,setAvailableProducts] = useState([]);
    const [products, setProducts] = useState([]); 

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
                console.log({result1:createJobResult});
                if (formik.values.product_name) 
                {
                    const newProduct = {
                        job_name: formik.values.job_name,
                        productName: formik.values.product_name,
                    };
                    setProducts([...products, newProduct]);
                    const insertInStationyyyyFirstPromise = insertInStationyyyyFirst(newValues)
                    insertInStationyyyyFirstPromise.then((insertInStationyyyyResult)=>{
                        console.log({result:insertInStationyyyyResult});
                        const insertInStationyyyyFirstNextStationPromise = insertInStationyyyyFirstNextStation(newValues)
                        insertInStationyyyyFirstNextStationPromise.then((insertInStationyyyyFirstNextResult)=>{
                            toast.success(insertInStationyyyyFirstNextResult.msg)
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

    console.log({"stationOneProductInfo":stationOneProductInfo,"stationAllinfo":stationAllInfo});
    return (
        <div className="container text-center mt-4">
            <Toaster position="top-center" reverseOrder={false}></Toaster>
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
                <h2>Added Products:</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Job Name</th>
                            <th>Product Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td>{product.job_name}</td>
                                <td>{product.productName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
        </div>
    );
};

export default FirstStation;