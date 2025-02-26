import React from "react";
import { FaMoneyBillWave, FaRupeeSign } from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { useSelector } from "react-redux";
import { createRide } from "../services/ride/ride.service";

const CarConfirmPanel = ({ confirmedCar, setLookingDriverPanel, setCarConfirmPanel }) => {
  const journeyDetails = useSelector((state) => state.car);


  const handleClick = async (confirmedCar) => {
   
    setCarConfirmPanel(false)
    setLookingDriverPanel(true)


  }

  return (
    <div className="py-2">
      {/* header */}
      <h1 className="text-2xl font-semibold text-center mt-3 mb-2">
        Confirm Your Ride
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
          <div className="font-bold flex justify-start items-center w-full ">
            <FaRupeeSign />
            <p className="text-xl">{confirmedCar.price}</p>
          </div>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => handleClick(confirmedCar)}
        className="w-full bg-yellow-300 text-black py-2 rounded hover:bg-black hover:text-white duration-300 font-bold"
      >
        Confirm
      </button>
    </div>
  );
};

export default CarConfirmPanel;
