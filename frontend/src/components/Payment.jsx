/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.jpg"; // Import the logo image
import { toast, ToastContainer } from "react-toastify";
import { fetchPaymentHistory } from "../services/user/user.services";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

function PaymentHistory() {
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loader, setLoader] = useState(true);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    async function getPaymentDetails() {
      if (user._id) {
        try {
          const response = await fetchPaymentHistory(user._id);
          setPaymentHistory(response);
          setLoader(false);
        } catch (error) {
          toast.error(error.response?.data?.error || error.message);
        }
      }
    }

    getPaymentDetails();
  }, [user]);

  return (
    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl mx-auto mt-4 w-full sm:w-[50%] md:w-[80%] lg:w-[70%] h-auto sm:h-auto md:h-[60%]">
      <ToastContainer autoClose={3000} draggable={true} />
      <div className="text-center mb-4">
        <img
          src={Logo}
          alt="Logo"
          className="mx-auto h-24 sm:h-32 rounded-full"
        />
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
        Payment History
      </h2>

      {loader ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      ) : paymentHistory.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-fixed border-collapse text-xs sm:text-sm">
            <thead className="bg-yellow-300">
              <tr>
                <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black w-[20%]">
                  Payment ID
                </th>
                <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black w-[20%]">
                  Pickup Point
                </th>
                <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black w-[20%]">
                  Drop Point
                </th>
                <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black w-[12%]">
                  Fare
                </th>
                <th className="px-2 sm:px-4 py-2 border-b text-left font-semibold text-black w-[15%]">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, index) => (
                <tr
                  key={payment._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-gray-200 transition duration-300`}
                >
                  <td className="px-2 sm:px-4 py-2 border-b w-[20%] break-words">
                    {payment.paymentId}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b w-[20%]">
                    {payment.ride?.pickup}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b w-[20%]">
                    {payment.ride?.destination}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b w-[12%]">
                    ₹{payment.amount}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border-b w-[15%]">
                    {payment.paymentDate.split("T")[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <video
            className="w-full h-96"
            src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-14042396-11352619.mp4"
            autoPlay
            loop
            muted
          ></video>
        </div>
      )}
    </div>
  );
}

export default PaymentHistory;
