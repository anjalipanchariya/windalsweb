import db from "../Database/connection.js";

async function insertInLoginLog(req,res){
    const {userName,stationName} = req.body
    try{
        const employeeIdSelectQuery = "SELECT employee_id FROM employee_master WHERE user_name = ?"
        const employeeIdSelectResult = await db.promise().query(employeeIdSelectQuery,[userName])
        if(employeeIdSelectResult.length==0){
            res.status(501).send({msg:"There was an error in finding the employee"})
            return
        }
        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        // console.log('Current DateTime (SQL DATETIME format):', currentDateTime);
        // console.log(employeeIdSelectResult[0][0])
        console.log(userName);
        const insertQuery = userName === "admin" ? "INSERT INTO login_log (employee_id,date_time) VALUES (?,?)" : "INSERT INTO login_log VALUES (?,?,?)" 
        const insertResult = userName === "admin" ? await db.promise().query(insertQuery,[employeeIdSelectResult[0][0].employee_id,currentDateTime]) : await db.promise().query(insertQuery,[employeeIdSelectResult[0][0].employee_id,currentDateTime,stationName]) 
        res.end()
    }catch(err){
        console.error(`Database error: ${err}`);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }
}

export {insertInLoginLog}