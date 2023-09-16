import React from "react";
import './adduser.css'
import { useFormik } from "formik";
import { registerUser } from "../../helper/helper";
import toast, { Toaster } from 'react-hot-toast';
import WindalsNav from "../navbar";

function WorkerReg(){
   
  const formik = useFormik({
    initialValues:{
      userName:"",
      firstName:"",
      lastName:"",
      nickName:"",
      password:"",
      confirmPassword:"",
      designation:"",
      joiningDate:"",
      mobileNo:"",
    },
    onSubmit: values => {
      const registerUserPromise = registerUser(values)
      toast.promise(
        registerUserPromise,
        {
          loading: "Registering user",
          success: (reuslt) => {
            formik.resetForm()
            return reuslt.msg 
          },
          error: err => err.msg
        }
      )
    }
  })
  
  
  return(
        <>
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <WindalsNav/>
        <h1 className="heading">Worker Registration</h1>
        <form className="workerreg">        
            <input type='text' placeholder="Username Name" value={formik.values.userName} name="userName" onChange={formik.handleChange}/>
            <input type='text' placeholder="First Name" value={formik.values.firstName} name="firstName" onChange={formik.handleChange}/>
            <input type='text' placeholder="Last Name" value={formik.values.lastName} name="lastName" onChange={formik.handleChange}/>
            <input type='text' placeholder="Nick Name " value={formik.values.nickName} name="nickName" onChange={formik.handleChange}/>
            <input type="number" placeholder="Mobile Number" value={formik.values.mobileNo} name="mobileNo" onChange={formik.handleChange}/>
            <input type='password' placeholder="Password" value={formik.values.password} name="password" onChange={formik.handleChange}/>
            <input type='password' placeholder="Confirm Password" value={formik.values.confirmPassword} name="confirmPassword" onChange={formik.handleChange}/>
            <input type='text' placeholder="Designation" value={formik.values.designation} name="designation" onChange={formik.handleChange}/>
            <input type='date' placeholder="Joining Date" value={formik.values.joiningDate} name="joiningDate" onChange={formik.handleChange}/>   
            <button className="subbtn" type="submit" onClick={formik.handleSubmit}>Register</button>
        </form>

        <footer className = "footer">
            <h6>Vishwakarma Institute of Information Technology</h6>
        </footer>
        </>
    )
}

export default WorkerReg;