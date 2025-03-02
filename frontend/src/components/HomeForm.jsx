/* eslint-disable no-unused-vars */
import React, { useState, useCallback, useContext } from "react";
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
import CarConfirmPanel from "./CarConfirmPanel";
import { setConfirmedCarDetails } from "../features/car/confirmedCarSlice";
import { useDispatch, useSelector } from "react-redux";
import LookingForDriver from "./LookingForDriver";
import { getUserToken } from '../utils/token';
import { toast, ToastContainer } from 'react-toastify';
import { createRide, getFare } from "../services/ride/ride.service";
import { SocketContext } from "../context/SocketContext";
import WaitingForDriver from "./WaitingForDriver";
import { useNavigate } from "react-router-dom";

const HomeForm = () => {
  const [address1, setAddress1] = useState(""); // Starting point
  const [address2, setAddress2] = useState(""); // Ending point
  const [suggestions1, setSuggestions1] = useState([]);
  const [suggestions2, setSuggestions2] = useState([]);
  const [cache, setCache] = useState({}); // Caching results
  const [carSuggestionPanel, setCarSuggestionPanel] = useState(false); // Toogle visibility for carSuggestionPanel
  const [carConfirmPanel, setCarConfirmPanel] = useState(false); // Toogle visibility for carConfirmPanel
  const [LookingDriverPanel, setLookingDriverPanel] = useState(false); // Toogle visibility for looking driver panel
  const [ waitingDriverPanel , setWaitingDriverPanel ] = useState(false); // Toogle visibility for waiting driver panel
  const [confirmedCar, setConfirmedCar] = useState({}); // empty state for storing confirmed Car values
  const [fare, setFare] = useState({})
  const [ride, setRide] = useState(null);
  const dispatch = useDispatch();
  const token = getUserToken();
  const { user } = useSelector(state => state.user)
  const { sendMessage , receiveMessage }= useContext(SocketContext);
  const navigate = useNavigate();
  

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();



    receiveMessage('ride-confirmed',(data)=>{
      setRide(data);
      setWaitingDriverPanel(true);
    })

    receiveMessage('ride-started', ride=>{
      setWaitingDriverPanel(false)
      navigate('/riding', {state: {ride,confirmedCar}})
    })



  // Debounced function to reduce API calls
  const fetchSuggestions = useCallback(
    debounce(async (query, field) => {
      if (!query || query.length < 3) return; // Avoid unnecessary API calls

      // Use cache if available
      if (cache[query]) {
        field === "pickup"
          ? setSuggestions1(cache[query])
          : setSuggestions2(cache[query]);
        return;
      }

      try {

        const response = await axios.get(`${config.baseUrl}/maps/get-suggestions`,{
          headers:{
            Authorization: `bearer ${token}`
          },
          params:{
            input: query,
          }
        })

      
        const formattedResults = response.data.map((suggestion) => ({
          id: suggestion.place_id,
          name: suggestion.description,
        }));

        setCache((prevCache) => ({ ...prevCache, [query]: formattedResults })); // Store in cache

        field === "pickup"
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

    if (field === "pickup") {
      setAddress1(query);
      fetchSuggestions(query, "pickup");
    } else {
      setAddress2(query);
      fetchSuggestions(query, "destination");
    }
  };

  const handleSelect = (selectedAddress, field) => {
    if (field === "pickup") {
      setAddress1(selectedAddress);
      setSuggestions1([]);
    } else {
      setAddress2(selectedAddress);
      setSuggestions2([]);
    }
  };

  // handle form submit
  const onSubmit =async (data) => {
    if(!token){
      alert("Please login first");
      return
    }

    // get fare
    try {
      const response = await getFare({pickup: data.pickup, destination: data.destination })
      setFare(response)
    } catch (error) {
      console.log(error.message)
    }

    setCarSuggestionPanel(true);
    dispatch(setConfirmedCarDetails(data));
  };

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
      <ToastContainer theme="dark" />
      <div className="w-full bg-slate-200 py-1 md:py-5 lg:py-16">
        <div className="w-full md:w-[80vw] lg:w-[70vw] mx-auto px-3 py-7 md:py-10 overflow-hidden grid lg:flex  justify-items-center  lg:justify-around items-center gap-8 lg:gap-2 bg-white rounded-lg hover:shadow-2xl transition duration-200">
          {/* Video */}
          <motion.div className="left w-80 h-96 md:h-[40vh] lg:w-[29vw] lg:h-[50vh] flex justify-center items-center relative">
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
          <div className="right h-[550px] gap-5 relative overflow-y-hidden w-full mdw-full lg:w-[29vw]">
            <div
              className={`${
                carSuggestionPanel ? "h-[0px]" : "h-[550px]"
              } duration-500 overflow-y-hidden`}
            >
              <h2 className="font-bold text-black text-3xl mb-8 text-center">
                Booking Taxi Online
              </h2>

              <motion.form
                onSubmit={handleSubmit(onSubmit)}
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                className=" w-[95%] md:w-full lg:w-[29vw] mx-auto lg:px-3 gap-3"
              >
                {/* Name */}
                <motion.div variants={itemVariants}>
                  <Input
                    type="text"
                    placeholder="Your Name"
                    className="w-full md:w-full lg:w-[29vw]"
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
                    className="w-full md:w-full lg:w-[29vw]"
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
                    name="pickup"
                    control={control}
                    rules={{ required:"Pickup point is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Pickup Point"
                          className="w-full md:w-full lg:w-[29vw]"
                          icon={<FaLocationDot />}
                          onChange={(e) => {
                            field.onChange(e.target.value); // Update react-hook-form's state
                            handleChange(e, "pickup"); // Update suggestions and local state
                          }}
                          value={address1} // Use local state to display value
                        />
                        <div className="max-h-20 overflow-hidden overflow-y-scroll">
                          {suggestions1.map((item) => (
                            <div
                              key={item.id}
                              className="cursor-pointer w-full md:w-full lg:w-[29vw]"
                              onClick={(e) => {
                                handleSelect(item.name, "pickup");
                                field.onChange(e.target.textContent); // Update react-hook-form's state
                              }}
                            >
                              {item.name}
                            </div>
                          ))}
                        </div>
                        {errors.pickup && (
                          <span className="text-red-500 my-2 font-bold">
                            {errors.pickup.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </motion.div>

                {/* End Destination */}
                <motion.div variants={itemVariants}>
                  <Controller
                    name="destination"
                    control={control}
                    rules={{ required: "Destination point is required" }}
                    render={({ field }) => (
                      <div>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Destination Point"
                          className="w-full md:w-full lg:w-[29vw]"
                          icon={<FaLocationDot />}
                          onChange={(e) => {
                            field.onChange(e.target.value); // Update react-hook-form's state
                            handleChange(e, "destination"); // Update suggestions and local state
                          }}
                          value={address2} // Use local state to display value
                        />
                        {suggestions2.map((item) => (
                          <div
                            key={item.id}
                            className="cursor-pointer w-full md:w-full lg:w-[29vw]"
                            onClick={(e) => {
                              handleSelect(item.name, "destination");
                              field.onChange(e.target.textContent); // Update react-hook-form's state
                            }}
                          >
                            {item.name}
                          </div>
                        ))}
                        {errors.destination && (
                          <span className="text-red-500 my-2 font-bold">
                            {errors.destination.message}
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
                    className="w-full md:w-full lg:w-[29vw]"
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
                <motion.div className="w-full my-2" variants={itemVariants}>
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
            <div
              className={` overflow-y-scroll overflow-x-visible w-full ${
                carConfirmPanel || LookingDriverPanel ? "h-[0px]" : "h-[459px]"
              } duration-500 gap-4 flex flex-col px-3`}
            >
              <button
                onClick={() => setCarSuggestionPanel(false)}
                className="w-fit h-10 mx-auto align-middle bg-gray-300 px-10 py-2 rounded-md"
              >
                <IoIosArrowDropdown className="size-5" />
              </button>
              <CarSuggestionPanel
                fare={fare}
                setCarConfirmPanel={setCarConfirmPanel}
                setConfirmedCar={setConfirmedCar}
              />
            </div>

            {/* confirm panel */}
            <div
              className={` overflow-y-scroll overflow-x-visible w-full ${
                !LookingDriverPanel && carConfirmPanel ? "h-[459px]" : "h-[0px]"
              } duration-500 gap-4 flex flex-col px-3`}
            >
              <button
                onClick={() => setCarConfirmPanel(false)}
                className="w-fit h-10 mx-auto align-middle bg-gray-300 px-10 py-2 rounded-md"
              >
                <IoIosArrowDropdown className="size-5" />
              </button>
              <CarConfirmPanel
                confirmedCar={confirmedCar}
                setLookingDriverPanel={setLookingDriverPanel}
                setCarConfirmPanel={setCarConfirmPanel}
              />
            </div>

            {/* looking driver panel */}
            <div
              className={` overflow-y-scroll overflow-x-visible w-full ${
                !waitingDriverPanel && LookingDriverPanel ? "h-[459px]" : "h-[0px]"
              } duration-500 gap-4 flex flex-col px-3`}
            >
              {/* <button
                onClick={() => {
                  setLookingDriverPanel(false);
                  setCarConfirmPanel(true);
                }}
                className="w-fit h-10 mx-auto align-middle bg-gray-300 px-10 py-2 rounded-md"
              >
                <IoIosArrowDropdown className="size-5" />
              </button> */}

              <LookingForDriver confirmedCar={confirmedCar} />
            </div>


            {/* Waiting driver panel */}
            <div
              className={` overflow-y-scroll overflow-x-visible w-full ${
                waitingDriverPanel ? "h-[459px]" : "h-[0px]"
              } duration-500 gap-4 flex flex-col px-3`}
            >
              {/* <button
                onClick={() => {
                  setLookingDriverPanel(false);
                  setCarConfirmPanel(true);
                }}
                className="w-fit h-10 mx-auto align-middle bg-gray-300 px-10 py-2 rounded-md"
              >
                <IoIosArrowDropdown className="size-5" />
              </button> */}

              <WaitingForDriver ride={ride} confirmedCar={confirmedCar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeForm;
