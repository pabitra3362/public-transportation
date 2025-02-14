/* eslint-disable no-unused-vars */
import React, { useState, useCallback } from "react";
import vdo from "../assets/Taxi booking.mp4";
import { motion } from "framer-motion";
import Input from "./Input";
import { FaUser, FaPhone } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { BsCalendarDateFill } from "react-icons/bs";
import { IoIosArrowDropdown } from "react-icons/io";
import Button from "./Button";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import debounce from "lodash.debounce";
import config from "../config/config";
import CarSuggestionPanel from "./CarSuggestionPanel";
import CarConfirmPanel from './CarConfirmPanel';



const HomeForm = () => {
  const [address1, setAddress1] = useState(""); // Starting point
  const [address2, setAddress2] = useState(""); // Ending point
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [cache, setCache] = useState({}); // Caching results
  const [carSuggestionPanel, setCarSuggestionPanel] = useState(false); // Toogle visibility for carSuggestionPanel
  const [carConfirmPanel, setCarConfirmPanel] = useState(false); // Toogle visibility for carConfirmPanel

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Debounced function to reduce API calls
  const fetchSuggestions = useCallback(
    debounce(async (query, field) => {
      if (!query || query.length < 3) return; // Avoid unnecessary API calls

      // Use cache if available
      if (cache[query]) {
        field === "startingPoint"
          ? setSuggestions1(cache[query])
          : setSuggestions2(cache[query]);
        return;
      }

      try {
        const response = await axios.get(
          `https://geocode.search.hereapi.com/v1/geocode`,
          {
            params: {
              q: query,
              apiKey: config.hereApiKey,
              in: "countryCode:IND", // Limit results to India
              limit: 10, // Limit suggestions to 10
            },
          }
        );

        const formattedResults = response.data.items.map((place) => ({
          id: place.id,
          name: place.address.label, // Full address from HERE API
          lat: place.position.lat,
          lng: place.position.lng,
        }));

        setCache((prevCache) => ({ ...prevCache, [query]: formattedResults })); // Store in cache

        field === "startingPoint"
          ? setSuggestions1(formattedResults)
          : setSuggestions2(formattedResults);
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    }, 500), // 500ms delay to optimize requests
    [cache]
  );

  const handleChange = (event, field) => {
    const query = event.target.value;

    if (field === "startingPoint") {
      setAddress1(query);
      fetchSuggestions(query, "startingPoint");
    } else {
      setAddress2(query);
      fetchSuggestions(query, "endingPoint");
    }
  };

  const handleSelect = (selectedAddress, field) => {
    if (field === "startingPoint") {
      setAddress1(selectedAddress);
      setSuggestions1([]);
    } else {
      setAddress2(selectedAddress);
      setSuggestions2([]);
    }
  };


  // handle form submit
  const onSubmit = (data) => {
    setCarSuggestionPanel(true);
    console.log(data);

  }
  

  const containerVariants = {
    hidden: { opacity: 0, transition: { staggerChildren: 0.2 } },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
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
    <div id="taxi-form">
      <div className="w-full bg-slate-200 py-1 md:py-5 lg:py-16">
        <div className="w-full md:w-[80vw] lg:w-[70vw] mx-auto px-3 py-7 md:py-10 overflow-hidden grid md:flex justify-items-center md:justify-between lg:justify-around items-center gap-8 lg:gap-2 bg-white rounded-lg hover:shadow-2xl transition duration-200">
          {/* Video */}
          <motion.div className="left w-80 h-96 md:h-[40vh] lg:w-[35vw] lg:h-[50vh] flex justify-center items-center relative">
            <motion.video
              className="absolute top-0 left-0 w-full h-full object-cover"
              src={vdo}
              loop
              autoPlay
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            ></motion.video>
          </motion.div>

          {/* Form */}
          <div className="right h-[550px] gap-5 relative overflow-y-hidden">
            <div className={`${carSuggestionPanel ? 'h-[0px]' : 'h-[550px]'} duration-500 overflow-y-hidden`}>
            <h2 className="font-bold text-black text-3xl mb-8 text-center">
              Booking Taxi Online
            </h2>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              className=" w-80 md:w-full lg:w-full mx-auto lg:px-3 gap-3"
            >
              {/* Name */}
              <motion.div variants={itemVariants}>
                <Input
                  type="text"
                  placeholder="Your Name"
                  className='w-80'
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
                      {suggestions1.map((item) => (
                        <div
                          key={item.id}
                          className="cursor-pointer w-full"
                          onClick={(e) => {
                            handleSelect(item.name, "startingPoint");
                            field.onChange(e.target.textContent); // Update react-hook-form's state
                          }}
                        >
                          {item.name}
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
                      {suggestions2.map((item) => (
                        <div
                          key={item.id}
                          className="cursor-pointer w-full"
                          onClick={(e) => {
                            handleSelect(item.name, "endingPoint");
                            field.onChange(e.target.textContent); // Update react-hook-form's state
                          }}
                        >
                          {item.name}
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
              <motion.div className="w-full lg:w-[29vw] my-2" variants={itemVariants}>
                <Button
                  type="submit"
                  className="w-full py-3 border border-black rounded-lg"
                >
                  Book Now!
                </Button>
              </motion.div>
            </motion.form>
            </div>

          {/* suggestion panel */}
          <div className={` overflow-y-scroll overflow-x-visible w-full ${carConfirmPanel ? "h-[0px]" : "h-[459px]" } duration-500 gap-4 flex flex-col px-3`}>
              <button
              onClick={()=>setCarSuggestionPanel(false)}
              className="w-fit h-10 mx-auto align-middle bg-gray-300 px-10 py-2 rounded-md">
                <IoIosArrowDropdown className="size-5" />
              </button>
              <CarSuggestionPanel setCarConfirmPanel={setCarConfirmPanel} />
              
            </div>

          {/* confirm panel */}
          <div className={` overflow-y-scroll overflow-x-visible w-full ${carConfirmPanel ? "h-[459px]" : "h-[0px]"} duration-500 gap-4 flex flex-col px-3`}>
              <button
              onClick={()=>setCarConfirmPanel(false)}
              className="w-fit h-10 mx-auto align-middle bg-gray-300 px-10 py-2 rounded-md">
                <IoIosArrowDropdown className="size-5" />
              </button>
              <CarConfirmPanel />
              
            </div>
        </div>
          </div>
      </div>
    </div>
  );
};

export default HomeForm;
