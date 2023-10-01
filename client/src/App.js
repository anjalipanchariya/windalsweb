import {React, useState} from 'react';
import './App.css';

import LoginPage from './components/login';
import { Routes, Route, Link} from 'react-router-dom';
import WorkerReg from './components/user/adduser';
import DeleteUser from './components/user/deleteuser';
import UpdateProduct from './components/product/updateproduct';
import UpdateStation from './components/station/updateStation';
import AddProduct from './components/product/addProduct';
import AddStation from './components/station/addStation';
import Admin from './components/Admin';
import ViewUser from './components/user/viewUser';
import ViewProduct from './components/product/viewProduct';
import ViewStation from './components/station/viewStation';
import StationAllocation from './components/station/allocateStation';
import FirstStation from './components/station/firstStation';
import NextStationAllocation from './components/station/nextStationAllocation';
import StationPage from './components/station/stationPage';
import ShiftConfig from './components/shift/shiftConfiguration';


function App() {
  
  return (
    <>
      <Routes>
        <Route path='/:userName/AdminPanel' element={<Admin/>}></Route>
        
        <Route path='/:userName/AddUser' element={<WorkerReg />} />
        <Route path='/:userName/UpdateAndDeleteUser' element={<DeleteUser />} />
        <Route path='/:userName/ViewUser' element={<ViewUser />} />

        <Route path='/:userName/AddProduct' element={<AddProduct />}></Route>
        <Route path='/:userName/UpdateAndDeleteProduct' element={<UpdateProduct />}></Route>
        <Route path='/:userName/viewproduct' element={<ViewProduct />}></Route>

        <Route path='/:userName/AddUpdateAndDeleteStation' element={<AddStation />}></Route>
        {/* <Route path='/:userName/updateStation' element={<UpdateStation />}></Route> */}
        <Route path='/:userName/ViewStation' element={<ViewStation />}></Route>
        <Route path='/:userName/AllocateStationToWorker' element={<StationAllocation />}></Route>
        <Route path='/:userName/AllocateNextStation' element={<NextStationAllocation />}></Route>
        
        <Route path='/Station/:employeeId/:userName/:stationName' element={<StationPage />}></Route>
        <Route path='/FirstStation/:employeeId/:userName/:stationName' element={<FirstStation />}></Route>
        
        <Route path='/:userName/ShiftConfig' element={<ShiftConfig />}></Route>
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
