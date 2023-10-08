import React, { useState } from "react";
import './adduser.css'
import { useFormik } from "formik";
import { registerUser } from "../../helper/helper";
import toast, { Toaster } from 'react-hot-toast';
import WindalsNav from "../navbar";
import * as Yup from "yup";
import { Alert } from "react-bootstrap";
import Footer from '../footer';


function WorkerReg(){
  const today = new Date();
   
  const accessOptions = [ "Add User", "View User", "Delete User", "Modify User", "Add Product", "View Product", "Delete Product", "Modify Product",
   "Add Station", "View Station", "Delete Station", "Modify Station", "Allocate Next Station for Product", "Update Next Station Allocated for Product", 
  "Delete Next Station Allocated for Product", "View Next Station Allocated for Product", "Allocate Station to Worker", "View Station allocated to worker","Configure Shift"] 
  
  const [accessGiven, setAccessGiven] = useState(new Array(accessOptions.length).fill(false));

  const userValidationSchema= Yup.object().shape({
    userName:Yup.string().required(),
    firstName:Yup.string().required(),
    lastName:Yup.string().required(),
    nickName:Yup.string().required(),
    password:Yup.string().required(),
    confirmPassword:Yup.string().required(),
    designation:Yup.string().required(),
    mobileNo: Yup.string()
    .required()
    .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
    .test("is-positive", "Mobile number must be positive", (value) => {
      return parseInt(value) > 0;
    }),
    accessGiven:Yup.string().required(),
    joiningDate: Yup.date()
    .required()
    .max(today, "Joining date cannot be in the future")
    
  })
  const formik = useFormik({
    initialValues:{
      userName:"",
      firstName:"",
      lastName:"",
      nickName:"",
      password:"",
      confirmPassword:"",
      designation:"",
      joiningDate:today.toISOString().substring(0, 10), // Set the initial value to the current date
      mobileNo:"",
      accessGiven: "000000000000000000"
    },
    validationSchema:userValidationSchema,
    onSubmit: values => {
      values.accessGiven = accessGiven.map(val => val ? "1" : "0").join("");
      console.log(values);
      const registerUserPromise = registerUser(values)
      toast.promise(
        registerUserPromise,
        {
          loading: "Registering user",
          success: (reuslt) => {
            formik.resetForm()
            setAccessGiven(new Array(accessOptions.length).fill(false))
            return reuslt.msg 
          },
          error: err => err.msg
        }
      )
    }
  })
  
  const handleAccessOptionCheck = (index) => {
    const updatedAccess = [...accessGiven];
    updatedAccess[index] = !updatedAccess[index];
    setAccessGiven(updatedAccess);
  }
  
  return(

        <>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <WindalsNav/>
        <h1 className="heading">Worker Registration</h1>
        <form className="workerreg">        
            <input type='text' placeholder="Username Name" value={formik.values.userName} name="userName" onChange={formik.handleChange}/>
            { formik.errors.userName ? (
          <Alert variant="danger" className="error-message">{formik.errors.userName}</Alert>
        ) : null}
            <input type='text' placeholder="First Name" value={formik.values.firstName} name="firstName" onChange={formik.handleChange}/>
            { formik.errors.firstName ? (
          <Alert variant="danger" className="error-message">{formik.errors.firstName}</Alert>
        ) : null}
            <input type='text' placeholder="Last Name" value={formik.values.lastName} name="lastName" onChange={formik.handleChange}/>
            { formik.errors.lastName ? (
          <Alert variant="danger" className="error-message">{formik.errors.lastName}</Alert>
        ) : null}
            <input type='text' placeholder="Nick Name " value={formik.values.nickName} name="nickName" onChange={formik.handleChange}/>
            { formik.errors.nickName ? (
          <Alert variant="danger" className="error-message">{formik.errors.nickName}</Alert>
        ) : null}
            <input type="text" placeholder="Mobile Number" value={formik.values.mobileNo} name="mobileNo" onChange={formik.handleChange}/>
            { formik.errors.mobileNo ? (
          <Alert variant="danger" className="error-message">{formik.errors.mobileNo}</Alert>
        ) : null}
            <input type='password' placeholder="Password" value={formik.values.password} name="password" onChange={formik.handleChange}/>
            { formik.errors.password ? (
          <Alert variant="danger" className="error-message">{formik.errors.password}</Alert>
        ) : null}
            <input type='password' placeholder="Confirm Password" value={formik.values.confirmPassword} name="confirmPassword" onChange={formik.handleChange}/>
            { formik.errors.confirmPassword ? (
          <Alert variant="danger" className="error-message">{formik.errors.confirmPasswor}</Alert>)
           : null}
            <input type='text' placeholder="Designation" value={formik.values.designation} name="designation" onChange={formik.handleChange}/>
            { formik.errors.designation ? (
          <Alert variant="danger" className="error-message">{formik.errors.designation}</Alert>
        ) : null}
            <label>Joining date:</label>
            <input type='date' placeholder="Joining Date" value={formik.values.joiningDate} name="joiningDate" onChange={formik.handleChange}/>   
            { formik.errors.joiningDate ? (
          <Alert variant="danger" className="error-message">{formik.errors.joiningDate}</Alert>
        ) : null}
            <button className="subbtn" type="submit" onClick={formik.handleSubmit}>Register</button>
        </form>


        <br />
        <div className="checkbox-groups">
          <div className="row">
            {accessOptions.slice(0, 6).map((option, index) => (
              <div key={option} className="col-md-2">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={accessGiven[index]}
                    onChange={() => handleAccessOptionCheck(index)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="row">
            {accessOptions.slice(6, 12).map((option, index) => (
              <div key={option} className="col-md-2">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={accessGiven[index + 6]}
                    onChange={() => handleAccessOptionCheck(index + 6)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="row">
            {accessOptions.slice(12).map((option, index) => (
              <div key={option} className="col-md-2">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={accessGiven[index + 12]}
                    onChange={() => handleAccessOptionCheck(index + 12)}
                  />
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </>
    )}

export default  WorkerReg;
