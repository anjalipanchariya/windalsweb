import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../helper/helper';
import toast, { Toaster } from 'react-hot-toast';
import Table from '../table';

function ViewUser() { // Changed the function name to start with an uppercase letter

  const [users, setUsers] = useState([]);

  const columns = [
    { field: 'employee_id', label: 'Employee ID' },
    { field: 'first_name', label: 'First Name' },
    { field: 'last_name', label: 'Last Name' },
    { field: 'designation', label: 'Designation' },
    { field: 'joining_date', label: 'Joining Date' },
    { field: 'leaving_date', label: 'Leaving Date' },
    { field: 'mobile_no', label: 'Mobile Number' },
    { field: 'nick_name', label: 'Nick Name' },
    { field: 'password', label: 'Password' },
    { field: 'user_name', label: 'User Name' },
  ];
  
  useEffect(() => {
    // Fetch stations data
    const fetchData = async () => {
      try {
        const result = await getAllUsers();
        const modifiedUsers = result.map((user) => {
          if(user.mobile_no == null)
          {
            user.mobile_no = "Not entered"
          }
          if(user.leaving_date == null)
          {
            user.leaving_date = "N.A."
          }
          return user;
        });
        setUsers(modifiedUsers);
        toast.success(<b>Data fetched successfully</b>);
      } catch (error) {
        toast.error(error.message || 'An error occurred');
      }
    };

    // Call the fetchData function
    fetchData();
  }, []); // Empty dependency array to run only once


  return (
    <>
      <Toaster position="top-center" reverseOrder={false}></Toaster>
      <Table columns={columns} data={users} />
    </>
  );
}

export default ViewUser;