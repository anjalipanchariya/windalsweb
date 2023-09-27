import React, { useEffect } from "react";
import WindalsNav from './navbar';
import toast, {Toaster} from "react-hot-toast";
import { logout, verifyLogin } from "../helper/helper";

function Admin(){
    useEffect(()=>{
        const verifyLoginPromise = verifyLogin()
        verifyLoginPromise.then((result)=>{
            console.log(result);
            return null  
        }).catch((err)=>{
            toast.error(err.msg)
            if(err.redirectUrl)
            {
                logout()
            }
        }) 
    },[])

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <WindalsNav userName="admin"/>
        </div>
    )
}

export default Admin