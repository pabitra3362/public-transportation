import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { revenueSevice } from '../services/admin.service';
import { FaRupeeSign } from 'react-icons/fa';


const ReportsAnalytics = () => {

  const [data, setData] = useState([]);

  useEffect(()=>{
   async function fetchData() {
    
    try {
      
      const response = await revenueSevice();      
      setData([
        { name: 'Total Rides', value: response.totalRides },
        { name: 'Total Revenue', value: response.totalRevenue },
        { name: 'Active Drivers', value: response.activeDrivers },
      ])

    } catch (error) {
      toast.error(error.message)
    }
   }

   fetchData();
  },[])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Metric</th>
            <th className="border px-4 py-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {/* Example report data */}
          <tr>
            <td className="border px-4 py-2">Total Rides</td>
            <td className="border px-4 py-2">{data[0]?.value}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total Revenue</td>
            <td className="border px-4 py-2 flex items-center gap-1"><FaRupeeSign />{data[1]?.value}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Active Drivers</td>
            <td className="border px-4 py-2">{data[2]?.activeDrivers || 0}</td>
          </tr>
          {/* Add more report rows as needed */}
        </tbody>
      </table>
      <h2 className="text-xl font-bold mt-4">Details Chart</h2>
      <BarChart width={500} height={500} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ReportsAnalytics;