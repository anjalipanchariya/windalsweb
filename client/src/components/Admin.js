import React, { useEffect, useState } from "react";
import WindalsNav from './navbar';
import Footer from './footer';
import toast, {Toaster} from "react-hot-toast";
import { logout, verifyLogin } from "../helper/helper";
import StationCard from "./stationcards";
import { getCurrentShift } from "../helper/helper";


function Admin(){
    
    const [currentActiveShift,setCurrentActiveShift] = useState("")
    
    useEffect(()=>{
        const verifyLoginPromise = verifyLogin()
        verifyLoginPromise.then((result)=>{
            console.log(result);
            const getCurrentShiftPromise = getCurrentShift()
            getCurrentShiftPromise.then((result)=>{
                console.log(result.shift_id);
                setCurrentActiveShift(result.shift_id)
            }).catch((err)=>{
                toast.error(err.msg)
            })
            return null  
        }).catch((err)=>{
            toast.error(err.msg)
            if(err.redirectUrl)
            {
                logout()
            }
        }) 
    },[])

    console.log({currentActiveShift:currentActiveShift});
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <WindalsNav />
            <div className="dashboard">
       
        <div className="cards">
        <StationCard number="1" worker = "abc" done='1' shift="2" notdone='0' redo='5'/>
        <StationCard number="2" worker = "xyz" done='10' shift="2" notdone='1' redo='3'/>
        <StationCard number="3" worker = "abc" done='18' shift="2" notdone='5' redo='2'/>
        <StationCard number="4" worker = "abc" done='8' shift="2" notdone='3' redo='3'/>
        <StationCard number="5" worker = "abc" done='2' shift="2" notdone='2' redo='4'/>
       </div> 
       </div>
            <Footer/>
        </div>
    )
}

export default Admin