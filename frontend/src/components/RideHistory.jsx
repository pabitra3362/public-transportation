/* eslint-disable-next-line no-unused-vars */
import React from "react";
import Logo from "../assets/Logo.jpg"; // Import the logo image

function RideHistory() {
  const rides = [
    {
      id: "RID12345",
      driverName: "John Doe",
      pickup: "123 Main St, City A",
      drop: "456 Oak Rd, City B",
      fare: "$12",
      date: "2025-03-15",
    },
    {
      id: "RID12346",
      driverName: "Jane Smith",
      pickup: "789 Pine Ave, City C",
      drop: "101 Maple Dr, City D",
      fare: "$8",
      date: "2025-03-14",
    },
  ];

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl mx-auto mt-8 w-full sm:w-[90%] md:w-[80%] lg:w-[70%] h-auto sm:h-auto md:h-[95%]">
      {/* Logo image */}
      <div className="text-center mb-4 sm:mb-6">
        <img src={Logo} alt="Logo" className="mx-auto h-32 sm:h-40 rounded-full" />
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6 text-gray-800">
        Ride History
      </h2>

      {/* Ride History List */}
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
                  Ride ID: {ride.id}
                </span>
                <span className="text-green-600 font-bold text-base sm:text-lg">
                  {ride.fare}
                </span>
              </div>

              {/* Driver, Pickup, and Destination */}
              <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                <span>Driver: {ride.driverName}</span>
                <span>
                  {ride.pickup} to {ride.drop}
                </span>
              </div>

              {/* Date */}
              <div className="text-xs sm:text-sm text-gray-500 mt-2">
                <span className="font-semibold">Date: </span>
                {ride.date}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RideHistory;
