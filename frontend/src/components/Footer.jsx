/* eslint-disable no-unused-vars */
import React from "react";
import { CiFacebook } from "react-icons/ci";
import { CiInstagram } from "react-icons/ci";
import { ImPinterest2 } from "react-icons/im";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-slate-900">
      <div className=" text-white w-full md:w-[80vw] lg:w-[70vw] mx-auto py-12 px-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-items-start lg:justify-items-center md:px-8 items-start gap-12">
        {/* logo */}
        <div className="logo grid justify-items-start items-center gap-7">
          <div className="logo text-3xl">Safar</div>
          <div className="social-links flex justify-start items-center gap-5">
            <a href="#">
              <CiFacebook className="size-9 hover:text-yellow-300 transition duration-200" />
            </a>
            <a href="#">
              <CiInstagram className="size-9 hover:text-yellow-300 transition duration-200" />
            </a>
            <a href="#">
              <ImPinterest2 className="size-8 hover:text-yellow-300 transition duration-200" />
            </a>
          </div>
          <div className="copyright">
            Copyright @ {new Date().getFullYear()} Developed by{" "}
            <span className="text-yellow-300">3DEVS</span>
          </div>
        </div>

        {/* explore */}
        <div className="explore grid justify-items-start items-center gap-4">
          <h3 className="font-bold text-white text-2xl font-mono">Explore</h3>
          <div className="grid justify-items-start items-center gap-2">
            <Link
              to="#"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Company
            </Link>
            <Link
              to="#"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Android App
            </Link>
            <Link
              to="/"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Safar
            </Link>
            <Link
              to="/news"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Our News
            </Link>
            <Link
              to="/taxi"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Get Taxi
            </Link>
          </div>
        </div>

        {/* Usefull Links */}
        <div className="explore grid justify-items-start items-center gap-4">
          <h3 className="font-bold text-white text-2xl font-mono">
            Usefull links
          </h3>
          <div className="grid justify-items-start items-center gap-2">
            <Link
              to="/about"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              About Us
            </Link>
            <Link
              to="#"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Reviews
            </Link>
            <Link
              to="/service"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Service
            </Link>
            <Link
              to="/taxi"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Hire Taxi In Your City
            </Link>
            <Link
              to="/contact"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Contacts
            </Link>
          </div>
        </div>

        {/* Help */}
        <div className="explore grid justify-items-start items-center gap-4">
          <h3 className="font-bold text-white text-2xl font-mono">Help?</h3>
          <div className="grid justify-items-start items-center gap-2">
            <Link
              to="#"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              FAQ
            </Link>
            <Link
              to="#"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Privacy
            </Link>
            <Link
              to="#"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Terms & Conditions
            </Link>
            <Link
              to="#"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Feedback
            </Link>
            <Link
              to="#"
              className="hover:text-yellow-300 transition duration-200 text text-lg"
            >
              Reporting
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
