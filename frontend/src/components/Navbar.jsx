/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink } from "react-router-dom";
import { MyDrawer } from "./Drawer";
import Logo from "../assets/Logo.jpg";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();

  return (
    <nav className="nav w-full bg-white h-16 md:h-20 lg:h-24 flex items-center">
      {/* Container */}
      <div className="w-full md:w-[90vw] lg:w-[70vw] px-3 mx-auto flex justify-between items-center">
        {/* Left Section */}
        <div className="left flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="logo-image h-16 w-20 md:h-16 md:w-20 lg:h-24 lg:w-28 rounded-full object-cover"
          />
        </div>

        {/* Middle Section */}
        <div className="middle hidden lg:block">
          <ul className="flex justify-center items-center gap-6">
            {["Home", "About", "Service", "Team", "News", "Contact"].map((item) => (
              <li key={item}>
                <NavLink
                  to={`/${item.toLowerCase()}`}
                  className={({ isActive }) =>
                    `font-bold text-black hover:text-yellow-400 transition duration-200 text-lg ${
                      isActive ? "border-b-2 border-yellow-400 text-yellow-400" : ""
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
        <div className="right hidden lg:flex items-center gap-3">
          <div className="flex items-center gap-1 text-lg font-bold">
            <div className="text-yellow-400">+91 123</div>
            <div className="text-black">4567890</div>
          </div>
          <button
            onClick={isAuthenticated ? logout : loginWithRedirect}
            className="border border-black border-opacity-60 px-3 py-2 rounded-lg font-bold hover:bg-yellow-400 hover:text-white hover:border-opacity-0 duration-200"
          >
            {isAuthenticated ? "Logout" : "Login / Sign Up"}
          </button>
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
