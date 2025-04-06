import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import { fetchRideHistory } from "../services/driver/driver.services";

const DriverRideHistory = () => {
  const { driver } = useSelector((state) => state.driver);
  const [rides, setRides] = useState([]);
  const [loader, setLoader] = useState(true);

  // fetch all ride history on page load
  useEffect(() => {
    async function getAllRides() {
      try {
        if (driver._id) {
          const response = await fetchRideHistory(driver._id);

          setRides(response);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      } finally {
        setLoader(false);
      }
    }

    getAllRides();
  }, [driver]);

  return (
    <div className=" w-80 md:w-[90%] mx-auto p-1 md:p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Ride History
      </h2>
      <div className="border-t border-gray-300 py-4 max-h-[500px] overflow-auto scrollbar-hidden">
        {loader ? (
          <div className="text-center ">
            <Spinner aria-label="Center-aligned spinner example" size="xl" />
          </div>
        ) : rides.length > 0 ? (
          <div>
            {rides.map((ride, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-3"
              >
                <div className="w-[75%]">
                  <p className="text-lg font-semibold">Ride ID: {ride._id}</p>
                  <p className="text-sm text-gray-600">
                    User: {ride.user?.name}
                  </p>
                  <p className="text-sm text-gray-600">Pickup: {ride.pickup}</p>
                  <p className="text-sm text-gray-600">
                    Drop-off: {ride.destination}
                  </p>
                </div>
                <div className="text-right w-[20%]">
                  <p className="text-green-600 font-bold text-lg">
                    ₹{ride.fare}
                  </p>
                  <p className="text-xs text-gray-500 overflow-hidden overflow overflow-x-auto text-nowrap ">
                    Date: {ride.date?.split("T")[0] || Date.now()}
                  </p>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default DriverRideHistory;
