import React, { useEffect, useState } from "react";
import { earningAndPayments } from "../services/admin.service";
import { toast, ToastContainer } from 'react-toastify';
import { FaRupeeSign } from 'react-icons/fa'

const EarningsPayments = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);

  useEffect(() => {
    async function getPaymentDetails() {
      try {
        const response = await earningAndPayments();

        setPaymentDetails(response);
      } catch (error) {
        toast.error(error.message);
      }
    }

    getPaymentDetails();
  }, []);


  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Earnings & Payments</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Driver</th>
            <th className="border px-4 py-2">Total Earnings</th>
            <th className="border px-4 py-2">Commission</th>
            <th className="border px-4 py-2">Net Earnings</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails?.map((driver, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{driver.name}</td>
              <td className="border px-4 py-2"><span className="flex items-center gap-1"><FaRupeeSign />{driver.totalFare}</span></td>
              <td className="border px-4 py-2"><span className="flex items-center gap-1"><FaRupeeSign />{driver.commission.toFixed(2)}</span></td>
              <td className="border px-4 py-2"><span className="flex items-center gap-1"><FaRupeeSign />{driver.netFare}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EarningsPayments;
