import React from 'react'
import { MdOutlineLogout } from "react-icons/md";
import { Link } from 'react-router-dom';

const DriverRiding = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="h-screen lg:h-[70vh] w-full lg:w-[70%] lg:my-12 relative lg:rounded-2xl lg:overflow-hidden lg:hover:shadow-2xl lg:hover:-translate-y-8 duration-300">
        <div className=" flex justify-between items-center w-full absolute top-3 px-4">
          <h1 className="bg-transparent text-black tracking-[0.25rem] w-fit font-custom text-2xl ">
            Safar
          </h1>
          <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center">
            <Link to={"/driver-home"}>
              <MdOutlineLogout />
            </Link>
          </div>
        </div>

        {/* image */}
        <div className="h-3/5">
          <img
            className="h-full w-full object-cover "
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="map.gif"
          />
        </div>

        {/* information */}
        <div className="h-2/5 grid items-start bg-yellow-300">
          
        </div>

        
      </div>
    </div>
  )
}

export default DriverRiding
