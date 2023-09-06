import db from "../Database/connection.js";

async function insertIntoStationAllocation(req,res){
    const {date,shift,stationAllocations} = req.body
    try {
        const insertQuery = "INSERT INTO station_allocation (date,shift,station_name,employee_id) VALUES (?, ?, ?, (SELECT employee_id FROM employee_master WHERE first_name = ?))"
        for(const stationAllocation of stationAllocations)
        {
            const {station,worker} = stationAllocation
            const [insertResult] = await db.promise().query(insertQuery,[date,shift,station,worker])
        }
        res.status(201).send({msg:"Stations allocated to workers successfully."})
    } catch (error) {
        console.error(`Database error: ${error}`);
        res.status(500).send({ msg: `Internal server error: ${error}` });
    }
} 

export {insertIntoStationAllocation}