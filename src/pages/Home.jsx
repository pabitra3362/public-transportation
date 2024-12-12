import React, { useRef, useState } from "react";
import Hero from "../components/Hero";
import taxiImage from "../assets/taxi-service.svg";
import { motion } from "framer-motion";
import Input from "../components/Input";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import Button from '../components/Button'
import { useForm } from "react-hook-form";

const Home = () => {
  const [selectedClass, setSelectedClass] = useState("economy");
  const ref=useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  }=useForm()

  const onSubmit=(data)=>{
    console.log(data);
  }

  const containerVariants={
    hidden:{
      opacity:0,
      transition:{
        staggerChildren:0.2
      }
    },
    visible:{
      opacity:1,
      transition:{
        staggerChildren:0.2
      }
    }
  }

  const itemVariants={
    hidden:{
      y:20,
      opacity:0
    },
    visible:{
      y:0,
      opacity:1,
      transition:{
        type:'spring',
        stifness: 100,
      }
    }
  }
  return (
    <div>
      {/* Hero section */}
      <Hero />

      {/* Booking form */}
      <div className="w-full md:w-[80vw] lg:w-[70vw] mx-auto px-3 py-7 overflow-hidden grid justify-between items-center gap-8">
        <motion.div
          whileInView={{
            x: [-100, 0],
            transition: {
              duration: 0.8,
            },
          }}
          className="left bg-custom-yellow h-96 flex justify-center items-center"
        >
          <motion.img
            whileInView={{
              opacity: [0, 0.5, 1],
              scale: [0, 1.2, 1],
              transition: {
                duration: 1,
              },
            }}
            className=""
            src={taxiImage}
            alt="taxi illustration"
          />
        </motion.div>
        <div className="right grid items-center gap-5">
          <h2 className="font-bold text-black text-3xl">Booking Taxi Online</h2>
          <div className="flex justify-start items-center gap-5">
            <div
              onClick={()=>setSelectedClass("standard")}
              className={`${
                selectedClass === "standard"
                  ? "border-b-2 border-yellow-400 text-yellow-400"
                  : "text-black"
              } transition duration-200 font-bold text text-sm`}
            >
              STANDARD
            </div>
            <div
              onClick={()=>setSelectedClass("economy")}
              className={`${
                selectedClass === "economy"
                  ? "border-b-2 border-yellow-400 text-yellow-400"
                  : "text-black"
              } transition duration-200 font-bold text text-sm`}
            >
              ECONOMY
            </div>
            <div
              onClick={()=>setSelectedClass("business")}
              className={`${
                selectedClass === "business"
                  ? "border-b-2 border-yellow-400 text-yellow-400"
                  : "text-black"
              } transition duration-200 font-bold text text-sm`}
            >
              BUSINESS
            </div>
            <div
              onClick={()=>setSelectedClass("vip")}
              className={`${
                selectedClass === "vip"
                  ? "border-b-2 border-yellow-400 text-yellow-400"
                  : "text-black"
              } transition duration-200 font-bold text text-sm`}
            >
              VIP
            </div>
          </div>
          <motion.form onSubmit={handleSubmit(onSubmit)} variants={containerVariants} initial='hidden' whileInView='visible' className="grid items-center w-full gap-3">

              {/* name */}
            <motion.div className="name" variants={itemVariants}>
            <Input type='text' ref={ref} placeholder='Your Name' icon={<FaUser />} {...register("name",{
              required:{
                value:true,
                message:"Name is required"
              }
            })} />
            {errors.name && <span className="text-red-500 my-2 font-bold">{errors.name.message}</span>}
            </motion.div>
            
            {/* phone */}
            <motion.div className="phone" variants={itemVariants}>
            <Input type="number" ref={ref} placeholder='Phone' icon={<FaPhone />} {...register("phone",{
              required:{
                value:true,
                message:"Phone number is required"
              },
              pattern:{
                value: /^[0-9]{10}$/g,
                message:"Enter a valid phone number"
              }
            })} />
            {errors.phone && <span className="text-red-500 my-2 font-bold">{errors.phone.message}</span>}
            </motion.div>

            {/* start-destination */}
            {/* need api for address auto completion */}
            <motion.div className="start-destination" variants={itemVariants}>
            <Input type="text" ref={ref} placeholder='Start Destination' icon={<FaLocationDot />} {...register("startingPoint",{
              required:{
                value:true,
                message:"Start-Destination is required"
              }
            })} />
            {errors.startingPoint && <span className="text-red-500 my-2 font-bold">{errors.startingPoint.message}</span>}
            </motion.div>

            {/* end-destination */}
            {/* need api for address auto completion */}
            <motion.div className="end-destination" variants={itemVariants}>
            <Input type="text" ref={ref} placeholder='End Destination' icon={<FaLocationDot />} {...register("endingPoint",{
              required:{
                value:true,
                message:"End-Destination is required"
              }
            })} />
            {errors.endingPoint && <span className="text-red-500 my-2 font-bold">{errors.endingPoint.message}</span>}
            </motion.div>

            {/* date */}
            <motion.div className="date" variants={itemVariants}>
            <Input type="date" ref={ref} placeholder='Date' icon={<BsCalendarDateFill  />} {...register("date",{
              required:{
                value:true,
                message:"date is required"
              }
            })} />
            {errors.date && <span className="text-red-500 my-2 font-bold">{errors.date.message}</span>}
            </motion.div>


            <motion.div className="book-btn" variants={itemVariants}>
              <Button type='submit' className="w-full py-3 bg-black text-white rounded-lg">Book Now!</Button>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </div>
  );
};

export default Home;
