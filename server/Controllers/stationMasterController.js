import db from "../Database/connection.js";

async function insertIntoStationMaster(req,res){
    const {station_name,
        product_name,
        report,
        station_parameters} = req.body
    try {
        const selectQuery = "SELECT station_id FROM station_master WHERE station_name = ? && product_name = ?"
        const [selectResult] = await db.promise().query(selectQuery,[station_name,product_name])
        if(selectResult.length > 0 ){
            res.status(409).send({msg:"Product configuration already exists for this station."})
        }
        else{
            insertQuery = "INSERT INTO station_master (station_name, product_name, report, station_parameters) VALUES (?,?,?,?)"
            const [insertQuery] = await db.promise().query(insertQuery,[station_name,product_name,report,station_parameters])
            res.status(201).send({ msg: "Record inserted successfully", insertedId: insertResult.insertId });
        }
    } catch (error) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }
}

async function deleteFromStationMaster(req,res){
    const {station_id} = req.query
    try{
        const selectQuery = "SELECT station_id FROM station_master WHERE station_name = ? && product_name = ?"
        const [selectResult] = await db.promise().query(selectQuery,[station_name,product_name])
        if(selectResult.length === 0 ){
            res.status(409).send({msg:"Station configuration with this product does not exist."})
        } 
        const deleteQuery = "DELETE FROM station_master WHERE station_id = ?"
        const [deleteResult] = await db.promise().query(selectQuery,[station_id])
        console.log({"Rows deleted":deleteResult.affectedRows,"Row deleted":selectResult});
        res.status(201).send({msg:"Station configuration deleted from data successfully"})
    }catch(error){
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }
}

async function getInfoFromStationMaster(req,res){
    try{
        var query = "SELECT * FROM station_master"
        const [result] = await db.promise().query(query)
        if(result.length===0){
            res.status(200).send({msg:"No infomation about stations exist in database."})
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

export {insertIntoStationMaster,deleteFromStationMaster,getInfoFromStationMaster}