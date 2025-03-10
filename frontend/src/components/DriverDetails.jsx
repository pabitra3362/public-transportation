import React, { useEffect, useState } from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { SlSpeedometer, SlNotebook  } from "react-icons/sl";
import { useSelector } from 'react-redux';

const DriverDetails = () => {

  const {driver} = useSelector(state => state.driver)

  function decimalToClock(decimal) {
    let hours = Math.floor(decimal); 
    let minutes = Math.round((decimal - hours) * 60); 
    return `${hours}:${minutes.toString().padStart(2, '0')}`; 
  }
 
  return (
    <>
    <div className="flex justify-between items-center px-3 pt-0 bg-white h-20">
          <div className="flex justify-center items-center gap-4">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_ar6WjHrFQVRAlywciRUAbIn1iqVQGdyJYQ&s"
              alt=""
            />
            <h3 className="font-bold text-lg">{driver?.name}</h3>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <FaRupeeSign />
              <p className="font-bold text-lg">{driver?.earning}</p>
            </div>
            <div className=" text-white text-center rounded-lg bg-gradient-to-r from-black to-slate-500 ">
              Earned
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center py-7 bg-gray-100 mx-3 rounded-xl">

            <div className="flex flex-col justify-center items-center gap-1">
            <FaRegClock className="font-extrabold text-xl" />
            <p className="font-bold text-lg">{decimalToClock(driver?.totalHours)}</p>
            <h3>Hours Online</h3>
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
            <SlSpeedometer className="font-extrabold text-xl" />
            <p className="font-bold text-lg">{driver?.totalDistance} KM</p>
            <h3>Total Distance</h3>
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
            <SlNotebook className="font-extrabold text-xl"  />
            <p className="font-bold text-lg">{driver?.totalJobs}</p>
            <h3>Total Jobs</h3>
            </div>
        </div>
    </>
  )
}

export default DriverDetails
