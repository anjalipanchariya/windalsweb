import React from 'react';
import './App.css';
import WindalsNav from './components/navbar';
import Station from './components/station';
import Adduser from './components/adduser';
import DeleteUser from './components/deleteuser';

function App() {
  return (
    <>
      <WindalsNav/>
      {/* <Station/> */}
      {/* <Adduser/> */}
      <DeleteUser/>
    </>
  );
}

export default App;
