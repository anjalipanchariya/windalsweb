import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Dropdown from 'react-bootstrap/Dropdown';
import './stationcards.css'

function StationCard(props){
    return(
        <>
       
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
                <td>{props.done}</td>
                <td>{props.notdone}</td>
                <td>{props.redo}</td>
            </tr>
          </table>
        </Card.Text>
      </Card.Body>
    </Card>
       
        </>
    )
}

export default StationCard;