import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './addProduct.css';
import toast, { Toaster } from 'react-hot-toast';
import { addProduct } from '../helper/helper';

function AddProduct() {
  const [parameters, setParameters] = useState([]);
  const [productName, setProductName] = useState('');

  const addRow = () => {
    const newParameter = { name: '', min: '', max: '', unit: '' };
    setParameters([...parameters, newParameter]);
  };

  const handleParameterChange = (index, field, value) => {
    const updatedParameters = [...parameters];
    updatedParameters[index][field] = value;
    setParameters(updatedParameters);
  };

  const handleSave = () => {
    // You can now send the productName and parameters array to the backend for saving.
    const addProductProsie = addProduct(productName,parameters)
    addProductProsie.then((result)=>{
      toast.success(result.msg)
      setParameters([])
      setProductName([])
    }).catch((err)=>{
      toast.error(err.msg)
    })
  };

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <div className="productadd">
        <h3>Product name:</h3>
        <input
          type="text"
          value={productName}
          placeholder="Enter Product Name"
          onChange={(e) => setProductName(e.target.value)}
        />
        <Button onClick={addRow}>Add parameter</Button>
        <Button onClick={handleSave}>Save</Button>
      </div>

      <Table striped responsive hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Max</th>
            <th>Min</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {parameters.map((parameter, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={parameter.name}
                  onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={parameter.max}
                  onChange={(e) => handleParameterChange(index, 'max', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={parameter.min}
                  onChange={(e) => handleParameterChange(index, 'min', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={parameter.unit}
                  onChange={(e) => handleParameterChange(index, 'unit', e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default AddProduct;