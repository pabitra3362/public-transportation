import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { FaRegUserCircle } from "react-icons/fa";
import { MdEmail, MdOutlineEventNote } from "react-icons/md";
import { FaMessage } from "react-icons/fa6";
import TextArea from "./TextArea";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="grid gap-10">
      <div className="grid justify-items-center items-center gap-4">
        <p className="text-yellow-400 text-center text-2xl">
          How Can We Help You?
        </p>
        <p className=" text-black font-bold text-center text-3xl">
          Have Any Question?
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid justify-items-center items-center w-full gap-3"
      >
        {/* name */}
        <div>
          <Input
            type="text"
            placeholder="Your Name"
            className="rounded-md"
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
            className="rounded-md"
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
            className="rounded-md"
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
            className="h-44 rounded-md"
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

        <div className="w-80 lg:w-[35vw]">
          <Button
            type="submit"
            className="w-full py-3 border border-black rounded-lg"
          >
            Book Now!
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
