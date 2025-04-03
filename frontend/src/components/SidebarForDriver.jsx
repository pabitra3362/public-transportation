/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import DefaultProfilePic from "../assets/DefaultProfilePic.jpeg";
import { logoutDriver } from "../services/auth/driverAuth.service";
import { getDriverToken } from "../utils/token";
import { useDispatch } from "react-redux";
import { removeDriver } from "../features/auth/driverAuthSlice";
import { toast, ToastContainer } from "react-toastify";
import { VscAccount } from "react-icons/vsc";
import { FaRupeeSign } from "react-icons/fa";
import { FaCarTunnel } from "react-icons/fa6";
import { LuMapPinPlus } from "react-icons/lu";
import { TbMapPinCheck } from "react-icons/tb";
import { BiLogOutCircle } from "react-icons/bi";

const SidebarForDriver = ({ onSidebarItemClick }) => {
  const { driver } = useSelector((state) => state.driver);
  const driverToken = getDriverToken();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await logoutDriver({ token: driverToken });
      dispatch(removeDriver());
      localStorage.removeItem("driverToken");
      onSidebarItemClick();
      navigate("/drive");
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="py-6 relative min-h-screen md:h-full">
      <ToastContainer autoClose={3000} draggable={true} />
      <button
        className="absolute -top-4 right-4 lg:hidden hover:bg-slate-600 p-2 rounded-full"
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
            className="text-white flex items-center gap-2  py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
        <VscAccount className="text-2xl" />    Profile
          </Link>
        </li>
        <li>
          <Link
            to="/driver/dashboard/earnings"
            className="text-white flex items-center gap-2 py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
         <FaRupeeSign  className="text-2xl"/>   Earnings
          </Link>
        </li>
        <li>
          <Link
            to="/driver/dashboard/active-trip"
            className="text-white flex items-center gap-2 py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
          <FaCarTunnel className="text-2xl"/>  Active Trip
          </Link>
        </li>
        <li>
          <Link
            to="/driver/dashboard/ride-request"
            className="text-white flex items-center gap-2 py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
           <LuMapPinPlus className="text-2xl" /> Ride Request
          </Link>
        </li>

        <li>
          <Link
            to="/driver/dashboard/driver-ride-history"
            className="text-white flex items-center gap-2 py-2 px-4 font-semibold hover:bg-gray-700 text-xl"
            onClick={onSidebarItemClick}
          >
          <TbMapPinCheck className="text-2xl" />  Ride History
          </Link>
        </li>

        {/* Logout button inside the UL */}
        <li>
          <button
            onClick={handleLogout}
            className="w-full py-2 flex items-center gap-2 px-4 text-white font-semibold hover:bg-gray-700 text-left text-xl"
          >
         <BiLogOutCircle />   Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default SidebarForDriver;
