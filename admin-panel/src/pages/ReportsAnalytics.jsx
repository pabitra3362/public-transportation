import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Total Rides', value: 1500 },
  { name: 'Total Revenue', value: 20000 },
  { name: 'Active Drivers', value: 75 },
];

const ReportsAnalytics = () => {
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
            <td className="border px-4 py-2">1500</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Total Revenue</td>
            <td className="border px-4 py-2">$20,000</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Active Drivers</td>
            <td className="border px-4 py-2">75</td>
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