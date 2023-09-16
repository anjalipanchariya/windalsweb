import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './updateStation.css';
import WindalsNav from "../navbar";

function UpdateStation() {
  return (
    <>
      <WindalsNav/>
      <div className="container-fluid">
        <div className="row">

          <div className="col-md-6 offset-md-3">
            <form className="row g-3">
              <button type="button" class="btn btn-danger">Update Station</button>
              <form className="row g-3">
                <div className="col-6">
                  <label htmlFor="stationSelect" className="form-label">
                    Select Station
                  </label>
                  <select className="form-select" id="stationSelect">
                    <option value="station1">Station 1</option>
                    <option value="station2">Station 2</option>
                    <option value="station3">Station 3</option>
                  </select>
                </div>

                <div className="col-6">
                  <label htmlFor="stationSelect" className="form-label">
                    Select Parameters
                  </label>
                  <select className="form-select" id="stationSelect">
                    <option value="station1">lenght</option>
                    <option value="station2">width</option>
                    <option value="station3">height</option>
                  </select>
                </div>

                <div className="col-12">
                  <button type="button" class="btn btn-danger">Update Station</button>
                  <button type="button" class="btn btn-danger">Delete Station</button>
                </div>
              </form>
            </form>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Parameter Name</th>
                  <th scope="col">Minimum Values</th>
                  <th scope="col">Maximum Values</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                  <td><i className="fas fa-trash"></i></td> {/* Font Awesome trash icon */}
                </tr>
                <tr>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                  <td><i className="fas fa-trash"></i></td>
                </tr>
                <tr>
                  <td></td>
                  <td>Larry the Bird</td>
                  <td>@twitter</td>
                  <td><i className="fas fa-trash"></i></td>
                </tr>
              </tbody>
            </table>


          </div>
        </div>
      </div>


    </>
  );
}

export default UpdateStation;