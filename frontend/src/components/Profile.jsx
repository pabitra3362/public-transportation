/* eslint-disable-next-line no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../assets/Logo.jpg"; // Import the logo image
import DefaultProfilePic from "../assets/DefaultProfilePic.jpeg"; // Import the default profile picture

function Profile() {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "John Doe",
      email: "john@example.com",
    },
  });

  const [image, setImage] = useState(null); // State to hold the uploaded image
  const [savedData, setSavedData] = useState({
    name: "John Doe",
    email: "john@example.com",
    image: null,
  }); // This holds the saved data, persists after submitting

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Generate the image URL for preview
    }
  };

  const onSubmit = (data) => {
    // Update saved data with the newly submitted values
    setSavedData({
      name: data.name,
      email: data.email,
      image: image || savedData.image, // If image is null, keep the old image
    });

    alert(`Profile updated: ${data.name}, ${data.email}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-2xl mx-auto mt-8 w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-auto sm:h-auto md:h-[95%]">
      {/* Logo image */}
      <div className="text-center mb-4">
        <img src={Logo} alt="Logo" className="mx-auto h-40 rounded-full" />
      </div>

      <h2 className="text-2xl font-semibold text-center mb-6">Your Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        {/* Image preview or default image */}
        <div className="w-32 h-32 mx-auto mb-4">
          <img
            src={image || savedData.image || DefaultProfilePic} // Show uploaded image or saved image
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-4 border-yellow-300 cursor-pointer"
            onClick={() => document.getElementById("profileImageInput").click()} // Trigger file input on image click
          />
        </div>

        {/* Text showing until the user uploads an image */}
        {!image && !savedData.image && (
          <p className="text-center text-gray-500 mb-4">Upload your Profile</p>
        )}

        {/* Image upload input field */}
        <input
          id="profileImageInput"
          {...register("image")}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden" // Hide the file input
        />

        {/* Name input field */}
        <input
          {...register("name")}
          type="text"
          placeholder="Name"
          defaultValue={savedData.name} // Show the saved name by default
          className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        />

        {/* Email input field */}
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          defaultValue={savedData.email} // Show the saved email by default
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
