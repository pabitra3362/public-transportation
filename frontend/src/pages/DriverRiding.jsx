import React,{ useRef, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { RiArrowUpWideFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import FinishRide from '../components/FinishRide';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";


const DriverRiding = () => {

  const [finishRide, setFinishRide] = useState(false);
  const finishRideRef = useRef(null)

  useGSAP(()=>{
    if(finishRide){
      gsap.to(finishRideRef.current,{
        transform: 'translateY(0)'
      }) 
      
    }else {
      gsap.to(finishRideRef.current,{
        transform: 'translateY(100%)'
      })
    }
  },[finishRide])


  return (
    <div className="h-screen flex justify-center items-center">
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
        <div className="h-4/5">
          <img
            className="h-full w-full object-cover"
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="map.gif"
          />
        </div>

        {/* information */}
        <div onClick={()=>setFinishRide(true)} className="h-1/5 grid items-start bg-yellow-300 ">
          <div className="flex justify-center">
            <button
              
              className="w-fit mx-auto align-middle px-10 py-2 rounded-md"
            >
              <RiArrowUpWideFill className="size-5" />
            </button>
          </div>
          <div className="flex justify-between items-center px-5">
            <p className="font-semibold text-lg">4 KM away</p>
            <button className="px-4 bg-green-500 text-black py-2 rounded hover:bg-black hover:text-white duration-300 font-bold my-2">
              Complete Ride
            </button>
          </div>
        </div>

        <div
          ref={finishRideRef}
          className="fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5 pt-1"
        >
          <FinishRide
            setFinishRide={setFinishRide}
          />
        </div>
      </div>
    </div>
  );
};

export default DriverRiding;
