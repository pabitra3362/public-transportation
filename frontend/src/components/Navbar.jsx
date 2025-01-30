/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyDrawer } from "./Drawer";
import Logo from "../assets/Logo.jpg";
import { getToken } from "../utils/token";
import {toast, ToastContainer} from 'react-toastify';
import { logoutUser } from "../services/auth/userAuth.service";
import { useSelector } from "react-redux";

const Navbar = () => {

  const navigate = useNavigate();
  const token = getToken();
  const {user} = useSelector(state=>state.user)

  const handleLogout = async () => {
    try {
      const result = await logoutUser({token,role:user.role})
      if(result){
        localStorage.removeItem('token')
      }

      navigate('/')
    } catch (error) {
      toast.error(error.message)
    }
  }
  

  return (
    <nav className="nav w-full bg-yellow-300 h-16 md:h-20 lg:h-24 flex items-center sticky top-0 z-40">
      <ToastContainer theme="dark" />
      {/* Container */}
      <div className="w-full md:w-[90vw] lg:w-[70vw] px-3 mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="left flex items-center">
          <a href="/">
            <img
              src={Logo}
              alt="Logo"
              className="logo-image h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 rounded-full object-cover"
            />
          </a>
        </div>

        {/* Middle Section */}
        <div className="middle hidden lg:block">
          <ul className="flex justify-center items-center gap-6">
            <li>
              <NavLink
                to={`/`}
                className={({ isActive }) =>
                  `font-bold text text-black hover:text-white transition duration-500 text-lg ${
                    isActive ? "border-b-2 border-white text-white" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            {["About", "Service", "Team", "News", "Contact"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `font-bold text text-black hover:text-white transition duration-500 text-lg ${
                      isActive ? "border-b-2 border-white text-white" : ""
                    }`
                  }
                >
                  {item}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section */}
        <div className="right flex items-center gap-3">
          {/* Contact Information */}
          <div className="hidden lg:flex items-center gap-1 text-lg font-bold">
            <div className="text-custom-white">+91 123</div>
            <div className="text-black">4567890</div>
          </div>

          {!token ? (
            <button
              onClick={() => navigate("/user-signup")}
              className="border border-black border-opacity-60 px-3 py-2 rounded-lg font-bold hover:bg-black hover:text-white duration-200 hidden lg:block"
            >
              Sign-Up
            </button>
          ) : (
            <button
              onClick={handleLogout}
              className="border border-black border-opacity-60 px-3 py-2 rounded-lg font-bold hover:bg-black hover:text-white duration-200 hidden lg:block"
            >
              Logout
            </button>
          )}

        </div>

        {/* Drawer for Mobile */}
        <div className="lg:hidden">
          <MyDrawer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
