/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import Logo from "../assets/Logo.jpg"; // Import the logo image
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import { fetchRideHistory } from "../services/user/user.services";

function RideHistory() {
  const { user } = useSelector((state) => state.user);
  const [rides, setRides] = useState([]);
  const [loader, setLoader] = useState(true);

  // fetch all ride history on page load
  useEffect(() => {
    async function getAllRides() {
      try {
        if (user._id) {
          const response = await fetchRideHistory(user._id);

          setRides(response);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      } finally {
        setLoader(false);
      }
    }

    getAllRides();
  }, [user]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl mx-auto mt-8 w-full sm:w-[90%] md:w-[75%] lg:w-[75%] h-auto sm:h-auto md:h-[80%]">
      <ToastContainer autoClose={3000} draggable={true} />

      {/* Logo image */}
      <div className="text-center mb-4 sm:mb-6">
        <img
          src={Logo}
          alt="Logo"
          className="mx-auto h-32 sm:h-40 rounded-full"
        />
      </div>

      <h2 className="text-xl sm:text-2xl  font-semibold text-center mb-5 sm:mb-6 text-gray-800">
        Ride History
      </h2>

      {/* Ride History List */}
      {loader ? (
        <div className="text-center ">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      ) : rides.length > 0 ? (
        <div className="overflow-auto max-h-[80vh] hide-scrollbar">
          <ul className="space-y-4 sm:space-y-6">
            {rides.map((ride, index) => (
              <li
                key={index}
                className="p-4 sm:p-6 bg-gray-50 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="space-y-3">
                  {/* Ride ID and Fare */}
                  <div className="flex justify-between items-center text-gray-800">
                    <span className="font-semibold text-base sm:text-xl">
                      Ride ID: {ride._id}
                    </span>
                    <span className="text-green-600 font-bold text-base sm:text-lg">
                      ₹{ride.fare}
                    </span>
                  </div>

                  {/* Driver, Pickup, and Destination */}
                  <div className="flex justify-between w-[100%] sm:flex sm:w-[100%] text-xs sm:text-sm text-gray-600">
                    <span className="w-[20%] sm:w-[40%]">
                      Driver: {ride.captain?.name}
                    </span>
                    <span className="w-[80%] sm:w-[60%]">
                      {ride.pickup} to {ride.destination}
                    </span>
                  </div>

                  {/* Date */}
                  <div className="text-xs sm:text-sm text-gray-500 mt-2">
                    <span className="font-semibold">Date: </span>
                    {ride.date?.split("T")[0] || Date.now()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
}

export default RideHistory;
