import React, { useState } from "react";
import vdo from "../assets/Taxi booking.mp4";
import { motion } from "framer-motion";
import Input from "./Input";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import Button from "./Button";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const HomeForm = () => {
  const [selectedClass, setSelectedClass] = useState("economy");
  const [address1, setAddress1] = useState(""); // Starting point
  const [address2, setAddress2] = useState(""); // Ending point
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log({ ...data, selectedClass });
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
        const response = await axios.get(
          "https://nominatim.openstreetmap.org/search",
          {
            params: {
              q: query,
              format: "json",
              addressdetails: 1,
              limit: 5,
            },
          }
        );

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
      transition: { staggerChildren: 0.2 },
    },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <div>
      <div className="w-full bg-slate-200 py-1 md:py-5 lg:py-16">
        <div className="w-full md:w-[80vw] lg:w-[70vw] mx-auto px-3 py-7 md:py-10 overflow-hidden grid md:flex justify-items-center md:justify-between items-center gap-8 lg:gap-2 bg-white rounded-lg hover:shadow-lg transition duration-200">
          <div className="left bg-custom-yellow w-80 h-96 md:h-[40vh] lg:w-[35vw] lg:h-[50vh] flex justify-center items-center relative">
            <video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={vdo}
              loop
              autoPlay
            ></video>
          </div>
          <div className="right grid items-center gap-5">
            <h2 className="font-bold text-black text-3xl">
              Booking Taxi Online
            </h2>
            <div className="flex justify-start items-center gap-5">
              {["standard", "economy", "business", "vip"].map((cls) => (
                <div
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`${
                    selectedClass === cls
                      ? "border-b-2 border-yellow-400 text-yellow-400"
                      : "text-black"
                  } transition duration-200 font-bold text-sm cursor-pointer`}
                >
                  {cls.toUpperCase()}
                </div>
              ))}
            </div>
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className="grid justify-items-center items-center w-full gap-3"
            >
              {/* Name */}
              <motion.div variants={itemVariants}>
                <Input
                  type="text"
                  placeholder="Your Name"
                  icon={<FaUser />}
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 my-2 font-bold">
                    {errors.name.message}
                  </span>
                )}
              </motion.div>

              {/* Phone */}
              <motion.div variants={itemVariants}>
                <Input
                  type="number"
                  placeholder="Phone"
                  icon={<FaPhone />}
                  {...register("phone", {
                    required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
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

              {/* Start Destination */}
              <motion.div variants={itemVariants}>
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
                        onChange={(e) => {
                          field.onChange(e.target.value); // Update react-hook-form's state
                          handleChange(e, "startingPoint"); // Update suggestions and local state
                        }}
                        value={address1} // Use local state to display value
                      />
                      <div className="max-h-20 overflow-hidden overflow-y-scroll">
                      {suggestions1.map((item, index) => (
                        <div
                          key={index}
                          className="cursor-pointer w-80 lg:w-[35vw]"
                          onClick={(e) => {
                            handleSelect(e, "startingPoint");
                            field.onChange(e.target.textContent); // Update react-hook-form's state
                          }}
                        >
                          {item.display_name}
                        </div>
                      ))}
                      </div>
                      {errors.startingPoint && (
                        <span className="text-red-500 my-2 font-bold">
                          {errors.startingPoint.message}
                        </span>
                      )}
                    </div>
                  )}
                />
              </motion.div>

              {/* End Destination */}
              <motion.div variants={itemVariants}>
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
                        onChange={(e) => {
                          field.onChange(e.target.value); // Update react-hook-form's state
                          handleChange(e, "endingPoint"); // Update suggestions and local state
                        }}
                        value={address2} // Use local state to display value
                      />
                      {suggestions2.map((item, index) => (
                        <div
                          key={index}
                          className="cursor-pointer w-80 lg:w-[35vw]"
                          onClick={(e) => {
                            handleSelect(e, "endingPoint");
                            field.onChange(e.target.textContent); // Update react-hook-form's state
                          }}
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

              {/* Date */}
              <motion.div variants={itemVariants}>
                <Input
                  type="date"
                  icon={<BsCalendarDateFill />}
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <span className="text-red-500 my-2 font-bold">
                    {errors.date.message}
                  </span>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div className="w-80 lg:w-[35vw]" variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full py-3 border border-black rounded-lg"
                >
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
