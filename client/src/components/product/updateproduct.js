import React, { useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import './addProduct.css';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addProduct,getAllProducts,updateProducts,deleteProductParameter,getOneProductAllParameters,getOneProductOneParameter } from "../../helper/helper";

function AddProduct() {
    
    const validationSchema = Yup.object().shape({
        productName:Yup.string().required('Product name is required')
    })
    
    const formik = useFormik({
        initialValues: {
            productName : "",
            existingParameters: [],
            newParameters: [],
        },
        validationSchema: validationSchema,
        onSubmit: async (values)=>{
            const updateProductsPromise = updateProducts(values.productName,values.existingParameters)
            toast.promise(
                    updateProductsPromise,
                    {
                        loading: 'Updating data',
                        success: result => {
                            if(values.newParameters.length>0){
                                const addValues = {productName: values.productName,parameters:values.newParameters}
                                const addProductPromise = addProduct(addValues);
                                toast.promise(
                                    addProductPromise,
                                    {
                                        loading: 'Adding New parameters',
                                        success: addResult => {
                                            formik.setFieldValue('newParameters',[])
                                            return addResult.msg
                                        }
                                    }
                                )
                            }
                            formik.resetForm()
                            formik.setFieldValue('existingParameters',[])
                            return result.msg
                        },
                        error: err => { return err.msg}   
                    }
            )
        }
    })

    const addRow = () => {
        formik.setFieldValue('newParameters', [
            ...formik.values.newParameters,
            { parameterName: '', minVal: '', maxVal: '', unit: '' },
          ]);
   };

    const handleExistingParameterChange = (index, field, value) => {
        const updatedParameters = [...formik.values.existingParameters];
        updatedParameters[index][field] = value;
        formik.setFieldValue('existingParameters', updatedParameters);
    };

    const handleNewParameterChange = (index, field, value) => {
        const updatedParameters = [...formik.values.newParameters];
        updatedParameters[index][field] = value;
        formik.setFieldValue('newParameters', updatedParameters);
    };

    const handleSearch = () => {
        const getAllProductParameterPromise = getOneProductAllParameters(formik.values.productName)
        getAllProductParameterPromise.then((result)=>{
            const parameters = result.map((parameter)=>{
                return {
                    id:parameter.id,
                    parameterName: parameter.parameter,
                    maxVal: parameter.max_parameter,
                    minVal: parameter.min_parameter,
                    unit: parameter.unit
                }
            })
            formik.setFieldValue('existingParameters',parameters)
        }).catch((err)=>{
            toast.error(err.msg)
        })
    }

    const handleExistingParametersDeleteRow = (index,productId) => {
        const deleteProductParameterPromise = deleteProductParameter(productId)
        toast.promise(
            deleteProductParameterPromise,
            {
                loading: `Deleting product at index ${index}`,
                success: result => {
                    handleSearch();
                    return result.msg
                },
                error: err => {return err.msg}
            }
        ) 
        // const updatedParameters = [...formik.values.existingParameters];
        // updatedParameters.splice(index, 1);
        // formik.setFieldValue('existingParameters', updatedParameters);
      };

    const handleNewParametersDeleteRow = (index) => {
        const updatedParameters = [...formik.values.newParameters];
        updatedParameters.splice(index, 1);
        formik.setFieldValue('newParameters', updatedParameters);
    };
   
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="productadd">
                <h3>Product name:</h3>
                <input
                    type="text"
                    value={formik.values.productName}
                    placeholder="Enter Product Name"
                    onChange={formik.handleChange}
                    name='productName'
                />
                {formik.touched.productName && formik.errors.productName && (
                <Alert variant="danger" className="paramererName-error-message">
                    {formik.errors.productName}
                </Alert>
                )}

                <div className='buttons'>
                    <Button onClick={handleSearch}>Search</Button>
                    <Button onClick={addRow}>Add parameter</Button>
                    <Button onClick={formik.handleSubmit}>Save</Button>
                </div>
            </div>
            
            Existing paramerer:
            <Table striped responsive hover className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Max</th>
                        <th>Min</th>
                        <th>Unit</th>
                        <th>Press to delete row(paramterer)</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(formik.values.existingParameters) && formik.values.existingParameters.map((parameter, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {parameter.parameterName}
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={parameter.maxVal}
                                    onChange={(e) => handleExistingParameterChange(index, 'maxVal', e.target.value)}
                                    name={`existingParameters[${index}].maxVal`}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={parameter.minVal}
                                    onChange={(e) => handleExistingParameterChange(index, 'minVal', e.target.value)}
                                    name={`existingParameters[${index}].minVal`}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={parameter.unit}
                                    onChange={(e) => handleExistingParameterChange(index, 'unit', e.target.value)}
                                    name={`existingParameters[${index}].unit`}
                                />
                            </td>
                            <td>
                                <button
                                className="delete-button"
                                onClick={() => handleExistingParametersDeleteRow(index,parameter.id)}
                                >
                                <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            New paramerer:
            <Table striped responsive hover className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Max</th>
                        <th>Min</th>
                        <th>Unit</th>
                        <th>Press to delete row</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(formik.values.newParameters) && formik.values.newParameters.map((parameter, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                            <input
                                type="text"
                                value={parameter.parameterName}
                                onChange={(e) =>
                                    handleNewParameterChange(index, 'parameterName', e.target.value)
                                }
                                name={`newParameters[${index}].parameterName`}
                            />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={parameter.maxVal}
                                    onChange={(e) => handleNewParameterChange(index, 'maxVal', e.target.value)}
                                    name={`newParameters[${index}].maxVal`}
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={parameter.minVal}
                                    onChange={(e) => handleNewParameterChange(index, 'minVal', e.target.value)}
                                    name={`newParameters[${index}].minVal`}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={parameter.unit}
                                    onChange={(e) => handleNewParameterChange(index, 'unit', e.target.value)}
                                    name={`newParameters[${index}].unit`}
                                />
                            </td>
                            <td>
                                <button
                                className="delete-button"
                                onClick={() => handleNewParametersDeleteRow(index)}
                                >
                                <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AddProduct;