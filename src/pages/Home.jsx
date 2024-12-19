import React, { useRef, useState } from "react";
import Hero from "../components/Hero";
import HomeForm from "../components/HomeForm";
import { MdEmojiTransportation } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaTaxi } from 'react-icons/fa';
import HomeCard from "../components/HomeCard";

const Home = () => {

  const homeCardArray=[
    {
      icon:<MdEmojiTransportation className="size-24 text-yellow-400"/>,
      title:"Fast And Easy Transport",
      description:"Experience fast, easy, and reliable transport with our taxi booking service, ensuring comfort and convenience anytime, anywhere.",
    },
    {
      icon:<BsFillBuildingsFill className="size-24 text-yellow-400"/>,
      title:"Move Anywhere You Want",
      description:"Move anywhere you want with our seamless taxi booking service, offering flexibility, comfort, and reliability for every journey.",
    },
    {
      icon:<FaTaxi className="size-24 text-yellow-400"/>,
      title:"Your Ride, Your Way",
      description:"Customize your travel experience with our taxi service, offering safe, affordable, and convenient rides tailored to your needs.",
    },
  ]
  
  return (
    <div>
      {/* Hero section */}
      <Hero />

      {/* Booking form */}
      <HomeForm />

      {/* what we offer */}
      <div className="w-full bg-slate-200  grid justify-items-center items-center gap-5 lg:gap-10 py-10 lg:py-24">
        <h2 className="uppercase tracking-[0.25rem] text-yellow-400 font-bold text-lg lg:text-2xl">what we offer</h2>
        <p className="font-bold text-3xl text-center font-custom">We&apos;re a Company Of Talented</p>
        <div className="grid items-center gap-5 md:w-[80vw] md:grid-cols-2 lg:flex md:justify-center lg:justify-center lg:gap-10">
          {
            homeCardArray.map((item,index)=>(
              <HomeCard key={index} icon={item.icon} title={item.title} description={item.description} />
            ))
          }
        </div>
      </div>
      
    </div>
  );
};

export default Home;
