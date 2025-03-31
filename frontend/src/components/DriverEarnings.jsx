/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.jpg"; // Ensure the logo path is correct
import { Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { fetchPaymentHistory } from "../services/driver/driver.services";

const DriverEarnings = () => {
  // Sample data for the earnings table
  const [earningsData, setEarningsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const { driver } =  useSelector(state => state.driver);


  useEffect(()=>{
    async function getAllEarnings() {
          try {
            if (driver._id) {
              const response = await fetchPaymentHistory(driver._id);
    
              setEarningsData(response);
            }
          } catch (error) {
            toast.error(error.response?.data?.error || error.message);
          } finally {
            setLoader(false);
          }
        }
    
        getAllEarnings();
  },[driver])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 overflow-auto">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center p-4 pb-20">
        <div className="bg-white p-3 sm:p-4 rounded-lg shadow-2xl mx-auto w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto min-h-[500px]">
          {/* Logo image */}
          <div className="text-center mb-4">
            <img src={Logo} alt="Logo" className="mx-auto h-24 sm:h-32 rounded-full" />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">
            Driver Earnings
          </h2>

          {/* Earnings Table */}
          {loader ? (
            <div className="text-center">
              <Spinner aria-label="Loading spinner" size="xl" />
            </div>
          ) : earningsData.length > 0 ? (
            <div className="overflow-y-auto max-h-[500px] scrollbar-hide">
              <table className="w-full table-auto border-collapse text-xs sm:text-sm">
                <thead className="bg-yellow-300">
                  <tr>
                    <th className="px-2 sm:px-4 py-3 border-b text-left font-semibold text-black">
                      Payment ID
                    </th>
                    <th className="px-2 sm:px-4 py-3 border-b text-left font-semibold text-black">
                      Pickup Point
                    </th>
                    <th className="px-2 sm:px-4 py-3 border-b text-left font-semibold text-black">
                      Drop Point
                    </th>
                    <th className="px-2 sm:px-4 py-3 border-b text-left font-semibold text-black">
                      Fare
                    </th>
                    <th className="px-2 sm:px-4 py-3 border-b text-left font-semibold text-black">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {earningsData.map((earning, index) => (
                    <tr key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition duration-300`}> 
                      <td className="px-2 sm:px-4 py-3 border-b">{earning.paymentId}</td>
                      <td className="px-2 sm:px-4 py-3 border-b">{earning.ride?.pickup}</td>
                      <td className="px-2 sm:px-4 py-3 border-b">{earning.ride?.destination}</td>
                      <td className="px-2 sm:px-4 py-3 border-b">{earning.amount}</td>
                      <td className="px-2 sm:px-4 py-3 border-b">{earning.paymentDate.split("T")[0] || Date.now()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <video className="w-full h-96" src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-14042396-11352619.mp4" autoPlay loop muted></video>
            </div>
          )}
        </div>
      </div>
      
    </div>
  );
};

export default DriverEarnings;