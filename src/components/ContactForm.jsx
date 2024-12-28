import React from "react";
import { FloatingLabel } from "flowbite-react";
import { useForm } from "react-hook-form";
import Button from './Button'

const ContactForm = () => {

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit=(data) => {
    console.log(data);
  }
  

  return (
    <div>
      <div className="grid justify-items-center items-center gap-4">
        <p className="text-yellow-400 text-center text-2xl">
          How Can We Help You?
        </p>
        <p className=" text-black font-bold text-center text-3xl">
          Have Any Question?
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="grid justify-items-center items-center gap-4">

        {/* name */}
        <div className="grid justify-items-center items-center">
          <FloatingLabel
            className=" focus:border-yellow-400 w-80"
            variant="standard"
            color="default"
            placeholder="Your Name"
            {...register("name", {required:{
              value:true,
              message:"Name is required",
            }})}
          />
          {errors.name && <p className="text-red-500 font-custom w-80 flex justify-start">{errors.name.message}</p>}
        </div>

        {/* email */}
        <div className="grid justify-items-center items-center">
          <FloatingLabel
            className=" focus:border-yellow-400 w-80"
            variant="standard"
            color="default"
            placeholder="Your Email"
            type="email"
            {...register("email", {required:{
              value:true,
              message:"Email is required",
            },
            pattern:{
              value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
              message:"Enter a valid email",
            }
          })}
          />
          {errors.email && <p className="text-red-500 font-custom w-80 flex justify-start">{errors.email.message}</p>}
        </div>

        {/* subject */}
        <div className="grid justify-items-center items-center">
          <FloatingLabel
            className=" focus:border-yellow-400 w-80"
            variant="standard"
            color="default"
            placeholder="Subject"
            {...register("title", {required:{
              value:true,
              message:"Subject is required",
            }})}
          />
          {errors.title && <p className="text-red-500 font-custom w-80 flex justify-start">{errors.title.message}</p>}
        </div>
        
        {/* Message */}
        <div className="grid justify-items-center items-center">
          <textarea className="border-transparent border-b-black focus:border-transparent focus:border-b-yellow-400 border-opacity-50 w-80" placeholder="Your Message"></textarea>
        </div>


        <div className="flex justify-center items-center">
          <Button className="px-4 py-2 border-black rounded-lg w-80" type="submit">Send Message</Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
