// import { useFormik} from "formik";
// import * as Yup from "yup";

// function LoginLog() {
//     const table = [
//         {
//             username: "User1",
//             stationName: "Station 1",
//             logindate_time: "2023-10-12 12:54",
//           },
//           {
//             username: "User2",
//             stationName: "Station 2",
//             logindate_time: "2023-10-12 13:05",
//           },
//           // Add more data as needed
//     ]

//     const exportToCSV = () => {

//         let csv = '';
//         const arr = ["Username", "Station name", "login date_time"]

//         console.log(arr);

//         csv += arr.join(',') + '\n';
//         for (let i = 0; i < table.length; i++) {
//             const row = table[i];
//             // const values = columnKeys.map(key => row[key]);
//             const values = Object.values(row);
//             csv += values.join(',') + '\n';
//         }

//         const blob = new Blob([csv], { type: 'text/csv' });
//         const url = window.URL.createObjectURL(blob);

//         const a = document.createElement('a');
//         a.href = url;
//         a.download = 'table_table.csv';
//         a.style.display = 'none';
//         document.body.appendChild(a);
//         a.click();

//         window.URL.revokeObjectURL(url);
//         document.body.removeChild(a);
//     };

//     const formik = useFormik({
//         initialValues: {
//             jobName: ""
//         },
//         validationSchema: validationSchema,
//     })

//     return (
//         <div>
//             <input
//                 className=""
//                 type="text"
//                 value={formik.values.jobName}
//                 placeholder="Enter Job Name"
//                 name="Job Name"
//             />
//             <button>Submit</button>
//             <p>{productName}</p>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Sr. No.</th>
//                         <th>Username</th>
//                         <th>Station name</th>
//                         <th>login date_time</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {
//                         table.map((key, index) => {
//                             return (
//                                 <tr key={index}>
//                                     <td>{index + 1}</td>
//                                     <td>{key.username}</td>
//                                     <td>{key.stationName}</td>
//                                     <td>{key.logindate_time}</td>
//                                 </tr>
//                             )
//                         })
//                     }
//                 </tbody>
//             </table>
//             <button onClick={exportToCSV}>Export</button>
//         </div>
//     )
// }

// export default LoginLog