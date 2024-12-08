import React, { useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "./Button";
import { MyDrawer } from "./Drawer";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="nav w-full bg-white h-16 md:h-20 lg:h-24 flex items-center">
      <div className="w-full md:w-[90vw] lg:w-[80vw] px-3 mx-auto flex justify-between items-center">
        <div className="left flex justify-center items-center">
          <div className="font-bold text-lg text-black uppercase">logo</div>
        </div>

        <div className="middle hidden lg:block">
          <ul className="flex justify-center items-center gap-3">
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
        <div className="right hidden lg:flex justify-center items-center gap-3">
          <div className="flex justify-center items-center gap-1 text-lg font-bold">
            <div className="text-yellow-400">+91 123</div>
            <div className="text-black">4567890</div>
          </div>
          <div>
            <Button
              onClick={() => navigate("/gettaxi")}
              className="px-4 py-2 border-black rounded-sm"
            >
              Book A Ride
            </Button>
          </div>
        </div>
        <div className="lg:hidden">
          <MyDrawer />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
