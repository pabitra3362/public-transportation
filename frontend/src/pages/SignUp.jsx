/* eslint-disable no-unused-vars */
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo.jpg";

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = watch("password");

  const onSubmit = (data) => {
    // Print the form values in the console
    console.log("Form Submitted Data:", data);

    // Show alert when form is submitted
    alert("Form is submitted successfully!");

    // Reset the form fields after submission
    reset();
  };

  const google = () => {
    alert(" First Connect with Google");
  };

  const navigate = useNavigate();

  // Close button click handler to navigate to home
  const handleClose = () => {
    navigate("/"); // Redirect to the home page
  };

  const navigateToLogin = () => {
    navigate("/login"); // 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg relative">
          {/* Close Button */}
          <button
          onClick={handleClose}
          className="absolute top-0 right-0 text-black text-[15px] w-[40px] h-[40px] rounded-full hover:bg-black hover:text-yellow-300  text-xl"
        >
         ✕
        </button>
{/* Safar Logo */}
   <div className="flex justify-center mb-4">
              <img
                src={Logo}
                alt="Safar Logo"
                className="h-28 w-auto sm:h-32 lg:h-36"
              />
            </div>

        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name
            </label>

            {/* Input container with SVG icon */}
            <div className="relative">
              {/* SVG Icon */}
              <svg
                height={35}
                viewBox="0 -9 32 32"
                width={35}
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-1/2 transform -translate-y-[15px]"
              >
                <g id="Layer_3" data-name="Layer 3">
                  <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z" />
                </g>
              </svg>

              {/* Input Field */}
              <input
                type="text"
                id="name"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters",
                  },
                  maxLength: {
                    value: 30,
                    message: "Name must be less than 30 characters",
                  },
                })}
                className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Enter your name"
              />
            </div>

            {/* Error message */}
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Email
            </label>

            {/* Input container with SVG icon */}
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

              {/* Input Field */}
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Enter a valid email",
                  },
                  validate: (value) =>
                    value.endsWith("@gmail.com") ||
                    "Please Enter Valid Email", // Custom validation
                })}
                className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Enter your email"
              />
            </div>

            {/* Error message */}
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Password
            </label>

            {/* Container for Input and SVG */}
            <div className="relative">
              {/* SVG Icon Start */}
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
              {/* SVG Icon Ends */}

              {/* Password Input */}
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  validate: (value) => {
                    if (!/[A-Z]/.test(value))
                      return "Password must contain at least one uppercase letter";
                    if (!/[0-9]/.test(value))
                      return "Password must contain at least one number";
                    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
                      return "Password must contain at least one special character";
                    return true;
                  },
                })}
                className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Enter your password"
              />
            </div>

            {/* Error Message */}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Confirm Password
            </label>

            {/* Container for Input and SVG */}
            <div className="relative">
              {/* SVG Icon Start */}
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
              {/* SVG Icon Ends */}

              {/* Confirm Password Input */}
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full pl-10 pr-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-300"
                placeholder="Confirm your password"
              />
            </div>

            {/* Error Message */}
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <p className="text-center text-sm p-5">
            Already have an account?{" "}
            <span onClick={navigateToLogin} className="text-black font-bold cursor-pointer">Login</span>
            
          </p>

          <button
            type="submit"
            className="w-full py-2 bg-yellow-300 text-black font-semibold rounded-md hover:bg-black
              hover:text-white duration-500"
          >
            Sign Up
          </button>

          <button
            onClick={google}
            className="flex mt-4 duration-500 items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-lg hover:bg-black hover:text-white bg-yellow-300 font-semibold"
          >
            {/* Google Icon */}
            <svg
              version="1.1"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456C103.821,274.792,107.225,292.797,113.47,309.408z"
                fill="#FBBB00"
              />
              <path
                d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z"
                fill="#518EF8"
              />
              <path
                d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z"
                fill="#28B446"
              />
              <path
                d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0C318.115,0,375.068,22.126,419.404,58.936z"
                fill="#F14336"
              />
            </svg>
            Continue With Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
