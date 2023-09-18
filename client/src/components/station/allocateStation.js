import React, { useEffect, useState } from "react";
import { Table, Button, Form } from 'react-bootstrap';
import { useFormik } from "formik";
import toast, { Toaster } from 'react-hot-toast';
import Multiselect from "multiselect-react-dropdown";
import { getAllStationNames, getAllWorkerNames, addStationAllocation } from "../../helper/helper";
import WindalsNav from "../navbar";

function StationAllocation() {
    const today = new Date();

    const [workers, setWorkers] = useState([]);
    const [workersCompleteName, setWorkersCompleteName] = useState({});
    const [stations, setStations] = useState([]);
    const [allocationStation, setAllocationStation] = useState([]);
    const [availableWorkerNames, setAvailableWorkerNames] = useState([]);
    const [selectedWorkers, setSelectedWorkers] = useState([]); // Maintain a list of selected workers

    useEffect(() => {
        fetchStationsAndWorkers();
    }, []);

    const fetchStationsAndWorkers = async () => {
        try {
            const stationNames = await getAllStationNames();
            setStations(stationNames);

            const workerNames = await getAllWorkerNames();
            setWorkers(workerNames);

            const tempObj = {};

            for (const w of workerNames) {
                const { first_name, last_name, employee_id, user_name } = w;
                tempObj[first_name + " " + last_name + " " + user_name] = { employee_id, name: first_name + " " + last_name + " " + user_name };
            }

            setWorkersCompleteName(tempObj);

            // Initialize allocationStation based on stations
            const initialAllocationStation = stationNames.map((station) => ({
                station: station.station_name,
                workers: [],
            }));
            setAllocationStation(initialAllocationStation);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    const formik = useFormik({
        initialValues: {
            date: today.toISOString().substring(0, 10),
            shift: '',
            stationAllocations: allocationStation,
        },
        onSubmit: (values) => {
            // Ensure that all stations have at least one worker
            const isValid = values.stationAllocations.every(
                (allocation) => allocation.workers.length > 0
            );

            if (!isValid) {
                toast.error("All stations must have at least one worker.");
            } else {
                // Map selected names to employee_ids when submitting the form
                const stationAllocationsWithEmployeeIds = values.stationAllocations.map((allocation) => ({
                    station: allocation.station,
                    workers: allocation.workers.map((selectedName) => workersCompleteName[selectedName].employee_id),
                }));

                console.log({
                    date: values.date,
                    shift: values.shift,
                    stationAllocations: stationAllocationsWithEmployeeIds
                });
                 const addStationAllocationPromise = addStationAllocation({
                    date: values.date,
                    shift: values.shift,
                    stationAllocations: stationAllocationsWithEmployeeIds,
                });

                toast.promise(addStationAllocationPromise, {
                    loading: "Saving data",
                    success: (result) => {
                        formik.resetForm()
                        fetchStationsAndWorkers()
                        formik.setFieldValue("stationAllocations",allocationStation)
                        return result.msg
                    },
                    error: (err) => err.msg,
                });
            }
        },
        enableReinitialize: true,
    });

    useEffect(() => {
        filterAvailableWorkerNames();
    }, [formik.values.stationAllocations]);

    function handleSelect(selectedList, selectedItem, stationIndex) {
        console.log({ selectedItem: selectedItem, selectedList: selectedList });
        // Update the selected names for a specific station
        const updatedAllocation = [...formik.values.stationAllocations];
        updatedAllocation[stationIndex].workers = selectedList;
        formik.setFieldValue("stationAllocations", updatedAllocation);
        filterAvailableWorkerNames();
    }

    const filterAvailableWorkerNames = () => {
        // Combine the selected workers from all stations
        const allSelectedWorkers = formik.values.stationAllocations.flatMap((allocation) => allocation.workers);
        // Filter out workers that are already selected
        const filteredAvailableWorkerNames = workers.filter((worker) => {
            const workerName = `${worker.first_name} ${worker.last_name} ${worker.user_name}`;
            return !allSelectedWorkers.includes(workerName);
        });
        setAvailableWorkerNames(filteredAvailableWorkerNames);
    }

    console.log({ availableWorkerNames: availableWorkerNames });
    return (
        <div>
            <Toaster position="top-center" reverseOrder={false}></Toaster>
            <WindalsNav/>
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

                    <Button variant="danger" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>

            <div className="table-container">
                <Table striped responsive hover className="table">
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
                                    <Multiselect
                                        isObject={false}
                                        options={availableWorkerNames.map(
                                            (worker) => `${worker.first_name} ${worker.last_name} ${worker.user_name}`
                                        )}
                                        onSelect={(selectedList, selectedItem) =>
                                            handleSelect(selectedList, selectedItem, index)
                                        }
                                        selectedValues={allocation.workers}
                                        showCheckbox
                                    />
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
