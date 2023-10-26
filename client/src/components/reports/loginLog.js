import { useFormik} from "formik";
import * as Yup from "yup";
import { getLoginLogInfo } from "../../helper/helper";
import { useState } from "react";
import Table from "../table";
import { Alert } from 'react-bootstrap';
import toast, { Toaster } from 'react-hot-toast';

function LoginLog() {
    
    const [loginLogInfo,setLoginLogInfo] = useState([])
    
    const columns = [
        {field:'station_name', label:'Station Name'},
        {field:'login_date_time', label:'Login date and time'},
        {field:'logout_date_time', label:'Logout date and time'},
    ]

    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("Required")
    })

    const formik = useFormik({
        initialValues: {
            userName: ""
        },
        validationSchema: validationSchema,
        onSubmit:(values)=>{
            const getLoginLogInfoPromice = getLoginLogInfo(values)
                toast.promise(getLoginLogInfoPromice,{
                    loading: "Fetching data",
                    error: (err) => { return err.msg},
                    success: (result) => {
                        const newResult = result.map((log)=>{
                            return {
                             ...log,
                             station_name: log.station_name===null ? "null" : log.station_name,
                             logout_date_time: log.logout_date_time===null ? "null" : log.logout_date_time 
                         } 
                         })
                        setLoginLogInfo(newResult)
                        return "Fetched data successfully"
                    }
                })
        }
    })

    console.log({loginLogInfo:loginLogInfo});
    return (
        <div>
             {/* <WindalsNav/> */}
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <input
                type="text"
                value={formik.values.userName}
                placeholder="Enter username"
                onChange={formik.handleChange}
                name="userName"
            />
            { formik.errors.userName && formik.touched.userName ? (
                                <Alert variant="danger" className="error-message">{formik.errors.userName}</Alert>) : null}
            <button type="button" onClick={formik.handleSubmit}>Submit</button>
            <p>{formik.userName}</p>

            {loginLogInfo.length>0 && <Table columns={columns} data={loginLogInfo}/>}
            
        </div>
    )
}

export default LoginLog