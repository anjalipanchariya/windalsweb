import db from "../Database/connection.js";

async function insertIntoStationAllocation(req,res){
    const {date,shift,stationAllocations} = req.body
    try {
        const selectQuery = "SELECT employee_id FROM station_allocation WHERE date = ? AND shift = ?"
        const [selectResult] = await db.promise().query(selectQuery,[date,shift])
        if(selectResult.length>0){
            res.status(501).send({msg:`Workers already allocated to stations for shift:${shift} on date:${date}`})
        }
        else{
            const insertQuery = "INSERT INTO station_allocation (date,shift,station_name,employee_id) VALUES (?, ?, ?, (SELECT employee_id FROM employee_master WHERE first_name = ? and last_name=?))"
            for(const stationAllocation of stationAllocations)
            {
                const {station,workers} = stationAllocation
                for(const worker of workers){
                    const {first_name , last_name}=worker;
                    const [insertResult] = await db.promise().query(insertQuery,[date,shift,station,first_name , last_name])
                }
                
            }
            res.status(201).send({msg:"Stations allocated to workers successfully."})
        }
    } catch (error) {
        console.error(`Database error: ${error}`);
        res.status(500).send({ msg: `Internal server error: ${error}` });
    }
} 

export {insertIntoStationAllocation}