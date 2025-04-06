import React, { useEffect, useState } from "react";
import { FaMoneyBillWave, FaRupeeSign } from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { confirmRide } from "../services/ride/ride.service";
import { useSelector } from "react-redux";
import { getDistanceAndTime } from "../services/map/map.service";

const ConfirmRidePopup = ({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  ride,
}) => {
  const navigate = useNavigate();
  const { driver } = useSelector((state) => state.driver);
  const [distanceTime, setDistanceTime] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    async function callMe() {
      const response = await getDistanceAndTime({
        pickup: ride?.pickup,
        destination: ride?.destination,
      });

      if (response) {
        const distance = response.distance.value / 1000;
        setDistanceTime(distance);
      } else {
        setDistanceTime(null);
      }
    }

    callMe();
  }, [ride]);

  const onSubmit = async (data) => {
    try {
      const response = await confirmRide({ rideId: ride?._id, otp: data.otp });

      if (response) {
        setConfirmRidePopupPanel(false);
        setRidePopupPanel(false);
        navigate("/driver-riding", { state: { ride } });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="py-2">
      <div className="flex justify-center">
        <button
          onClick={() => {
            setConfirmRidePopupPanel(false);
            setRidePopupPanel(false);
          }}
          className="w-fit h-10 mx-auto align-middle px-10 py-2 rounded-md"
        >
          <RiArrowDownWideFill className="size-5" />
        </button>
      </div>
      {/* header */}
      <h1 className="text-2xl font-semibold text-start mt-3 mb-4">
        Confim This Ride To Start
      </h1>
      {/* <hr className="w-full bg-black h-[3px] opacity-20" /> */}

      <div className="flex justify-between items-center py-4 rounded-lg bg-yellow-400 px-2">
        <div className="flex items-center gap-3">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ar6WjHrFQVRAlywciRUAbIn1iqVQGdyJYQ&s"
            alt="driver-image"
          />
          <h2 className="font-bold text-lg capitalize">{ride?.user.name}</h2>
        </div>
        <div className="font-bold text-lg">Phone: {ride?.phone}</div>
      </div>

      {/* <hr className="w-full bg-black h-[3px] opacity-20" /> */}

      {/* Main Content */}
      <div className="my-3">
        <div className="startingPoint flex justify-start items-center gap-5 my-5">
          <div className="">
            <GiJourney className="w-6 h-6 " />
          </div>
          <div className="font-bold w-full">
            {ride?.pickup}
            <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
          </div>
        </div>
        <div className="endingPoint flex justify-start items-center gap-5 my-5">
          <div className="">
            <GiJourney className="w-6 h-6 " />
          </div>
          <div className="font-bold w-full">
            {ride?.destination}
            <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
          </div>
        </div>
        <div className="price flex justify-start items-center gap-5 my-5">
          <div className="">
            <FaMoneyBillWave className="w-6 h-6 " />
          </div>
          <div className="font-bold flex justify-start items-center w-full ">
            <FaRupeeSign /> {ride?.fare}
          </div>
        </div>
      </div>

      <div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="w-full rounded my-2 placeholder:font-semibold pl-5"
            type="number"
            placeholder="Enter OTP"
            {...register("otp", {
              required: "OTP is required",
              pattern: {
                value: /^[0-9]{6}$/,
                message: "OTP should be exactly 6 digits",
              },
            })}
          />

          <div>
            {errors.otp && (
              <span className="text-red-500 font-custom">
                {errors.otp.message}
              </span>
            )}
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-black py-2 rounded hover:bg-black hover:text-white duration-300 font-bold my-2"
          >
            Confirm
          </button>

          {/* ignore button */}
          <button
            onClick={() => {
              setConfirmRidePopupPanel(false);
              setRidePopupPanel(false);
            }}
            className="w-full bg-red-500 text-black py-2 rounded hover:bg-black hover:text-white duration-300 font-bold my-2"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmRidePopup;
