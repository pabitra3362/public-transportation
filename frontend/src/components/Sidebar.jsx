/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation

const Sidebar = ({ onSidebarItemClick }) => {
  return (
    <div className="w-64 bg-gray-800 text-white sm:min-h-screen  min-h-screen pt-10">
      <ul className="space-y-4">
        <li className="text-xl">
          <Link
            to="/dashboard/profile"
            onClick={onSidebarItemClick} // Close sidebar when clicked
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Profile
          </Link>
        </li>
        <li className="text-xl">
          <Link
            to="/dashboard/payment"
            onClick={onSidebarItemClick} // Close sidebar when clicked
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Payment
          </Link>
        </li>
        <li className="text-xl">
          <Link
            to="/dashboard/ride-history"
            onClick={onSidebarItemClick} // Close sidebar when clicked
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Ride History
          </Link>
        </li>
        <li className="text-xl">
          <Link
            to="/dashboard/ride-tracking"
            onClick={onSidebarItemClick} // Close sidebar when clicked
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Ride Tracking
          </Link>
        </li>
      </ul>

      {/* Logout Button */}
      <div className="text-xl mt-4">
        <button
          onClick={onSidebarItemClick} // Close sidebar when clicked
          className="w-full py-2 text-left pl-4 text-white hover:bg-gray-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
