import React, { useEffect, useContext } from "react";
import { FaMoneyBillWave, FaRupeeSign } from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";

const WaitingForDriver = ({ confirmedCar, ride }) => {

    const journeyDetails = useSelector(state=> state.car);
    const { user } = useSelector(state => state.user);
    const { sendMessage } = useContext(SocketContext);

    useEffect(()=>{
      const updateLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          sendMessage("update-location-user", {
            userId: user?._id,
            location:{
              ltd:latitude,
              lng:longitude,
            }
          });
        });
      };
  
      const locationInterval = setInterval(updateLocation, 10000)
  
  
      return () => clearInterval(locationInterval)
    },[user])
  return (
    <div className="py-2">
          {/* header */}
          <h1 className="text-2xl font-semibold text-center mt-3 mb-2">
            Waiting For Driver !!!
          </h1>
          <hr className="w-full bg-black h-[3px] opacity-20" />
    
          {/* Car Image */}
          <div className="flex justify-between items-center my-7 px-1 lg:px-3">
            <img
              className="h-16"
              src={confirmedCar.image}
              alt={confirmedCar.image}
            />

            <div className="text-right">
                <h2 className="capitalize font-semibold text-lg">{ride?.captain.name}</h2>
                <p className="font-bold text-sm">{ride?.captain.vehicle.plate}</p>
                <h1 className="font-bold">OTP: {ride?.otp}</h1>
                <p className="font-bold text-sm">Phone: {ride?.captain?.phone}</p>
            </div>
          </div>
    
          <hr className="w-full bg-black h-[3px] opacity-20" />
    
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
              <div className="flex flex-col w-full">
              <div className="font-bold flex justify-start items-center text-xl w-full ">
                <FaRupeeSign /> {ride?.fare}
              </div>
                <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
              </div>
            </div>
    
            
          </div>
        </div>
  )
}

export default WaitingForDriver