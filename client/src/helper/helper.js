import React from "react";
import axios from "axios";

export async function addProduct(values){
    try {
        const {data,status} = await axios.post("http://localhost:8080/api/ProductMasterInsert",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export async function updateProducts(productName,existingParameters){
    const values = {ProductName:productName,parameters:existingParameters}
    try {
        const {data,status} = await axios.put("http://localhost:8080/api/ProductMasterUpdate",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export async function deleteProductParameter(productId){
    try{
        const {data,status} = await axios.delete("http://localhost:8080/api/ProductMasterDelete",{params:{productId}})
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
        const {data,status} = await axios.post("http://localhost:8080/api/StationMasterInsert",values)
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
        const {data,status} = await  axios.delete("http://localhost:8080/api/StationMasterDelete",{params:{stationId}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function updateStation(values){
    try {
        const {data,status} = await axios.put("http://localhost:8080/api/StationMasterUpdate",values)
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



export async function registerUser(values){
    try {
        const {data,status} = await axios.post("http://localhost:8080/api/EmployeeMasterInsert",values)
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

export async function addStationAllocation(values){
    try {
        const {data,status} = await axios.post("http://localhost:8080/api/StationAllocationInsert",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data)
    }
}

export async function loginUser(values){
    try{
        const {data,status} = await axios.post("http://localhost:8080/api/login")
        return Promise.resolve(data)
    }catch(error){
        return Promise.reject(error.response.data)
    }
}