import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { loginUser, getCurrentShift } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

const LoginPage = () => {

  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
      shift:''
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      // if(values.userName == "admin" && values.password == "admin")
      //       {
      //         navigate('/admin');
      //       }
      //       else{
      //         navigate('/station/firststation');
      //       }
      const loginPromise= loginUser(values)
      toast.promise(loginPromise,
        {
          loading: "Checking creds",
          success: result =>{
            if(result.userName === "admin")
            {
              navigate(`/${result.userName}/AdminPanel`);
            }
            else{
              if(result.stationName==="S1")
              {
                navigate(`/FirstStation/${result.employeeId}/${result.userName}/${result.stationName}`);
              }
              else
              {
                navigate(`/Station/${result.employeeId}/${result.userName}/${result.stationName}`);
              }
              
            }
            return result.msg
          },
          error: err => {
            console.log(err);
           return err.msg
          }
        })
    },
  });

  useEffect(()=>{
    const getCurrentShiftPromise = getCurrentShift()
    getCurrentShiftPromise.then((result)=>{
      console.log(result);
      formik.setFieldValue("shift",result)
    }).catch((err)=>{
      toast.error(err.msg)
    })
  },[])

  return (
    <div className="container d-flex justify-content-center">
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="col-md-6 bg-light-grey">
        <form className="row g-3" onSubmit={formik.handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="inputEmail4"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
            />
            {formik.touched.userName && formik.errors.userName?(<Alert variant="danger" className="error-message">{formik.errors.userName}</Alert>):null}
          </div>
          
          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
          {formik.touched.password && formik.errors.password?(<Alert variant="danger" className="error-message">{formik.errors.password}</Alert>):null}
          </div>

          <div className="col-12">
           <button type="button" className="btn btn-danger" onClick={formik.handleSubmit}>
           Login
           </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;