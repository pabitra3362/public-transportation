import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaStar } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { registerReview } from "../services/review/review.services";
import { FaChevronDown } from "react-icons/fa6";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  review: yup.string().required("Review is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Please select a rating"),
});

const ReviewPanel = ({ ride, setReviewPanel }) => {
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleStarClick = (value) => {
    setRating(value);
    setValue("rating", value); // Set the value in react-hook-form
  };

  const onSubmit = async (data) => {
    try {
      const response = await registerReview({
        title: data.title,
        description: data.review,
        rating: data.rating,
        rideId: ride._id,
      });

      toast.dismiss()
      toast.success("Thanks for your valuable time",{
        onClose: ()=>{
          setReviewPanel(false);
        }
      });
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="w-full mx-auto p-4 mt-10 bg-white rounded-md shadow-md">
      <ToastContainer autoClose={3000} draggable={true} />
      <h2 className="text-lg font-bold mb-4">Write a Review</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Title
          </label>
          <input
            placeholder="Enter title..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.title ? "border-red-500" : ""
            }`}
            id="title"
            type="text"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="review"
          >
            Description
          </label>
          <textarea
            placeholder="Enter Description..."
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.review ? "border-red-500" : ""
            }`}
            id="review"
            {...register("review")}
          />
          {errors.review && (
            <p className="text-red-500 text-xs italic">
              {errors.review.message}
            </p>
          )}
        </div>

        {/* Star Rating Component */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Rating
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <FaStar
                key={star}
                className={`cursor-pointer text-2xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
                onClick={() => handleStarClick(star)}
              />
            ))}
          </div>
          {errors.rating && (
            <p className="text-red-500 text-xs italic">
              {errors.rating.message}
            </p>
          )}
        </div>

        

        <div className="flex justify-start items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
        <button
          onClick={() => setReviewPanel(false)}
          className="w-fit h-10 px-10 py-2 rounded-md hover:bg-[#d36262]"
        >
          Close
        </button>
      </div>
      </form>
    </div>
  );
};

export default ReviewPanel;
