import db from "../Database/connection.js";

async function insertInProductMaster(req,res){
    const { productName, parameter, minVal, maxVal, unit } = req.body;

    try {
        const query = "INSERT INTO product_master (product_name, parameters, min, max, unit) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.promise().query(query, [productName, parameter, minVal, maxVal, unit]);

        res.status(201).send({ msg: "Record inserted successfully", insertedId: result.insertId });
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }

}

 async function getInfoFromProductMaster(req,res){
    try{
        var query = "SELECT product_name,parameters,min,max,unit FROM product_master"
        const [result] = await db.promise().query(query)
        
        res.status(201).send(result)
    }catch(err){
        console.error("Database error:", err);
        res.status(500).send({msg:`Internal server error: ${err}`})
    }
}

 async function deleteFromProductMaster(req,res){
    const {productName} = req.query
    try{
        var selectQuery = "SELECT id FROM product_master WHERE product_name = ?"
        const [selectResult] = await db.promise().query(selectQuery,[productName])

        if(selectResult.length === 0){
            res.status(404).send({msg:"Product does not exist in database"})
        }

        const deletedRow = selectResult[0]
        
        var deleteQuery = "DELETE FROM product_master WHERE product_name = ?"
        const [result] = await db.promise().query(deleteQuery,[productName])
        
        console.log({"Rows deleted":result.affectedRows,"Row deleted":deletedRow});
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

export { insertInProductMaster, getInfoFromProductMaster, deleteFromProductMaster, updateProductMaster };
