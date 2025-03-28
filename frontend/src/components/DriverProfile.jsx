/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.jpg";
import DefaultProfilePic from "../assets/DefaultProfilePic.jpeg";

const DriverProfile = () => {
  const [profilePic, setProfilePic] = useState(DefaultProfilePic);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleProfileClick = () => {
    document.getElementById("profileUpload").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    alert("Profile Saved Successfully!");
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center p-6">
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
            <img src={profilePic} alt="Driver" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              {...register("fullName", { required: "Full Name is required" })}
              className="w-full border rounded-md p-2"
              placeholder="Enter your full name"
            />
            {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border rounded-md p-2"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Vehicle Type Dropdown */}
          <div>
            <label className="block text-gray-700 font-semibold">Vehicle Type</label>
            <select
              {...register("vehicleType", { required: "Vehicle Type is required" })}
              className="w-full border rounded-md p-2 bg-white"
            >
              <option value="">Select Vehicle Type</option>
              <option value="Car">Car</option>
              <option value="Bike">Bike</option>
              <option value="Autorickshaw">Autorickshaw</option>
            </select>
            {errors.vehicleType && <p className="text-red-500 text-sm">{errors.vehicleType.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">License Plate</label>
            <input
              type="text"
              {...register("licensePlate", { required: "License Plate is required" })}
              className="w-full border rounded-md p-2"
              placeholder="Enter license plate"
            />
            {errors.licensePlate && <p className="text-red-500 text-sm">{errors.licensePlate.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Phone Number</label>
            <input
              type="text"
              {...register("phone", { required: "Phone Number is required" })}
              className="w-full border rounded-md p-2"
              placeholder="Enter phone number"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
          </div>

          {/* Save Button */}
          <button type="submit" className="w-full bg-yellow-300 text-white px-4 py-2 rounded-md mt-4 font-semibold hover:bg-black hover:text-white">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DriverProfile;
