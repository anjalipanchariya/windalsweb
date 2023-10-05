import React, { useState } from "react";
import './adduser.css'
import { useFormik } from "formik";
import { registerUser } from "../../helper/helper";
import toast, { Toaster } from 'react-hot-toast';
import WindalsNav from "../navbar";
import * as Yup from "yup";

function WorkerReg(){
  const today = new Date();
   
  const accessOptions = [ "Add User", "View User", "Delete User", "Modify User", "Add Product", "Veiw Product", "Delete Product", "Modify Product",
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
    mobileNo:Yup.string().required(),
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
      joiningDate:today.toISOString(), // Set the initial value to the current date
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
          <div>{formik.errors.userName}</div>
        ) : null}
            <input type='text' placeholder="First Name" value={formik.values.firstName} name="firstName" onChange={formik.handleChange}/>
            { formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
            <input type='text' placeholder="Last Name" value={formik.values.lastName} name="lastName" onChange={formik.handleChange}/>
            { formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
            <input type='text' placeholder="Nick Name " value={formik.values.nickName} name="nickName" onChange={formik.handleChange}/>
            { formik.errors.nickName ? (
          <div>{formik.errors.nickName}</div>
        ) : null}
            <input type="number" placeholder="Mobile Number" value={formik.values.mobileNo} name="mobileNo" onChange={formik.handleChange}/>
            { formik.errors.mobileNo ? (
          <div>{formik.errors.mobileNo}</div>
        ) : null}
            <input type='password' placeholder="Password" value={formik.values.password} name="password" onChange={formik.handleChange}/>
            { formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
            <input type='password' placeholder="Confirm Password" value={formik.values.confirmPassword} name="confirmPassword" onChange={formik.handleChange}/>
            { formik.errors.confirmPassword ? (
          <div>{formik.errors.confirmPassword}</div>
        ) : null}
            <input type='text' placeholder="Designation" value={formik.values.designation} name="designation" onChange={formik.handleChange}/>
            { formik.errors.designation ? (
          <div>{formik.errors.designation}</div>
        ) : null}
            <label>Joining date:</label>
            <input type='date' placeholder="Joining Date" value={formik.values.joiningDate} name="joiningDate" onChange={formik.handleChange}/>   
            { formik.errors.joiningDate ? (
          <div>{formik.errors.joiningDate}</div>
        ) : null}
            <button className="subbtn" type="submit" onClick={formik.handleSubmit}>Register</button>
        </form>

        {
        accessOptions.map((option, index) => (
          <div key={option}>
            <label>
              <input
                type="checkbox"
                checked={accessGiven[index]}
                onChange={() => handleAccessOptionCheck(index)}
              />
              {option}
            </label>
          </div>
        ))
      }

        <footer className = "footer">
            <h6>Vishwakarma Institute of Information Technology</h6>
        </footer>
        </>
    )
}

export default WorkerReg;