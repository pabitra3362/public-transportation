/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.jpg";
import DefaultProfilePic from "../assets/DefaultProfilePic.jpeg";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";
import { updateProfile } from "../services/driver/driver.services";
import { toast, ToastContainer } from "react-toastify";

const DriverProfile = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [loader, setLoader] = useState(true);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { driver } = useSelector((state) => state.driver);

  const handleProfileClick = () => {
    document.getElementById("profileUpload").click();
  };

  useEffect(() => {
    setValue("fullName", driver.name);
    setValue("email", driver.email);
    setValue("userProfile", driver?.userProfile || DefaultProfilePic);
    setValue("vehicleType", driver?.vehicle?.vehicleType);
    setValue("licensePlate", driver?.vehicle?.plate);
    setValue("phone", driver.phone);

    setLoader(false);
  }, [driver]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setValue("file", file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", driver?._id);
    formData.append("name", data.fullName);
    formData.append("email", data.email);
    formData.append("vehicleType", data.vehicleType);
    formData.append("phone", data.phone);
    formData.append("plate", data.licensePlate);
    formData.append("file", data.file);

    try {
      const response = await updateProfile(formData);

      toast.success(response.message);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  if (loader) {
    <div className="text-center">
      <Spinner aria-label="Center-aligned spinner example" size="xl" />
    </div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-6">
      <ToastContainer theme="dark" autoClose={3000} draggable={true} />
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-md p-8">
        {/* Logo */}
        <div className="mb-4 flex justify-center">
          <img src={Logo} alt="Logo" className="h-40 rounded-full" />
        </div>

        {/* Clickable Profile Picture */}
        <div className="relative flex justify-center mb-6">
          <input
            type="file"
            id="profileUpload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          <div
            className="w-24 h-24 rounded-full border-4 border-yellow-300 overflow-hidden cursor-pointer hover:opacity-80"
            onClick={handleProfileClick}
          >
            <img
              src={profilePic || driver?.userProfile || DefaultProfilePic}
              alt="Driver"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Form Fields */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          encType="multipart/form-data"
          className="space-y-4"
        >
          <div>
            <label className="block text-gray-700 font-semibold">
              Full Name
            </label>
            <input
              type="text"
              {...register("fullName", {
                required: "Full Name is required",
                maxLength: {
                  value: 50,
                  message: "Full Name must be less than 50 characters",
                },
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Email must end with @gmail.com",
                },
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Vehicle Type Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold">
              Vehicle Type
            </label>
            <select
              {...register("vehicleType", {
                required: "Vehicle Type is required",
              })}
              className="w-full border rounded-md p-2 bg-white"
            >
              <option value="">Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Bike</option>
              <option value="rickshaw">Autorickshaw</option>
            </select>
            {errors.vehicleType && (
              <p className="text-red-500 text-sm">
                {errors.vehicleType.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              License Plate
            </label>
            <input
              type="text"
              {...register("licensePlate", {
                required: "License Plate is required",
                pattern: {
                  value: /^[A-Za-z]{2}[0-9]{2}[A-Za-z]{2}[0-9]{4}$/,
                  message: "License Plate must be in the format XX00XX0000",
                },
                minLength: {
                  value: 10,
                  message: "License Plate must be 10 characters",
                },
                maxLength: {
                  value: 10,
                  message: "License Plate must be 10 characters",
                },
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter license plate"
            />
            {errors.licensePlate && (
              <p className="text-red-500 text-sm">
                {errors.licensePlate.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">
              Phone Number
            </label>
            <input
              type="number"
              {...register("phone", {
                required: "Phone Number is required",
                pattern: {
                  value: /^[0-9]{10}$/, // Ensuring 10 digits without spaces
                  message: "Phone Number must be a 10-digit number",
                },
                minLength: {
                  value: 10,
                  message: "Phone Number must be exactly 10 digits",
                },
                maxLength: {
                  value: 10,
                  message: "Phone Number must be exactly 10 digits",
                },
                
              })}
              className="w-full border rounded-md p-2"
              placeholder="Enter phone number"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-yellow-300 text-white px-4 py-2 rounded-md mt-4 font-semibold hover:bg-black hover:text-white"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverProfile;
