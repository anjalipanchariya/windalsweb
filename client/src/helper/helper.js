import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export async function addProduct(values){
    try {
        const token = localStorage.getItem("token")
        const {data,status} = await axios.post("http://localhost:8080/api/ProductMasterInsert",values,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export async function updateProducts(productName,existingParameters){
    const values = {ProductName:productName,parameters:existingParameters}
    const token = localStorage.getItem("token")
    try {
        const {data,status} = await axios.put("http://localhost:8080/api/ProductMasterUpdate",values,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export async function deleteProductParameter(productId){
    try{
        const token = localStorage.getItem("token")
        const {data,status} = await axios.delete("http://localhost:8080/api/ProductMasterDelete",{params:{productId},headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    }catch(error){
        return Promise.reject(error.response.data);
    }
}

export async function getAllProducts(){
    try{
        const {data,status} = await axios.get("http://localhost:8080/api/ProductMasterGet")
        return Promise.resolve(data)
    } catch(error){
        return Promise.reject(error.response.data);
    }
}

export async function getOneProductAllParameters(productName){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/ProductMasterGetOneProductAllParameters",{params:{productName:productName}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export async function getOneProductOneParameter(values){
    const {productName,productParameter} = values
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/ProductMasterGetOneProductOneParameter",{params:{productName:productName,productParameter:productParameter}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export async function getProductNames(){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/ProductMasterGetProductNames")
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function addStation(values){
    console.log(values);
    try {
        const token = localStorage.getItem("token")
        const {data,status} = await axios.post("http://localhost:8080/api/StationMasterInsert",values,{headers:{"Authorization":`Bearer ${token}`}})
        console.log(data);
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function getStations(){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/StationMasterGet")
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function getOneStation(stationName){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/StationMasterGetOneStation",{params:{stationName}})
        return Promise.resolve(data)
    } catch (error) {
        console.log(error);
        return Promise.reject(error.response.data)
    }
}

export async function getOneStationOneProduct(values){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/StationMasterGetOneStationOneProduct",{params:{values}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function deleteStation(stationId){
    try {
        const token = localStorage.getItem("token")
        const {data,status} = await  axios.delete("http://localhost:8080/api/StationMasterDelete",{params:{stationId},headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function updateStation(values){
    try {
        const token = localStorage.getItem("token")
        const {data,status} = await axios.put("http://localhost:8080/api/StationMasterUpdate",values,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function getAllStationNames(){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/StationMasterGetNames")
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function getOneProductStationNames(productName){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/StationMasterGetNamesForOneProduct",{params:{productName:productName.value}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}



export async function registerUser(values){
    try {
        const token = localStorage.getItem("token")
        const {data,status} = await axios.post("http://localhost:8080/api/EmployeeMasterInsert",values,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function getAllUsers(){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/EmployeeMasterGet")
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function getAllWorkerNames(){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/EmployeeMasterGetNames")
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function getOneEmployee(userName){
    try {
        const {data,status} = await axios.get("http://localhost:8080/api/EmployeeMasterGetOne",{params:{userName}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function updateEmployee(values){
    try {
        const token = localStorage.getItem("token")
        const {data,status} = await axios.put("http://localhost:8080/api/EmployeeMasterUpdate",values,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        console.log(error);
        return Promise.reject(error.response.data)
    }
}

export async function deleteEmployee(employeeId){
    try {
        const token = localStorage.getItem("token")
        const {data,status} = await axios.delete("http://localhost:8080/api/EmployeeMasterDelete",{params:{employeeId},headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        console.log(error);
        return Promise.reject(error.response.data)
    }
}

export async function addStationAllocation(values){
    try {
        const token = localStorage.getItem("token")
        const {data,status} = await axios.post("http://localhost:8080/api/StationAllocationInsert",values,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}


export async function createJobId(values){
    try {
        const {data,status} = await axios.post("http://localhost:8080/api/ProductyyyyInsert",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function configureNextStation(values){
    const newValues = {
        productName : values.productName.value,
        nextStationAllocation: values.nextStationAllocation.map((station)=>{
            return ({
                currentStation: station.currentStation,
                nextStation: station.nextStation.value
            })
        })
    }
    const token = localStorage.getItem("token")
    try {
        const {data,status} = await axios.put("http://localhost:8080/api/StationMasterAddNextStation",newValues,{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function insertInStationyyyyFirst(values){
    try {
        const {data,status} = await axios.post("http://localhost:8080/api/StationyyyyInsertFirst",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function insertInStationyyyyFirstNextStation(values){
    try {
        const {data,status} = await axios.post("http://localhost:8080/api/StationyyyyInsertFirstNextStation",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function getJobesAtStation(stationId,productName){
    try {
        const {data,status} = await axios.post("http://localhost:8080/api/StationyyyyShowJob",{station_id:stationId,product_name:productName})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function updateJobesAtStation(values,stationId,employeeId){
    let formattedString = '';
    if (values.parameterValues!==null && values.parameterValues!={}) {
        // Convert parameterValues object to a string
        const parameterString = Object.entries(values.parameterValues)
          .map(([key, value]) => `${key},${value}`)
          .join(';');
    
        formattedString += parameterString;
      }
    
      if (values.reason!=="") {
        // Append the reason to the string if it exists
        if (formattedString.length > 0) {
          formattedString += `;${values.reason}`;
        } else {
          formattedString += values.reason;
        }
      }
    
      // If neither reason nor parameters exist, set the string to null
      if (formattedString.length === 0) {
        formattedString = null;
      }
    
    const newValues = {
        product_name:values.selectedJob.product_name,
        job_name:values.selectedJob.job_name,
        status:values.status,
        parameters:formattedString,
        station_id:stationId,
        employee_id:employeeId
    }
    try {
        const {data,status} = await axios.put("http://localhost:8080/api/Stationyyyyupdate",newValues)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function loginUser(values){
    try{
        const {data:loginData,status:loginStatus} = await axios.post("http://localhost:8080/api/login",values)
        console.log({loginData:loginData});
        const {token} = loginData
        localStorage.setItem("token",token)
        if(loginStatus===201 && loginData.userName==="admin")
        {
            console.log("ADMIN");
            return Promise.resolve(loginData)
        }
        else if(loginStatus===201 && loginData.userName!=="admin")
        {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Adding 1 because months are zero-based
            const day = String(currentDate.getDate()).padStart(2, "0");
            const formattedDate = `${year}-${month}-${day}`;
            console.log(formattedDate);
            const {data:workerStationData,status} = await axios.get("http://localhost:8080/api/getOneWorkerStation",{params:{employeeId:loginData.employeeId,date:formattedDate,shift:values.shift}})
            console.log({workerStationData:workerStationData});
            const finalData = {
                ...loginData,
                ...workerStationData
            }
            console.log({finalData:finalData});
            return Promise.resolve(finalData)
        }
    }catch(error){
        return Promise.reject(error.response.data)
    }
}

export async function verifyLogin(){
    const token = localStorage.getItem("token")
    console.log(token);
    try {
        const {status} = await axios.get("http://localhost:8080/api/verifyLogin",{headers:{"Authorization":`Bearer ${token}`}})
        return Promise.resolve(status)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function logout(){
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000";
}