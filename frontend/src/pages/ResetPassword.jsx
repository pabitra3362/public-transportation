import React, { useState } from "react";
import { useParams, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.jpg";
import { setNewPassword } from "../services/password/setNewPassword.service";
import { toast, ToastContainer } from 'react-toastify';
import { replace } from "lodash";

const ResetPassword = () => {
  const [isPwdOpen, setIsPwdOpen] = useState(true);
  const [isCnfOpen, setIsCnfOpen] = useState(true);
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search);
  const id = queryParam.get("id");
  const { role } = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (data) => {

    try {
      
      const msg = await setNewPassword({ id, role, password })
      toast.success(msg,{
        onClose: ()=>{
          window.location.href = role === 'user' ? '/user-login' : '/driver-login';
        }
      })

      
    } catch (error) {
      toast.error(error.message)
    } finally {
      reset() // reset form values after submit
    }
    
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <ToastContainer theme="dark" />
      <div className="resetPassword w-full max-w-md bg-white p-6 rounded-lg shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={() => navigate("/user-login")}
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

        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-y-4"
        >
          {/* password */}
          <div className="password">
            <div className="relative flex items-center">
              <input
                type={isPwdOpen ? "password" : "text"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be less than 12 characters"
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
                className="w-full border border-black focus:border-none focus:ring-2 focus:ring-yellow-300 placeholder:focus:text-yellow-300 rounded-md duration-200 pr-10 px-3 py-2"
                placeholder="New password"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <img
                  src={
                    isPwdOpen
                      ? "https://www.svgrepo.com/show/108619/eye-close-up.svg"
                      : "https://www.svgrepo.com/show/391829/eye-close.svg"
                  }
                  className="size-6 duration-200"
                  onClick={() => setIsPwdOpen((prev) => !prev)}
                  alt="Toggle Password Visibility"
                />
              </span>
            </div>

            {/* Error Message */}
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="cnfPassword">
            <div className="relative flex items-center">
              <input
                type={isCnfOpen ? "password" : "text"}
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="w-full border border-black focus:border-none focus:ring-2 focus:ring-yellow-300 placeholder:focus:text-yellow-300 rounded-md duration-200 pr-10 px-3 py-2"
                placeholder="Re-enter new password"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
                <img
                  src={
                    isCnfOpen
                      ? "https://www.svgrepo.com/show/108619/eye-close-up.svg"
                      : "https://www.svgrepo.com/show/391829/eye-close.svg"
                  }
                  className="size-6 duration-200"
                  onClick={() => setIsCnfOpen((prev) => !prev)}
                  alt="Toggle Password Visibility"
                />
              </span>
            </div>

            {/* Error Message */}
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 bg-yellow-300 text-black font-semibold rounded-md hover:bg-black
      hover:text-white duration-500"
          >
            {isSubmitting ? (
              <Spinner aria-label="Default status example" color="white" />
            ) : (
              "Reset password"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
