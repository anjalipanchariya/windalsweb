import React, { useEffect, useState } from "react";
import { Table, Button, Form } from 'react-bootstrap';
import * as Yup from 'yup';
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import { getAllStationNames, getAllWorkerNames,addStationAllocation } from "../../helper/helper";

function StationAllocation() {
    const today = new Date();

    const [workers, setWorkers] = useState([]);
    const [stations, setStations] = useState([]);
    const [allocationStation, setAllocationStation] = useState([]);

    useEffect(() => {
        const fetchStationsAndWorkers = async () => {
            try {
                const stationNames = await getAllStationNames();
                setStations(stationNames);

                const workerNames = await getAllWorkerNames();
                setWorkers(workerNames);

                // Initialize allocationStation based on stations
                const initialAllocationStation = stationNames.map((station) => ({
                    station: station.station_name,
                    worker: '',
                }));
                setAllocationStation(initialAllocationStation);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchStationsAndWorkers();
    }, []);

    // const validationSchema = Yup.object().shape({
    //     date: Yup.date().required("Required").nullable(),
    //     shift: Yup.string().required("Required"),
    //     stationAllocations: Yup.array()
    //         .of(Yup.object().shape({
    //             station: Yup.string().required("Required"),
    //             worker: Yup.string()
    //                 .test("is-worker-valid", "Worker does not exist", (value) => {
    //                     // Check if the worker name exists in the list of workers
    //                     return workers.some((worker) => worker.first_name === value);
    //                 })
    //                 .test("is-worker-unique", "Worker is already allocated to another station", (value, context) => {
    //                     const { station, index } = context.options.context;
    //                     if (!value) return true; // Worker is not required
    //                     return allocationStation.some((allocation, i) => i !== index && allocation.station === station && allocation.worker === value);
    //                 }),
    //         }))
    //         .required("At least one station worker allocation is required"),
    // });

    const formik = useFormik({
        initialValues: {
            date: today.toISOString().substring(0, 10),
            shift: '',
            stationAllocations: allocationStation,
        },
        // validationSchema: validationSchema,
        onSubmit: (values) => {
            const addStationAllocationPromise = addStationAllocation(values)
            toast.promise(addStationAllocationPromise,{
                loading: "Saving data",
                success: result => result.msg,
                error: err => err.msg
            })
        },
        enableReinitialize: true,
    });

    // useEffect(() => {
    //     // Dynamically update suggestions list based on allocated workers
    //     const allocatedWorkers = new Set();
    //     const updatedWorkers = workers.filter((worker) => {
    //         if (!allocatedWorkers.has(worker.first_name)) {
    //             allocatedWorkers.add(worker.first_name);
    //             return true;
    //         }
    //         return false;
    //     });
    //     setWorkers(updatedWorkers);
    // }, [allocationStation]);

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <div>
                <Form onSubmit={formik.handleSubmit}>
                    <Form.Group controlId="date">
                        <Form.Label>Date:</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            onChange={formik.handleChange}
                            value={formik.values.date}
                        />
                        {formik.touched.date && formik.errors.date && (
                            <div className="error">{formik.errors.date}</div>
                        )}
                    </Form.Group>

                    <Form.Group controlId="shift">
                        <Form.Label>Shift:</Form.Label>
                        <Form.Control
                            type="number"
                            name="shift"
                            onChange={formik.handleChange}
                            value={formik.values.shift}
                        />
                        {formik.touched.shift && formik.errors.shift && (
                            <div className="error">{formik.errors.shift}</div>
                        )}
                    </Form.Group>

                    <Button variant="danger" type="submit">Submit</Button>
                </Form>
            </div>

            <div className="table-container">
                <Table striped responsive hover className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Station</th>
                            <th>Worker</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formik.values.stationAllocations.map((allocation, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{allocation.station}</td>
                                <td>
                                    <Form.Control
                                        type="text"
                                        name={`stationAllocations[${index}].worker`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={allocation.worker}
                                        list={`worker-suggestions-${index}`}
                                    />
                                    {formik.touched.stationAllocations
                                        && formik.errors.stationAllocations
                                        && formik.errors.stationAllocations[index]
                                        && formik.errors.stationAllocations[index].worker && (
                                            <div className="error">
                                                {formik.errors.stationAllocations[index].worker}
                                            </div>
                                        )}
                                    <datalist id={`worker-suggestions-${index}`}>
                                        {workers.map((worker, workerIndex) => (
                                            <option
                                                key={workerIndex}
                                                value={worker.first_name}
                                            />
                                        ))}
                                    </datalist>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default StationAllocation;
