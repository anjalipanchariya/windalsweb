import db from "../Database/connection.js";

async function insertInProductMaster(req,res){
    const { productName, parameters } = req.body;
    console.log({productName,parameters});
    
    try {
        const searchQuery = "SELECT id FROM product_master WHERE product_name = ?"
        const [searchResult] = await db.promise().query(searchQuery,[productName])
        if(searchResult.length>0)
        {
            res.status(409).send({msg:"Respective product already exist in database."})
        }
        else
        {
            const insertQuery = "INSERT INTO product_master (product_name, parameter, min_parameter, max_parameter, unit) VALUES (?, ?, ?, ?, ?)";
            for(const parameter of parameters)
            {
                const {parameterName,minVal,maxVal,unit} = parameter
                const [insertResult] = await db.promise().query(insertQuery, [productName, parameterName, minVal, maxVal, unit]);
            
            }
            res.status(201).send({ msg: "Record inserted successfully"});
        }
        
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }

}

 async function getInfoFromProductMaster(req,res){
    try{
        var query = "SELECT * FROM product_master"
        const [result] = await db.promise().query(query)
        if(result.length===0){
            res.status(200).send({msg:"No infomation about products exist in database."})
        }
        else{
            console.log(result);
            res.status(201).send(result)
        }
    }catch(err){
        console.error("Database error:", err);
        res.status(500).send({msg:`Internal server error: ${err}`})
    }
}

 async function deleteFromProductMaster(req,res){
    const {productId} = req.query
    try{
        var selectQuery = "SELECT id,product_name,parameter FROM product_master WHERE id = ?"
        const [selectResult] = await db.promise().query(selectQuery,[productId])

        if(selectResult.length === 0){
            res.status(404).send({msg:"Product does not exist in database"})
            return;
        }

        
        var deleteQuery = "DELETE FROM product_master WHERE id = ?"
        const [deleteResult] = await db.promise().query(deleteQuery,[productId])
        
        console.log({"Rows deleted":deleteResult.affectedRows,"Row deleted":selectResult});
        res.status(201).send({msg:"Product data deleted from database successfully"})
    }catch(err){
        console.error("Database error:", err);
        res.status(500).send({msg:`Internal server error: ${err}`})
    }
}

 async function updateProductMaster(req,res){
    const { productId, updatedFields } = req.body;

    try {
        // Construct the SET clause for the update query based on the updatedFields object
        const setClause = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');

        // Prepare the values array for the query
        const values = Object.values(updatedFields);
        values.push(productId); // Add productId as the last value for the WHERE condition

        // Update the product based on productId
        const updateQuery = `UPDATE product_master SET ${setClause} WHERE id = ?`;
        const [updateResult] = await db.promise().query(updateQuery, values);

        if (updateResult.affectedRows === 0) {
            return res.status(404).send({ msg: "Product not found" });
        }

        res.status(200).send({ msg: "Product data updated successfully" });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }
}

async function getOneProductAllParametersInfoFromProductMaster(req,res){
    const {productName} = req.query
    try{
        const selectQuery = "SELECT * FROM product_master WHERE product_name = ?"
        const [selectResult] = await db.promise().query(selectQuery,[productName])
        if(selectResult.length===0){
            return res.status(409).send({msg:"Product does not exist in database"})
        }
        res.status(201).send(selectResult)
    }catch(err){
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }
}

async function getOneProductOneParameterInfoFromProductMaster(req,res){
    const {productName,productParameter} = req.query
    try{
        const selectQuery = "SELECT * FROM product_master WHERE product_name = ? && parameter = ?"
        const [selectResult] = await db.promise().query(selectQuery,[productName,productParameter])
        if(selectResult.length===0){
            return res.status(409).send({msg:"Product does not exist in database"})
        }
        res.status(201).send(selectResult)
    }catch(err){
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }
}

export { insertInProductMaster, getInfoFromProductMaster, deleteFromProductMaster, updateProductMaster, getOneProductAllParametersInfoFromProductMaster, getOneProductOneParameterInfoFromProductMaster };
