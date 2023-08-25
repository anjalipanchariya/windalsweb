import React from "react";
import axios from axios;

export async function addProduct(values){
    try {
        const {data,status} = await axios.post("http://localhost:8080/api/ProductMasterInsert",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export async function updateProducts(values){
    try {
        const {data,status} = await axios.put("http://localhost:8080/api/ProductMasterUpdate",values)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}

export async function deleteProduct(values){
    const {productId} = values
    try{
        const {data,status} = await axios.delete("http://localhost:8080/api/ProductMasterDelete",{params:{productId:productId}})
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

export async function getOneProductAllParameters(values){
    const {productName} = values
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