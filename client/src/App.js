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
import Worker from './components/worker';

function App() {
  
  return (
    <>
     
      
      <Routes>
      
      <Route path='/Worker' element={<Worker/>}></Route>
        <Route path='/Admin' element={<Admin/>}></Route>
        <Route path='/user/adduser' element={<WorkerReg />} />
        <Route path='/user/deleteuser' element={<DeleteUser />} />

        <Route path='/product/addProduct' element={<AddProduct />}></Route>
        <Route path='/product/updateproduct' element={<UpdateProduct />}></Route>

        <Route path='/station/addStation' element={<AddStation />}></Route>
        <Route path='/station/updateStation' element={<UpdateStation />}></Route>
        
        <Route path='/' element={<LoginPage />} />
      </Routes>
    </>
  );
}

export default App;
