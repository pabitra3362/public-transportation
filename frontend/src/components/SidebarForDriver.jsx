/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import DefaultProfilePic from "../assets/DefaultProfilePic.jpeg"; // Import the default profile picture
import { logoutDriver } from "../services/auth/driverAuth.service";
import { getDriverToken } from "../utils/token";
import { useDispatch } from "react-redux";
import { removeDriver } from '../features/auth/driverAuthSlice'
import { toast, ToastContainer } from 'react-toastify';


const SidebarForDriver = ({ onSidebarItemClick }) => {
  const { driver } = useSelector((state) => state.driver);
  const driverToken = getDriverToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
      try {
        const result = await logoutDriver({ token:driverToken });
        dispatch(removeDriver());
        localStorage.removeItem('driverToken');
        onSidebarItemClick();
        navigate('/drive');
      } catch (error) {
        toast.error(error.response?.data?.error || error.message)
      }
  
    }

  return (
    <div className="py-6 relative min-h-screen md:h-full">
      <ToastContainer autoClose={3000} draggable={true} />
      <button
        className="absolute -top-4 right-4 md:hidden lg:hidden hover:bg-slate-600 p-2 rounded-full"
        onClick={onSidebarItemClick}
      >
        <RiCloseLargeLine className="text-lg" />
      </button>
      <ul className="flex flex-col gap-5">
        <li className="text-xl mb-10">
          <img
            className="rounded-full h-36 w-36 mx-auto border-2 border-yellow-300 object-cover"
            src={driver?.userProfile || DefaultProfilePic}
            alt={DefaultProfilePic}
          />
        </li>

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
            onClick={handleLogout}
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