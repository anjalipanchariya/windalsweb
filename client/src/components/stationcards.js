import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import './stationcards.css'
import { getCountOfWorkAtStation } from "../helper/helper";
import toast, { Toaster } from 'react-hot-toast';

function StationCard(props){
  
  const [jobCountInfo,setJobCountInfo] = useState({
    ok:0,
    notok:0,
    rework:0
  })
  
  useEffect(()=>{
    const getCountOfWorkAtStationPromise = getCountOfWorkAtStation(props.name)
    getCountOfWorkAtStationPromise.then((result)=>{
      setJobCountInfo(result)
    }).catch((err)=>{
      toast.error(err.msg)
    })
  },[])  
  
  console.log({stationName:props.name,jobCountInfo:jobCountInfo});
  return(
        <>
       <Toaster position="top-center" reverseOrder={false}></Toaster>
        <Card style={{ width: '14rem', margin:20}}>
      <Card.Body>
        <Card.Title>Station NO:{props.number}</Card.Title>
        <Card.Title>Station Name:{props.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Worker name : {props.worker}</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">Status</Card.Subtitle>
        <Card.Text >
          <table>
            <tr>
            <th>Done</th>
            <th>Not Done</th>
            <th>Redo</th>
            </tr>
            <tr>
                <td>{jobCountInfo.ok}</td>
                <td>{jobCountInfo.notok}</td>
                <td>{jobCountInfo.rework}</td>
            </tr>
          </table>
        </Card.Text>
      </Card.Body>
    </Card>
       
        </>
    )
}

export default StationCard;