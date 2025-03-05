import React, { useEffect, useState } from 'react'
import { FaRupeeSign } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { SlSpeedometer, SlNotebook  } from "react-icons/sl";
import { useSelector } from 'react-redux';

const DriverDetails = () => {

  const {driver} = useSelector(state => state.driver)
 
  return (
    <>
    <div className="flex justify-between items-center px-3 pt-0 bg-white h-20">
          <div className="flex justify-center items-center gap-4">
            <img
              className="w-10 h-10 object-cover rounded-full"
              src="https://www.shutterstock.com/image-photo/portrait-smiling-young-boy-making-260nw-436447678.jpg"
              alt=""
            />
            <h3 className="font-bold text-lg">{driver?.name}</h3>
          </div>
          <div className="grid gap-2">
            <div className="flex justify-between items-center">
              <FaRupeeSign />
              <p className="font-bold text-lg">293.15</p>
            </div>
            <div className=" text-white text-center rounded-lg bg-gradient-to-r from-black to-slate-500 ">
              Earned
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center py-7 bg-gray-100 mx-3 rounded-xl">

            <div className="flex flex-col justify-center items-center gap-1">
            <FaRegClock className="font-extrabold text-xl" />
            <p className="font-bold text-lg">10.2</p>
            <h3>Hours Online</h3>
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
            <SlSpeedometer className="font-extrabold text-xl" />
            <p className="font-bold text-lg">30 KM</p>
            <h3>Total Distance</h3>
            </div>

            <div className="flex flex-col justify-center items-center gap-1">
            <SlNotebook className="font-extrabold text-xl"  />
            <p className="font-bold text-lg">20</p>
            <h3>Total Jobs</h3>
            </div>
        </div>
    </>
  )
}

export default DriverDetails
