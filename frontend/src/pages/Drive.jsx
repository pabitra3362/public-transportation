import React from "react";
import driver from "../assets/drunk-driver.png";
import whyDrive from '../assets/why-drive-with-us.jpg';
import { Link } from "react-router-dom";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";


const driveCard = [
    {
        icon: <RiCalendarScheduleLine className="size-8" />,
        heading: "Set your own hours",
        description: "Set your own hours and create a schedule that works for you, allowing you to balance your work and personal life with ease.",
    },
    {
        icon: <FaMoneyBillAlt className="size-8" />,
        heading: "Get paid fast",
        description: "Get paid fast with our platform, which ensures timely and secure transactions, allowing you to focus on driving and earning a living without any financial worries.",
    },
    {
        icon: <MdSupportAgent className="size-8" />,
        heading: "Get support at every turn",
        description: "Our platform ensures a safe and reliable experience for all drivers, providing a secure environment to earn a living with in-app support and emergency assistance.",
    },
]

const Drive = () => {
  return (
    <div className="drive">
      {/* Hero section of drive page */}
      <div className="w-full bg-slate-900">
        <div className="drive-hero w-full md:w-[90vw] lg:w-[70vw] mx-auto py-12 md:px-10 lg:px-0 bg-slate-900 text-white flex justify-center lg:justify-around items-center">
          {/* left part of hero section */}
          <div className="left flex flex-col justify-center items-start gap-4">
            <h2 className="text-6xl md:text-4xl lg:text-6xl w-80 font-custom">
              Drive when you want, make what you need
            </h2>

            <h3 className="text-2xl md:text-xl lg:text-2xl">
              Earn on your own schedule
            </h3>

            <div className="flex flex-col lg:flex-row lg:gap-5 lg:items-center">
              <Link to={"/driver-signup"}>
                <button className="px-10 md:px-8 lg:px-10 font-bold py-2 rounded-md  bg-white text-black">
                  Get Started
                </button>
              </Link>
              <div className="mt-3 lg:mt-0">
                <Link
                  to={"/driver-login"}
                  className="underline underline-offset-8"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:block lg:block">
            <img className="w-[550px]" src={driver} alt="driver" />
          </div>
        </div>
      </div>




    {/* why drive with us */}
      <div className="py-10 lg:py-20 flex flex-col gap-14 w-[90%] lg:w-[70%] mx-auto">
        <div className="top">
            <h2 className="font-mono font-bold text-3xl">Why drive with us</h2>
        </div>
        <div className="middle flex justify-start items-center lg:justify-center">
            <img className="w-full lg:w-[45vw]" src={whyDrive} alt={whyDrive} />
        </div>
        <div className="bottom flex flex-col lg:flex-row justify-start items-start lg:justify-around gap-10">
            {
                driveCard.map((card,index)=>(
                    <div key={index} className="grid gap-4 w-80 md:w-full lg:w-80">
                        <div className='icon'>{card.icon}</div>
                        <h3 className="heading text-xl font-semibold">{card.heading}</h3>
                        <p className="description">{card.description}</p>
                    </div>
                ))
            }
        </div>
      </div>
    </div>
  );
};

export default Drive;
