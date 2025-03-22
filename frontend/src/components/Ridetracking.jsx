/* eslint-disable no-unused-vars */
import React from "react";
import Logo from "../assets/Logo.jpg"; // Import the logo image

function RideTracking() {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl mx-auto mt-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto sm:h-auto md:h-[95%]">
      {/* Logo image */}
      <div className="text-center mb-4 sm:mb-6">
        <img src={Logo} alt="Logo" className="mx-auto h-28 sm:h-40 rounded-full" />
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6 text-gray-800">
        Track Your Ride
      </h2>

      <div className="space-y-3 sm:space-y-4">
        <p className="text-base sm:text-lg font-medium text-gray-800">
          Driver&apos;s location:{" "}
          <span className="text-green-500">On the way</span>
        </p>
        <p className="text-base sm:text-lg font-medium text-gray-800">
          ETA: <span className="text-blue-500">10 minutes</span>
        </p>

        {/* Map placeholder */}
        <div className="h-32 sm:h-48 bg-gray-200 rounded-md flex items-center justify-center">
          <p className="text-gray-600">Map here (this is a placeholder)</p>
        </div>
      </div>
    </div>
  );
}

export default RideTracking;
