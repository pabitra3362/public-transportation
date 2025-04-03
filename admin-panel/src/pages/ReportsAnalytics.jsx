import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { revenueSevice } from '../services/admin.service';
import { FaRupeeSign } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import { Spinner } from 'flowbite-react';

const ReportsAnalytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await revenueSevice();
        setData([
          { name: 'Total Rides', value: response.totalRides },
          { name: 'Total Revenue', value: response.totalRevenue.toFixed(2) },
          { name: 'Active Drivers', value: response.activeDrivers },
        ]);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>
      {loading ? (
        <div className="flex justify-center">
          <Spinner size="xl" />
        </div>
      ) : data.length > 0 ? (
        <>
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Metric</th>
                <th className="border px-4 py-2">Value</th>
              </tr>
            </thead>
            <tbody>
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
                <td className="border px-4 py-2">{data[2]?.value || 0}</td>
              </tr>
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
        </>
      ) : (
        <video
          className="w-full h-96"
          src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-14042396-11352619.mp4"
          autoPlay
          loop
          muted
        ></video>
      )}
    </div>
  );
};

export default ReportsAnalytics;
