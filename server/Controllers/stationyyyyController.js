import db from "../Database/connection.js";

async function insertInStationyyyyFirst(req,res){
    const {product_name, station_id, job_name,  employee_id} = req.body;
    
    try {
        const searchQuery = "SELECT job_id FROM productyyyy WHERE job_name=? AND product_name=?"
        const [selectResult] = await db.promise().query(searchQuery,[job_name,product_name])
        const job_id=selectResult[0]["job_id"];
        

        const insertQuery = "INSERT INTO station_yyyy (product_name, station_id, job_id, employee_id,status,intime) VALUES (?, ?, ?,?,1,NOW())";
        const [insertResult] = await db.promise().query(insertQuery, [product_name, station_id, job_id,employee_id]);
            
        res.status(201).send({ msg: "Record inserted successfully"});
        
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }

}

async function insertInStationyyyyFirstNextStation(req,res){
    const {product_name, station_id, job_name} = req.body;
    
    try {
        const searchQueryJob = "SELECT job_id FROM productyyyy WHERE job_name=? AND product_name=? "
        const [selectResultJob] = await db.promise().query(searchQueryJob,[job_name,product_name])
        const job_id=selectResultJob[0]["job_id"];
        console.log(job_id)

        const selectNextStationNameQuery = "SELECT next_station_name FROM station_master WHERE station_id=? AND product_name=?"
        const [selectNextStationNameResult] = await db.promise().query(selectNextStationNameQuery,[station_id,product_name])

        console.log(selectNextStationNameResult);
        
        if(selectNextStationNameResult[0].next_station_name===null)
        {
            return res.status(201).send({msg: "This is final station."})
        }

        const searchQueryNextStation = "SELECT station_id FROM station_master WHERE station_name=(select next_station_name from station_master where station_id=? and product_name=?) AND product_name=? "
        const [selectResultNextStation] = await db.promise().query(searchQueryNextStation,[station_id,product_name,product_name])
        const next_station_id=selectResultNextStation[0]["station_id"];
        console.log(next_station_id)

        const insertQuery = "INSERT INTO station_yyyy (product_name, station_id, job_id,intime) VALUES (?, ?, ?,NOW())";
        const [insertResult] = await db.promise().query(insertQuery, [product_name, next_station_id, job_id]);
            
        res.status(201).send({ msg: "Record inserted successfully"});
        
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }

}

async function updateInStationyyyy(req,res){
    const {product_name, station_id, job_name,employee_id,status,parameters} = req.body;
    console.log(req.body);
    try {
        const searchQueryJob = "SELECT job_id FROM productyyyy WHERE job_name=? and product_name=?"
        const [selectResultJob] = await db.promise().query(searchQueryJob,[job_name,product_name])
        const job_id=selectResultJob[0]["job_id"];
        console.log(job_id)


        // const searchQueryNextStation = "SELECT station_id FROM station_master WHERE station_name=(select next_station_name from station_master where station_id=?) "
        // const [selectResultNextStation] = await db.promise().query(searchQueryNextStation,[station_id])
        // const next_station_id=selectResultNextStation[0]["station_id"];
        // console.log(next_station_id)

        const searchQintime="select intime from station_yyyy where station_id=? and product_name=? and job_id=?;"
        const [selectRintime] = await db.promise().query(searchQintime,[station_id,product_name,job_id])
        const intime=selectRintime[0]["intime"];
        console.log(intime)


        const updateQuery = "UPDATE station_yyyy SET employee_id = ?, status = ?, parameters = ? WHERE (intime = ?) and (station_id = ?) and (product_name = ?) and (job_id = ?);";
        const [updateResult] = await db.promise().query(updateQuery, [employee_id,status,parameters,intime,station_id,product_name, job_id]);
            
        res.status(201).send({ msg: "Record updated successfully"});
        
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }
}

async function jobsAtStation(req,res){
    const {station_id} = req.body;
    console.log(station_id);
    try {
        const searchQueryJob = "SELECT job_id, job_name, product_name FROM productyyyy as py  where py.job_id in (select job_id from station_yyyy where `status` is null and `station_id`=?);"
        const [selectResultJob] = await db.promise().query(searchQueryJob,[station_id])
        console.log(selectResultJob);
            
        res.status(201).send(selectResultJob);
        
    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }

}

async function countOfWorkAtStation(req,res){
    const {station_id} = req.body;

    try {

        const searchQueryDone = "select count(*) as ok from station_yyyy where status=1 and station_id=?;"
        const [selectResultDone] = await db.promise().query(searchQueryDone,[station_id])
        const done=selectResultDone[0]['ok'];

        const searchQueryNotDone = "select count(*) as notok from station_yyyy where status=0 and station_id=?;"
        const [selectResultNotDone] = await db.promise().query(searchQueryNotDone,[station_id])
        const notdone=selectResultNotDone[0]['notok'];

        const searchQueryRework = "select count(*) as rework from station_yyyy where status=2 and station_id=?;"
        const [selectResultRework] = await db.promise().query(searchQueryRework,[station_id])
        const rework=selectResultRework[0]['rework'];


        res.status(201).send({ok:done,notok:notdone, rework:rework});

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }

}

async function getJobesSubmitedAtStation(req,res){
    const {stationId} = req.body;

    try {
        // const date='2023-09-05'; //date format YYYY-MM-DD
        const searchQueryWork = "select newt2.product_name,job_name,status,first_name,last_name,intime from (select newt.product_name, employee_id,job_name, status,intime from (select * from station_yyyy where employee_id is not null and status is not null and station_id = ?) as newt left join productyyyy on newt.job_id=productyyyy.job_id) as newt2 left join employee_master on newt2.employee_id=employee_master.employee_id where intime between ? AND ?;"
        const [selectResultWork] = await db.promise().query(searchQueryWork,[stationId])

        res.status(201).send(selectResultWork);

    } catch (err) {
        console.error("Database error:", err);
        res.status(500).send({ msg: `Internal server error: ${err}` });
    }

}

async function workAtStationInDay(req, res) {
    const { stationId, date } = req.query;
  
    try {
      const start = date + ' 00:00:00';
      const end = date + ' 23:59:59';
      const searchQuery =
        "SELECT newt.product_name, newt.status, newt.parameters, newt.intime, newt.out_time, newt.job_id, job_name FROM (SELECT * FROM station_yyyy WHERE employee_id IS NOT NULL AND status IS NOT NULL AND station_id = ?) as newt LEFT JOIN productyyyy ON newt.job_id=productyyyy.job_id WHERE intime BETWEEN ? AND ?;";
      const [selectResult] = await db.promise().query(searchQuery, [stationId, start, end]);
  
      // Loop through the selectResult array
      const formattedResults = selectResult.map((entry) => {
        const { parameters } = entry;
        const parameterArray = parameters ? parameters.split(';').map((part) => part.trim()) : [];
        let reason = '';
        let parameterString = '';
  
        // Join the parameterArray elements with '-'
        if (parameterArray.length > 0) {
          parameterString = parameterArray.join('-');
        }
  
        // Check if the last element in parameterArray contains a comma
        if (parameterArray.length > 0) {
          const lastPart = parameterArray.pop();
          if (lastPart !== '') {
            const lastPartParts = lastPart.split(',');
            if (lastPartParts.length === 2) {
              reason = lastPartParts[1];
            } else {
              parameterArray.push(lastPart); // Add the last part back to the array
            }
          }
        }
  
        return { ...entry, parameters: parameterString, reason };
      });
  
      console.log(formattedResults);
      res.status(201).send(formattedResults);
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).send({ msg: `Internal server error: ${err}` });
    }
  }
  
  
  
  
  
  
  

export {insertInStationyyyyFirst, insertInStationyyyyFirstNextStation,updateInStationyyyy, jobsAtStation,countOfWorkAtStation,workAtStationInDay,getJobesSubmitedAtStation};