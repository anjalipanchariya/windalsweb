import React from 'react';
import ResponsiveTable from "./ResponsiveTable";

function worker() {
    const columns = ['Name', 'Age', 'Email'];
    const data = [
      { Name: 'John Doe', Age: 30, Email: 'john@example.com' },
      { Name: 'Jane Smith', Age: 28, Email: 'jane@example.com' },
      // Add more data as needed
    ]; 

  return (
    <div>
      <ResponsiveTable data={data} columns={columns} />
    </div>
  )
}

export default worker
