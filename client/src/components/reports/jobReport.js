import { useFormik} from "formik";
import * as Yup from "yup";
import Table from "../table.js"
import toast, { Toaster } from 'react-hot-toast';
import WindalsNav from "../navbar";
import { useEffect, useState } from "react";
import { getJobReport } from "../../helper/helper.js";
import './jobReport.css'
import Footer from '../footer';
import { Alert } from 'react-bootstrap';


function JobReport() {
    const [jobReports,setJobReports] = useState([])
    const [productName,setProductName] = useState("") 
    const columns = [
        {field:'station_name', label:'Station Name'},
        {field:'intime', label:'In Time'},
        {field:'out_time', label:'Out Time'},
        {field:'first_name', label:'First Name'},
        {field:'last_name', label:'Last Name'},
        {field:'status', label:'Status'}
    ]

    const validationSchema = Yup.object().shape({
        jobName: Yup.string().required("Required")
    })

    const formik = useFormik({
        initialValues: {
            jobName: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const getJobReportPromise = getJobReport(values.jobName)
            toast.promise(getJobReportPromise,{
                loading: "Fetching data",
                error: (err) => { return err.msg},
                success: (result) => {
                    result.map((job)=>{
                       return {
                        ...job,
                        status: job.status===1 ? "Ok" : job.status === 0 ? "Rework" : "Not-Ok" 
                    } 
                    })
                    setJobReports(result)
                    console.log(jobReports[0].product_name);
                    // setProductName(jobReports[0].product_name)
                }
            })
        }
    })

    useEffect(()=>{
        setProductName("")
    },[formik.values.jobName])

    // console.log({repors:jobReports});
    return (
        <div>
            <WindalsNav/>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div className="jobreport">
            <input
                className=""
                type="text"
                value={formik.values.jobName}
                placeholder="Enter Job Name"
                onChange={formik.handleChange}
                name="jobName"
            />
            { formik.errors.jobName && formik.touched.jobName ? (
                                <Alert variant="danger" className="error-message">{formik.errors.jobName}</Alert>) : null}

            <br />
            <button type="button" onClick={formik.handleSubmit}>Submit</button>
            <p>{productName!=="" && productName}</p>
            {jobReports.length>0 && <Table columns={columns} data={jobReports}/>}
            </div>
            <br />
            <br />
            <Footer/>
        </div>
    )
}

export default JobReport