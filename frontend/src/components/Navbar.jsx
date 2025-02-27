/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyDrawer } from "./Drawer";
import Logo from "../assets/Logo.jpg";
import {toast, ToastContainer} from 'react-toastify';
import { logoutUser } from "../services/auth/userAuth.service";
import { logoutDriver } from "../services/auth/driverAuth.service";
import { removeUser } from '../features/auth/userAuthSlice'
import { removeDriver } from '../features/auth/driverAuthSlice'
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/token";


const Navbar = () => {

  const navigate = useNavigate();
  const token = getToken(); //get token from local storage
  if(token.length > 0 ){
    var {role} = jwtDecode(token) //decode token to get user role
  }
  

  const handleLogout = async () => {
    try {
      if(role == 'user'){

        const result = await logoutUser({token})
        if(result){
          localStorage.removeItem('token') // remove token from localstorage 
          removeUser(); // remove user info from store
          navigate('/');
        }
        
      }
      else {
        const result = await logoutDriver({token})

        if(result){
          localStorage.removeItem('token') // remove token from localstorage
          removeDriver(); // remove driver info from store
          navigate('/drive');
        }

      }

    } catch (error) {
      console.error(error.message)
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
                onClick={()=>window.scrollTo(0,0)}
                className={({ isActive }) =>
                  `font-bold text text-black hover:text-white transition duration-500 text-lg ${
                    isActive ? "border-b-2 border-white text-white" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            {["Drive","About", "Service", "Team", "News", "Contact"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  onClick={()=>window.scrollTo(0,0)}
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

          {token.length == 0 ? (
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
