import React, { useState, useRef } from "react";
import vdo from "../assets/Taxi booking.mp4";
import { motion } from "framer-motion";
import Input from './Input';
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import Button from "./Button";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const HomeForm = ({ ref2 }) => {
  const [selectedClass, setSelectedClass] = useState("economy");
  const [address1, setAddress1] = useState(""); // Starting point
  const [address2, setAddress2] = useState(""); // Ending point
  const [suggestions1, setSuggestions1] = useState([]); // Suggestions for starting point
  const [suggestions2, setSuggestions2] = useState([]); // Suggestions for ending point

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleChange = async (event, field) => {
    const query = event.target.value;

    if (field === "startingPoint") {
      setAddress1(query);
    } else {
      setAddress2(query);
    }

    if (query) {
      try {
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
          params: {
            q: query,
            format: "json",
            addressdetails: 1,
            limit: 5,
          },
        });

        if (field === "startingPoint") {
          setSuggestions1(response.data);
        } else {
          setSuggestions2(response.data);
        }
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    } else {
      if (field === "startingPoint") {
        setSuggestions1([]);
      } else {
        setSuggestions2([]);
      }
    }
  };

  const handleSelect = (event, field) => {
    const selectedAddress = event.target.textContent;
    if (field === "startingPoint") {
      setAddress1(selectedAddress);
      setSuggestions1([]);
    } else {
      setAddress2(selectedAddress);
      setSuggestions2([]);
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: {
        staggerChildren: 0.2,
      },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div>
      {/* Booking form */}
      <div className="w-full bg-slate-200 py-1 md:py-5 lg:py-16">
        <div className="w-full md:w-[80vw] lg:w-[70vw] mx-auto px-3 py-7 md:py-10 overflow-hidden grid md:flex justify-items-center md:justify-between items-center gap-8 lg:gap-2 bg-white rounded-lg">
          <div className="left bg-custom-yellow w-80 h-96 md:h-[40vh] lg:w-[35vw] lg:h-[50vh] flex justify-center items-center relative">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={vdo}
              loop
              autoPlay
            ></video>
          </div>
          <div className="right grid items-center gap-5">
            <h2 className="font-bold text-black text-3xl">Booking Taxi Online</h2>
            <div className="flex justify-start items-center gap-5">
              <div
                onClick={() => setSelectedClass("standard")}
                className={`${
                  selectedClass === "standard"
                    ? "border-b-2 border-yellow-400 text-yellow-400"
                    : "text-black"
                } transition duration-200 font-bold text text-sm cursor-pointer`}
              >
                STANDARD
              </div>
              <div
                onClick={() => setSelectedClass("economy")}
                className={`${
                  selectedClass === "economy"
                    ? "border-b-2 border-yellow-400 text-yellow-400"
                    : "text-black"
                } transition duration-200 font-bold text text-sm cursor-pointer`}
              >
                ECONOMY
              </div>
              <div
                onClick={() => setSelectedClass("business")}
                className={`${
                  selectedClass === "business"
                    ? "border-b-2 border-yellow-400 text-yellow-400"
                    : "text-black"
                } transition duration-200 font-bold text text-sm cursor-pointer`}
              >
                BUSINESS
              </div>
              <div
                onClick={() => setSelectedClass("vip")}
                className={`${
                  selectedClass === "vip"
                    ? "border-b-2 border-yellow-400 text-yellow-400"
                    : "text-black"
                } transition duration-200 font-bold text text-sm cursor-pointer`}
              >
                VIP
              </div>
            </div>
            <motion.form
              ref={ref2}
              onSubmit={handleSubmit(onSubmit)}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid justify-items-center items-center w-full gap-3"
            >
              {/* name */}
              <motion.div className="name" variants={itemVariants}>
                <Input
                  type="text"
                  placeholder="Your Name"
                  icon={<FaUser />}
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is required",
                    },
                  })}
                />
                {errors.name && (
                  <span className="text-red-500 my-2 font-bold">
                    {errors.name.message}
                  </span>
                )}
              </motion.div>

              {/* phone */}
              <motion.div className="phone" variants={itemVariants}>
                <Input
                  type="number"
                  placeholder="Phone"
                  icon={<FaPhone />}
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "Phone number is required",
                    },
                    pattern: {
                      value: /^[0-9]{10}$/g,
                      message: "Enter a valid phone number",
                    },
                  })}
                />
                {errors.phone && (
                  <span className="text-red-500 my-2 font-bold">
                    {errors.phone.message}
                  </span>
                )}
              </motion.div>

              {/* start-destination */}
              <motion.div className="start-destination" variants={itemVariants}>
                <Controller
                  name="startingPoint"
                  control={control}
                  rules={{ required: "Start destination is required" }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type="text"
                        placeholder="Start Destination"
                        icon={<FaLocationDot />}
                        onChange={(e) => handleChange(e, "startingPoint")}
                        value={address1}
                      />
                      {suggestions1.length > 0 &&
                        suggestions1.map((item, index) => (
                          <div className="my-2 w-80 lg:w-[35vw]"
                            key={index}
                            onClick={(e) => handleSelect(e, "startingPoint")}
                          >
                            {item.display_name}
                          </div>
                        ))}
                      {errors.startingPoint && (
                        <span className="text-red-500 my-2 font-bold">
                          {errors.startingPoint.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </motion.div>

              {/* end-destination */}
              <motion.div className="end-destination" variants={itemVariants}>
                <Controller
                  name="endingPoint"
                  control={control}
                  rules={{ required: "End destination is required" }}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        type="text"
                        placeholder="End Destination"
                        icon={<FaLocationDot />}
                        onChange={(e) => handleChange(e, "endingPoint")}
                        value={address2}
                      />
                      {suggestions2.length > 0 &&
                        suggestions2.map((item, index) => (
                          <div className="w-80 lg:w-[35vw]"
                            key={index}
                            onClick={(e) => handleSelect(e, "endingPoint")}
                          >
                            {item.display_name}
                          </div>
                        ))}
                      {errors.endingPoint && (
                        <span className="text-red-500 my-2 font-bold">
                          {errors.endingPoint.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </motion.div>

              {/* date */}
              <motion.div className="date" variants={itemVariants}>
                <Input
                  type="date"
                  placeholder="Date"
                  icon={<BsCalendarDateFill />}
                  {...register("date", {
                    required: {
                      value: true,
                      message: "Date is required",
                    },
                  })}
                />
                {errors.date && (
                  <span className="text-red-500 my-2 font-bold">
                    {errors.date.message}
                  </span>
                )}
              </motion.div>

              <motion.div className="book-btn w-80 lg:w-[35vw]" variants={itemVariants}>
                <Button type="submit" className="w-full py-3 border border-black rounded-lg">
                  Book Now!
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeForm;
