import React, {useState}from "react";
import './addProduct.css'

function ProductAdd(){

    
    const [prodadd, setProdadd] = useState({
        prodname:"",
        paramname:"",
        min:0,
        max:0,
        unit:""
    }
    )
    const [records, setRecords] = useState([]);
    const handleChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;
        // console.log(name, value)
        setProdadd({...prodadd, [name]:value})
    }

    const handleSubmit = (e) =>{
         e.preventDefault();
         const newproduct = {...prodadd, id: new Date().getTime().toString()}
        //  console.log(records)
         setRecords([...records,newproduct])
         setProdadd({prodname:"", paramname:"", min:0, max:0, unit:""})
         
    }
    return(
        <>
        <form className="productadd" onSubmit={handleSubmit}>
                <label><input type="text" placeholder="Product Name" name="prodname" id="prodname" onChange={handleChange} value={setProdadd.prodname}/></label>
                <label><input type="text" placeholder="Parameter" name="paramname" id="paramname" onChange={handleChange} value={setProdadd.paramname}/></label>
                <label><input type="number" placeholder="Minimum" name="min" id="min" onChange={handleChange} value={setProdadd.min}/></label>
                <label><input type="number" placeholder="Maximum" name="max" id="max" onChange={handleChange} value={setProdadd.max}/></label>
                <label><input type="text" placeholder="Unit" name="unit" id="unit" onChange={handleChange} value={setProdadd.unit}/></label>
                <button type="submit" className="subbtn">Add Product</button>
        </form>
        
        
        <div className="table">
        <table>
        <tr>
            <th>Product Name</th>
            <th>Parameter</th>
            <th>Min</th>
            <th>Max</th>
            <th>Unit</th>
        </tr>
        <tr>
            {
                records.map((curElem)=>{
                    return(
                        <>
                            <th>{curElem.prodname}</th>
                            <th>{curElem.paramname}</th>
                            <th>{curElem.min}</th>
                            <th>{curElem.max}</th>
                            <th>{curElem.unit}</th>
                        </>
                    )
                })
            }
        </tr>
        
    </table>
        </div>
        
        </>
    )

}

export default ProductAdd;