/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail, MdOutlineEventNote } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import TextArea from "./TextArea";
import { toast, ToastContainer } from 'react-toastify'

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data,event) => {
    const formData = new FormData(event.target);

    formData.append("access_key", "7c8cb446-ff39-47d0-99fa-9c3d6bdfafd1");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const apiData = await response.json();

    if (apiData.success) {
      toast.success("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", apiData);
      toast.error(apiData.message);
    }
  };

  return (
    <div className="grid gap-10">
      {/* Toaster for Toast */}
      <ToastContainer theme="dark" />

      {/* Main Content */}
      <div className="grid justify-items-center items-center gap-4">
        <p className="text-yellow-300 text-center text-2xl">
          How Can We Help You?
        </p>
        <p className=" text-black font-bold text-center text-3xl">
          Have Any Questions?
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full gap-3 px-3"
      >
        {/* name */}
        <div>
          <Input
            type="text"
            placeholder="Your Name"
            className="rounded-md w-full"
            icon={<FaRegUserCircle />}
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500 my-2 font-custom">
              {errors.name.message}
            </span>
          )}
        </div>

        {/* email */}
        <div>
          <Input
            type="email"
            placeholder="Your Email"
            icon={<MdEmail />}
            className="rounded-md w-full"
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value:
                  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                message: "Enter a valid email",
              },
            })}
          />
          {errors.email && (
            <span className="text-red-500 my-2 font-custom">
              {errors.email.message}
            </span>
          )}
        </div>

        {/* subject */}
        <div>
          <Input
            type="text"
            placeholder="Subject"
            className="rounded-md w-full"
            icon={<MdOutlineEventNote />}
            {...register("title", {
              required: {
                value: true,
                message: "Subject is required",
              },
            })}
          />
          {errors.title && (
            <span className="text-red-500 my-2 font-custom">
              {errors.title.message}
            </span>
          )}
        </div>

        {/* Message */}
        <div>
          <TextArea
            placeholder="Your Message"
            className="h-44 rounded-md w-full"
            {...register("message", {
              required: {
                value: true,
                message: "Message is required",
              },
            })}
          />
          {errors.message && (
            <span className="text-red-500 my-2 font-custom">
              {errors.message.message}
            </span>
          )}
        </div>

        <div className="w-full my-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 border border-black rounded-lg"
          >
            {isSubmitting ? (
              <span className="loading loading-dots loading-lg"></span>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
