/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.jpg";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false); // State to toggle content
  const navigate = useNavigate(); // To handle navigation
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Handle submitted email data
    setIsSuccess(true); // On success, update state
  };

  const navigateToLogin = () => {
    navigate("/login"); // Navigate to the login page
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={navigateToLogin}
          className="absolute top-0 right-0 text-[15px] w-[40px] h-[40px] rounded-full hover:text-yellow-300 hover:bg-black text-xl"
        >
          ✕
        </button>

        {!isSuccess ? (
          <div>
            {/* Logo Section */}
            <div className="flex justify-center mb-4">
              <img
                src={Logo}
                alt="Safar Logo"
                className="h-28 w-auto sm:h-32 lg:h-36"
              />
            </div>

            {/* Heading Section */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              Forgot Your Password?
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6 text-center font-medium">
              Enter your email address and we will send you instructions to
              reset your password.
            </p>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Enter your email:
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  className={`w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-yellow-300 focus:border-yellow-300 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                      message: "Please enter a valid Email",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-300 text-black font-bold py-2 px-4 rounded-md hover:bg-black duration-500 md:hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
              >
                Continue
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
              <div className="flex justify-center">
              <img
                src={Logo}
                alt="Safar Logo"
                className="h-28 w-auto sm:h-32 lg:h-36"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold black mb-4">
               Check Your Email
            </h2>
            <p className="text-sm sm:text-base text-gray-700">
              Instructions to reset your password have been sent to your email.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
