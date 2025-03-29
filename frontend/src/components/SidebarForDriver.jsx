/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";

const SidebarForDriver = ({ onSidebarItemClick }) => {
  return (
    <div className="py-6 min-h-screen md:h-full">
      <ul className="flex flex-col gap-5">
        <li>
          <Link
            to="/driver/dashboard/profile"
            className="text-white block py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/driver/dashboard/earnings"
            className="text-white block py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
            Earnings
          </Link>
        </li>
        <li>
          <Link
            to="/driver/dashboard/active-trip"
            className="text-white block py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
            Active Trip
          </Link>
        </li>
        <li>
          <Link
            to="/driver/dashboard/ride-request"
            className="text-white block py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
            Ride Request
          </Link>
        </li>
        {/* Logout button inside the UL */}
        <li>
          <button
            onClick={onSidebarItemClick}
            className="w-full py-2 px-4 text-white font-semibold hover:bg-gray-700 text-left text-xl"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarForDriver;
