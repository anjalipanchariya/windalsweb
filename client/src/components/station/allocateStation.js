import React, { useEffect, useState } from "react";
import { Table, Button } from 'react-bootstrap';
import * as Yup from 'yup'
import { useFormik } from "formik";
import Select from 'react-select';
import { getAllWorkerNames } from "../../helper/helper";
import toast, { Toaster } from 'react-hot-toast';

function StationAllocation() {
    const today = new Date();

    const [workers, setWorkers] = useState([]);

    const stations = [
        { value: "Station 1", label: "Station 1" },
        { value: "Station 2", label: "Station 2" },
        { value: "Station 3", label: "Station 3" },
        { value: "Station 4", label: "Station 4" },
        { value: "Station 5", label: "Station 5" }
    ];

    const validationSchema = Yup.object().shape({
        date: Yup.date().required("Required").nullable(),
        shift: Yup.string().required("Required"),
        stationWorkers: Yup.array()
            .of(Yup.string().required("Required"))
            .min(stations.length, "Assign workers to all stations")
            .required("At least one station worker is required")
    });

    const stationWorkers = stations.map(() => '');

    const formik = useFormik({
        initialValues: {
            date: today.toISOString().substring(0, 10),
            shift: '',
            stationWorkers: stationWorkers
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log(values);
        }
    });

    useEffect(() => {
        const getWorkerNamesPromise = getAllWorkerNames();
        toast.promise(getWorkerNamesPromise, {
            loading: "Getting worker names from the database",
            success: (result) => {
                setWorkers(result);
                return <b>Worker names fetched</b>;
            },
            error: (err) => {
                return err.msg;
            }
        });
    }, []);

    const handleWorkerChange = (worker, stationIndex) => {
        const newStationWorkers = [...formik.values.stationWorkers];
        newStationWorkers[stationIndex] = worker;
        formik.setFieldValue('stationWorkers', newStationWorkers);
    };

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type="date"
                        id='date'
                        name="date"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.date}
                    />
                    {formik.touched.date && formik.errors.date && (
                        <div className="error">{formik.errors.date}</div>
                    )}

                    <select
                        type="text"
                        id='shift'
                        name="shift"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.shift}
                    >
                        <option value="" disabled>Select a Shift</option>
                        <option value="Shift 1">Shift 1</option>
                        <option value="Shift 2">Shift 2</option>
                    </select>
                    {formik.touched.shift && formik.errors.shift && (
                        <div className="error">{formik.errors.shift}</div>
                    )}

                    <Button variant="danger" type="submit">Submit</Button>
                </form>
            </div>

            <Table striped responsive hover className='table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Station</th>
                        <th>Workers</th>
                    </tr>
                </thead>
                <tbody>
                    {stations.map((station, index) => (
                        <tr key={station.value}>
                            <td>{station.label}</td>
                            <td>
                                <Select
                                    name={`stationWorkers[${index}]`}
                                    className="custom-select"
                                    placeholder="Select Workers"
                                    options={workers}
                                    value={workers.find(option => option.value === formik.values.stationWorkers[index])}
                                    onChange={option => handleWorkerChange(option ? option.value : '', index)}
                                    isClearable
                                />
                                {formik.touched.stationWorkers && formik.errors.stationWorkers && formik.errors.stationWorkers[index] && (
                                    <div className="error">{formik.errors.stationWorkers[index]}</div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default StationAllocation;
