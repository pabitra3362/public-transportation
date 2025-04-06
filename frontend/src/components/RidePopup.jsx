import React, { useEffect,useState } from "react";
import { FaMoneyBillWave, FaRupeeSign } from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { RiArrowDownWideFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { getDistanceAndTime } from "../services/map/map.service";

const RidePopup = ({ setRidePopupPanel, setConfirmRidePopupPanel, ride, confirmRide }) => {
  const { driver } = useSelector(state => state.driver )
  const [ distanceTime , setDistanceTime ] = useState(null);

  useEffect(() => {
    async function callMe (){
      try {
        const response =  await getDistanceAndTime({
          pickup: ride?.pickup,
          destination: ride?.destination
        });
  
        if(response){
          const distance = response.distance.value / 1000;
          setDistanceTime(distance)
        }else{
          setDistanceTime(null)
        }
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      }
    }


    callMe();
  },[ride])
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
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ar6WjHrFQVRAlywciRUAbIn1iqVQGdyJYQ&s"
            alt="driver-image"
          />
          <h2 className="font-bold text-lg capitalize">{ride?.user.name}</h2>
        </div>
        <div className="font-bold text-lg">{distanceTime} KM</div>
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
