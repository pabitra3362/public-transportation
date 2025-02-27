import React from "react";
import { FaMoneyBillWave, FaRupeeSign } from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createRide } from "../services/ride/ride.service";

const LookingForDriver = ({ confirmedCar }) => {
  const journeyDetails = useSelector((state) => state.car);
  const navigate = useNavigate();



  const handlePayment = async (confirmedCar) => {
    const rideResult = await createRide({
      pickup: journeyDetails.pickup,
      destination: journeyDetails.destination,
      vehicleType: confirmedCar.vehicleType
    })

    console.log(rideResult);
    navigate('/riding')
    
  }
  

  return (
    <div className="py-2">
      {/* header */}
      <h1 className="text-2xl font-semibold text-center mt-3 mb-2">
        Make Payment To Book Driver
      </h1>
      <hr className="w-full bg-black h-[3px] opacity-20" />

      {/* Car Image */}
      <div className="flex justify-center my-7">
        <img
          className="h-24 "
          src={confirmedCar.image}
          alt={confirmedCar.image}
        />
      </div>

      <hr className="w-full bg-black h-[3px] opacity-20" />

      {/* Main Content */}
      <div className="my-3">
        <div className="startingPoint flex justify-start items-center gap-5 my-5">
          <div className="">
            <GiJourney className="w-6 h-6 " />
          </div>
          <div className="font-bold w-full">
            {journeyDetails.pickup}
            <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
          </div>
        </div>
        <div className="endingPoint flex justify-start items-center gap-5 my-5">
          <div className="">
            <GiJourney className="w-6 h-6 " />
          </div>
          <div className="font-bold w-full">
            {journeyDetails.destination}
            <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
          </div>
        </div>
        <div className="price flex justify-start items-center gap-5 my-5">
          <div className="">
            <FaMoneyBillWave className="w-6 h-6 " />
          </div>
          <div className="flex flex-col w-full">
          <div className="font-bold flex justify-start items-center text-xl w-full ">
            <FaRupeeSign /> {confirmedCar.price}
          </div>
            <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
          </div>
        </div>

        {/* Confirm Button */}
      <button
        onClick={() => handlePayment(confirmedCar) }
        className="w-full bg-green-500 text-black py-2 mt-6 rounded hover:bg-black hover:text-white duration-300 font-bold"
      >
        Make Payment
      </button>
      </div>
    </div>
  );
};

export default LookingForDriver;
