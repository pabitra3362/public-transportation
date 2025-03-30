/* eslint-disable no-irregular-whitespace */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import DefaultProfilePic from "../assets/DefaultProfilePic.jpeg"; // Import the default profile picture
import { RiCloseLargeLine } from "react-icons/ri";
import { logoutUser } from "../services/auth/userAuth.service";
import { removeUser } from "../features/auth/userAuthSlice";
import { useDispatch } from "react-redux";
import { getUserToken } from "../utils/token";
import { toast, ToastContainer } from 'react-toastify';

const Sidebar = ({ onSidebarItemClick }) => {
  const { user } = useSelector((state) => state.user);
  const userToken = getUserToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      const result = await logoutUser({ token:userToken });
      dispatch(removeUser());
      localStorage.removeItem('userToken');
      onSidebarItemClick();
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.error || error.message)
    }

  }
  

  return (
    <div className="w-64 bg-gray-800 relative text-white  md:h-[100vw] md:min-h-screen  min-h-screen pt-0">
      <ToastContainer autoClose={3000} draggable={true} />
      <button
        className="absolute -top-4 right-4 md:hidden lg:hidden"
        onClick={onSidebarItemClick}
      >
        <RiCloseLargeLine className="text-lg" />
      </button>
      <ul className="space-y-4">
        <li className="text-xl mb-10">
          <img
            className="rounded-full h-36 w-36 mx-auto border-2 border-yellow-300 object-cover"
            src={user?.file || DefaultProfilePic}
            alt={DefaultProfilePic}
          />
        </li>

        <li className="text-xl">
          <Link
            to="/user/dashboard/profile"
            onClick={onSidebarItemClick} // Close sidebar when clicked
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Profile
          </Link>
        </li>
        <li className="text-xl">
          <Link
            to="/user/dashboard/payment"
            onClick={onSidebarItemClick} // Close sidebar when clicked
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Payment
          </Link>
        </li>
        <li className="text-xl">
          <Link
            to="/user/dashboard/ride-history"
            onClick={onSidebarItemClick} // Close sidebar when clicked
            className="block py-2 px-4 hover:bg-gray-700 transition"
          >
            Ride History
          </Link>
        </li>
        <li className="text-xl">
          <Link
            to="/user/dashboard/ride-tracking"
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
          onClick={handleLogout} // Close sidebar when clicked
          className="w-full py-2 text-left pl-4 text-white hover:bg-gray-700 transition duration-300"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
