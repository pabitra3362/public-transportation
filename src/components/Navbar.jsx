import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MyDrawer } from "./Drawer";
import { useAuth0 } from "@auth0/auth0-react";

const Navbar = () => {

  const { loginWithRedirect, isAuthenticated, logout, user } = useAuth0();

  return (
    <div>
      <nav className="nav w-full bg-white h-16 md:h-20 lg:h-24 flex items-center">
      {/* left */}
      <div className="w-full md:w-[90vw] lg:w-[70vw] px-3 mx-auto flex justify-between items-center">
        <div className="left flex justify-center items-center">
          <div className="font-bold text-lg text-black uppercase">logo</div>
        </div>

        {/* middle */}
        <div className="middle hidden lg:block">
          <ul className="flex justify-center items-center gap-6">
            <li>
              <NavLink
                className={(e) =>
                  `font-bold text-black text hover:text-yellow-400 transition duration-200 text-lg ${
                    e.isActive
                      ? "border-b-2 border-yellow-400 text-yellow-400"
                      : ""
                  }`
                }
                to={"/"}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(e) =>
                  `font-bold text-black text hover:text-yellow-400 transition duration-200 text-lg ${
                    e.isActive
                      ? "border-b-2 border-yellow-400 text-yellow-400"
                      : ""
                  }`
                }
                to={"/about"}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(e) =>
                  `font-bold text-black text hover:text-yellow-400 transition duration-200 text-lg ${
                    e.isActive
                      ? "border-b-2 border-yellow-400 text-yellow-400"
                      : ""
                  }`
                }
                to={"/service"}
              >
                Service
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(e) =>
                  `font-bold text-black text hover:text-yellow-400 transition duration-200 text-lg ${
                    e.isActive
                      ? "border-b-2 border-yellow-400 text-yellow-400"
                      : ""
                  }`
                }
                to={"/team"}
              >
                Team
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(e) =>
                  `font-bold text-black text hover:text-yellow-400 transition duration-200 text-lg ${
                    e.isActive
                      ? "border-b-2 border-yellow-400 text-yellow-400"
                      : ""
                  }`
                }
                to={"/news"}
              >
                News
              </NavLink>
            </li>
            <li>
              <NavLink
                className={(e) =>
                  `font-bold text-black text hover:text-yellow-400 transition duration-200 text-lg ${
                    e.isActive
                      ? "border-b-2 border-yellow-400 text-yellow-400"
                      : ""
                  }`
                }
                to={"/contact"}
              >
                Contacts
              </NavLink>
            </li>
          </ul>
        </div>

        {/* right */}
        <div className="right hidden lg:flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-1 text-lg font-bold">
            <div className="text-yellow-400">+91 123</div>
            <div className="text-black">4567890</div>
          </div>
          <div>
          {
              isAuthenticated ?
                <button 
                onClick={logout}
                className='border border-black border-opacity-60 px-3 py-2 rounded-lg font-bold hover:bg-yellow-400 hover:text-white hover:border-opacity-0 duration-200'>
                  Logout
                </button>
                :
                <button
                  onClick={loginWithRedirect}
                  className='border border-black border-opacity-60 px-3 py-2 rounded-lg font-bold hover:bg-yellow-400 hover:text-white hover:border-opacity-0 duration-200'>Login / Sign Up</button>
            }
          </div>
        </div>
        <div className="lg:hidden">
          <MyDrawer />
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
