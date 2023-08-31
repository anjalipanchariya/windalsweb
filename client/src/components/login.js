import React from 'react';
import { useFormik } from 'formik';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const LoginPage = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      admin: false,
      station: 'station1',
    },
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    },
  });

  return (
    <div className="container d-flex justify-content-center">
      <div className="col-md-6 bg-light-grey">
        <form className="row g-3" onSubmit={formik.handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Username
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
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
          </div>

          <div className="col-12">
            <label className="custom-checkbox-label">
              <input
                type="checkbox"
                className="form-check-input custom-checkbox"
                id="adminCheckbox"
                name="admin"
                checked={formik.values.admin}
                onChange={formik.handleChange}
              />
              <span className="custom-checkbox-icon">
                <span className="checkmark">&#10003;</span>
              </span>
              Admin
            </label>
          </div>

          <div className="col-12">
            <label htmlFor="stationSelect" className="form-label">
              Select Station
            </label>
            <select
              className="form-select"
              id="stationSelect"
              name="station"
              value={formik.values.station}
              onChange={formik.handleChange}
            >
              <option value="station1">Station 1</option>
              <option value="station2">Station 2</option>
              <option value="station3">Station 3</option>
            </select>
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