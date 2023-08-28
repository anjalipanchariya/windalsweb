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
        return Promise.reject(error.resolve.data)
    }
}

export async function addStation(values){
    try {
        const {data,status} = axios.post("http://localhost:8080/api/StationMasterInsert",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.resolve.data)
    }
}

export async function getStations(){
    try {
        const {data,status} = axios.get("http://localhost:8080/api/StationMasterGet")
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.resolve.data)
    }
}

export async function getOneStation(StationName){
    try {
        const {data,status} = axios.get("http://localhost:8080/api/StationMasterGetOneStation",{params:{StationName}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.resolve.data)
    }
}

export async function getOneStationOneProduct(stationName,productName){
    try {
        const {data,status} = axios.get("http://localhost:8080/api/StationMasterGetOneStationOneProduct",{params:{stationName,productName}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.resolve.data)
    }
}

export async function deleteStation(stationId){
    try {
        const {data,status} = axios.delete("http://localhost:8080/api/StationMasterDelete",{params:{stationId}})
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.resolve.data)
    }
}

export async function updateStation(values){
    try {
        const {data,status} = axios.put("http://localhost:8080/api/StationMasterUpdate",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.resolve.data)
    }
}