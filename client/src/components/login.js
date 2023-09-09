import React from 'react';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import { loginUser } from '../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {

  const navigate=useNavigate();
  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      userName: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      if(values.userName == "admin" && values.password == "admin")
            {
              navigate('/admin');
            }
            else{
              navigate('/worker');
            }
      // const loginPromise= loginUser(values)
      // toast.promise(loginPromise,
      //   {
      //     loading: "Checking creds",
      //     success: result =>{
      //       console.log(result.msg);
      //       if(values.userName == "admin" && values.password == "admin")
      //       {
      //         navigate('/admin');
      //       }
      //       else{
      //         navigate('/worker');
      //       }
      //       return result.msg
      //     },
      //     error: err => {
            
      //      return err.msg
      //     }
      //   })
    },
  });

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
          </div>
          {formik.errors.userName && formik.errors.userName}
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
          {formik.errors.password && formik.errors.password}
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