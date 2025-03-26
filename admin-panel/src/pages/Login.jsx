/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";
import { toast, ToastContainer } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5"; // Import both eye icons
import { Spinner } from "flowbite-react";
import { useDispatch } from 'react-redux';
import { loginAdmin } from '../features/adminAuthSlice';
import {loginAdminService} from '../services/admin.service';

const Login = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();


  useEffect(() => {
    if (token) {
      navigate("/users");
    }
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigateToForgotPassword = (params) => {
    navigate("/forgetPassword");
  };



  const onSubmit = async (data) => {
    try {
      const admin = await loginAdminService({
        email: data.email,
        password: data.password,
      })

      if(admin){
        dispatch(loginAdmin(admin));
        window.location.href= '/users';
      }
      reset();

    } catch (error) {
      toast.error(error.message)
    } 
    
  };

  // Show Hide Passwoed button
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e) => {
    e.preventDefault(); // Prevent form submission or page reload
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <ToastContainer />
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative">
        {/* safar Logo */}
        <div className="flex justify-center mb-4">
          <img
            src={Logo}
            alt="Safar Logo"
            className="h-28 w-auto sm:h-32 lg:h-36"
          />
        </div>

        <h2 className="text-2xl sm:text-xl md:text-2xl lg:text-3xl font-bold text-center mb-6">
          Admin Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm sm:text-base font-semibold text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              {/* SVG Icon */}
              <svg
                height={20}
                width={20}
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-[5px]"
              >
                <g id="Layer_3" data-name="Layer 3">
                  <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
                </g>
              </svg>

              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className={`w-full p-2 pl-10 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                  validate: {
                    gmail: (value) =>
                      value.endsWith("@gmail.com") ||
                      "Please Enter Valid Email",
                  },
                })}
              />
            </div>

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm sm:text-base font-semibold text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              {/* SVG Icon */}
              <svg
                height={20}
                width={20}
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-[7px] text-gray-500"
              >
                <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
                <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
              </svg>

              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                className={`w-full p-2 pl-10 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 7,
                    message: "Password must be exactly 7 characters long",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must not exceed 12 characters",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
                    message:
                      "Password must contain at least one uppercase letter, one number, and one special character",
                  },
                })}
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-[30px] transform -translate-y-1/2"
              >
                {showPassword ? (
                  <IoEyeOffOutline size={24} className=" text-gray-500" />
                ) : (
                  <IoEyeOutline size={24} className=" text-gray-500" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="text-center p-3">
            Forgot Your Password ?
            <span
              onClick={navigateToForgotPassword}
              className="font-semibold mx-2 underline cursor-pointer whitespace-nowrap"
            >
              Click Here
            </span>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-yellow-300 text-black font-semibold rounded-md hover:bg-black hover:text-white transition duration-500"
          >
            {isSubmitting ? <Spinner color="success" /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
