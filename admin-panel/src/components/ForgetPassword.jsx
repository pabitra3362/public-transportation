import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.jpg";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { forgetPassword } from "../services/admin.service";
import {Spinner} from 'flowbite-react'

const ForgetPassword = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [whileSubmitting, setWhileSubmitting] = useState(false)
  const navigate = useNavigate();
  const [timer, setTimer] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isSubmitting },
  } = useForm();

  const email = watch("email");

  // Timer countdown logic inside useEffect
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setInterval(() => {
        setTimer((prev) => (prev > 1 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(countdown); // Cleanup interval when timer reaches 0 or component unmounts
  }, [timer]);

  const onSubmit = async (data) => {
    setWhileSubmitting(true);
    if (timer > 0) return; // Prevent multiple requests while countdown is running

    try {
      const msg = await forgetPassword({ email });

      if (msg) {
        toast.success(msg);
        setIsSuccess(true);
        setWhileSubmitting(false);
        setTimer(30); // Start the 30-second countdown after success
      }
    } catch (error) {
      toast.error(error.message);
      setIsSuccess(false);
    }
  };

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
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
              <img src={Logo} alt="Safar Logo" className="h-28 w-auto sm:h-32 lg:h-36" />
            </div>

            {/* Heading Section */}
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center">
              Forgot Your Password?
            </h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6 text-center font-medium">
              Enter your email address and we will send you instructions to reset your password.
            </p>

            {/* Form Section */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
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
                {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email.message}</p>}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-300 text-black font-bold py-2 px-4 rounded-md hover:bg-black duration-500 md:hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
              >
                {
                  isSubmitting ? (<Spinner color="success" />) : "Continue"
                }
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center">
              <img src={Logo} alt="Safar Logo" className="h-28 w-auto sm:h-32 lg:h-36" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold black mb-4">Check Your Email</h2>
            <p className="text-sm sm:text-base text-gray-700">
              Instructions to reset your password have been sent to your email.
            </p>

            <div className="p-5">
              <button
                type="button"
                onClick={onSubmit}
                disabled={timer > 0 || whileSubmitting}
                className={`w-full font-bold py-2 px-4 rounded-md transition duration-500 focus:outline-none ${
                  timer > 0 || whileSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-yellow-300 hover:bg-black text-black hover:text-white focus:ring-2 focus:ring-yellow-300 focus:ring-offset-2"
                }`}
              >
                {whileSubmitting ? (<Spinner color="success" />) : timer > 0 ? `Resend in ${timer}s` : "Resend Email"  }
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
