import React, { useEffect, useState } from "react";
import { earningAndPayments } from "../services/admin.service";
import { toast, ToastContainer } from 'react-toastify';
import { FaRupeeSign } from 'react-icons/fa';
import { Spinner } from "flowbite-react";

const EarningsPayments = () => {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPaymentDetails() {
      try {
        const response = await earningAndPayments();
        setPaymentDetails(response);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    }

    getPaymentDetails();
  }, []);

  return (
    <div className="p-4">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Earnings & Payments</h1>
      
      {loading ? (
        <div className="text-center">
          <Spinner aria-label="Loading spinner" size="xl" />
        </div>
      ) : paymentDetails.length > 0 ? (
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

export default EarningsPayments;
