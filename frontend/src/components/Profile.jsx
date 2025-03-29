/* eslint-disable no-irregular-whitespace */
/* eslint-disable no-unused-vars */
/* eslint-disable-next-line no-unused-vars */
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.jpg"; // Import the logo image
import DefaultProfilePic from "../assets/DefaultProfilePic.jpeg"; // Import the default profile picture
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { updateProfile } from "../services/user/user.services";
import { Spinner } from "flowbite-react";

function Profile() {
  const { user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [image, setImage] = useState(null);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("file", user?.file || DefaultProfilePic);
    setLoader(false);
  }, [user]);

  const handleImageChange = (event) => {
    let file = event.target.files[0];
    setValue("file", file);
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("id", user._id);
    formData.append("name", data.name);
    formData.append("email", data.email);
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
    <div className="bg-white p-6 rounded-lg shadow-2xl mx-auto mt-8 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-auto sm:h-auto md:h-[55%]">
      <ToastContainer theme="dark" autoClose={3000} draggable={true} />
      {/* Logo image */}
      <div className="text-center mb-4">
        <img src={Logo} alt="Logo" className="mx-auto h-40 rounded-full" />
      </div>

      <h2 className="text-2xl font-semibold text-center mb-6">Your Profile</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="flex flex-col"
      >
        {/* Image preview or default image */}
        <div className="w-32 h-32 mx-auto mb-4">
          <img
            src={image || user?.file || DefaultProfilePic} // Show uploaded image or saved image
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-yellow-300 cursor-pointer"
            onClick={() => document.getElementById("profileImageInput").click()}
          />
        </div>

        {/* Text showing until the user uploads an image */}
        {/* {!image && !savedData.image && (
          <p className="text-center text-gray-500 mb-4">Upload your Profile</p>
        )} */}

        {/* Image upload input field */}
        <input
          id="profileImageInput"
          {...register("file")}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden" // Hide the file input
        />

        {/* Name input field */}
        <input
          {...register("name", { require: true })}
          type="text"
          placeholder="Name"
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />

        {/* Email input field */}
        <input
          {...register("email", { require: true })}
          type="email"
          placeholder="Email"
          className="w-full p-3 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />

        {/* Save button */}
        <button
          type="submit"
          className="w-full bg-yellow-300 font-bold text-black p-3 rounded hover:bg-black hover:text-white transition duration-300"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default Profile;
