import db from "../Database/connection.js";

async function insertIntoStationAllocation(req,res){
    const {date,shift,stationAllocations} = req.body
    console.log(stationAllocations);
    try {
        const selectQuery = "SELECT employee_id FROM station_allocation WHERE date = ? AND shift = ?"
        const [selectResult] = await db.promise().query(selectQuery,[date,shift])
        if(selectResult.length>0){
            res.status(501).send({msg:`Workers already allocated to stations for shift:${shift} on date:${date}`})
        }
        else{
            const insertQuery = "INSERT INTO station_allocation (date,shift,station_name,employee_id) VALUES (?, ?, ?, ?)"
            for(const stationAllocation of stationAllocations)
            {
                const {station,workers} = stationAllocation
                for(const workerID of workers){
                    const [insertResult] = await db.promise().query(insertQuery,[date,shift,station,workerID])
                }
            }
            res.status(201).send({msg:"Stations allocated to workers successfully."})
        }
    } catch (error) {
        console.error(`Database error: ${error}`);
        res.status(500).send({ msg: `Internal server error: ${error}` });
    }
} 

async function getOneWorkerStation(req,res){
    const {employeeId,date,shift} = req.query
    try {
        const selectQuery = "SELECT station_name FROM station_allocation WHERE employee_id=? AND date=? AND shift=?"
        const [selectResult] = await db.promise().query(selectQuery,[employeeId,date,shift])
        console.log({query:req.query,result:selectResult});
        if(selectResult.length<=0)
        {
            res.status(501).send({msg:"No station has been allocated to you."})
        }
        else
        {
            res.status(201).send({stationName:selectResult[0].station_name})
        }
    } catch (error) {
        console.error(`Database error: ${error}`);
        res.status(500).send({ msg: `Internal server error: ${error}` });
    }
}

export {insertIntoStationAllocation,getOneWorkerStation}