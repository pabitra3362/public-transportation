import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaStar } from "react-icons/fa";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  review: yup.string().required("Review is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(1, "Please select a rating"),
});

const ReviewPanel = () => {
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
    console.log(data);
  };

  return (
    <div className="max-w-md mx-auto p-4 mt-10 bg-white rounded-md shadow-md">
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
            Review
          </label>
          <textarea
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

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ReviewPanel;
