import React from "react";
import { FaMoneyBillWave, FaRupeeSign } from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { RiArrowDownWideFill } from "react-icons/ri";

const RidePopup = ({ setRidePopupPanel, setConfirmRidePopupPanel, ride, confirmRide }) => {
  return (
    <div className="py-2">
      <div className="flex justify-center">
        <button
          onClick={() => setRidePopupPanel(false)}
          className="w-fit h-10 mx-auto align-middle px-10 py-2 rounded-md"
        >
          <RiArrowDownWideFill className="size-5" />
        </button>
      </div>
      {/* header */}
      <h1 className="text-2xl font-semibold text-start mt-3 mb-4">
        New Ride Available!
      </h1>
      {/* <hr className="w-full bg-black h-[3px] opacity-20" /> */}

      <div className="flex justify-between items-center py-4 rounded-lg bg-yellow-400 px-2">
        <div className="flex items-center gap-3">
          <img
            className="h-8 w-8 rounded-full object-cover"
            src="https://www.shutterstock.com/image-photo/portrait-smiling-young-girl-making-260nw-436447678.jpg"
            alt="driver-image"
          />
          <h2 className="font-bold text-lg capitalize">{ride?.user.name}</h2>
        </div>
        <div className="font-bold text-lg">2.2 KM</div>
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

      <div className="flex flex-row-reverse justify-between items-center px-3">
        {/* Confirm Button */}
        <button
          onClick={() => {
            setRidePopupPanel(false);
            setConfirmRidePopupPanel(true);
            confirmRide()
          }}
          className="px-8 bg-yellow-300 text-black py-2 rounded hover:bg-black hover:text-white duration-300 font-bold my-2"
        >
          Accept
        </button>

        {/* ignore button */}
        <button
          onClick={() => setRidePopupPanel(false)}
          className="px-8 bg-gray-500 text-black py-2 rounded hover:bg-black hover:text-white duration-300 font-bold my-2"
        >
          Ignore
        </button>
      </div>
    </div>
  );
};

export default RidePopup;
