import React, { useRef, useState } from "react";
import Hero from "../components/Hero";
import HomeForm from "../components/HomeForm";
import { MdEmojiTransportation } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaTaxi } from "react-icons/fa";
import HomeCard from "../components/HomeCard";
import { motion } from "framer-motion";

const Home = () => {
  const homeCardArray = [
    {
      icon: <MdEmojiTransportation className="size-24 text-yellow-400" />,
      title: "Fast And Easy Transport",
      description:
        "Experience fast, easy, and reliable transport with our taxi booking service, ensuring comfort and convenience anytime, anywhere.",
    },
    {
      icon: <BsFillBuildingsFill className="size-24 text-yellow-400" />,
      title: "Move Anywhere You Want",
      description:
        "Move anywhere you want with our seamless taxi booking service, offering flexibility, comfort, and reliability for every journey.",
    },
    {
      icon: <FaTaxi className="size-24 text-yellow-400" />,
      title: "Your Ride, Your Way",
      description:
        "Customize your travel experience with our taxi service, offering safe, affordable, and convenient rides tailored to your needs.",
    },
  ];

  const planCardArray = [
    {
      title: "How to get discount with mobile application",
      phase: "Remember when did you lose it.",
      price: 30,
    },
    {
      title: "Get the Best Price Of Taxi In Your Place",
      phase: "We will bring you quickly and comfortably in your place.",
      price: 54,
    },
    {
      title: "Get the Best Price Of Taxi In Your Available Area",
      phase: "Come to our storage and pick your item",
      price: 20,
    },
    {
      title: "Taxi drivers for hire in your city",
      phase: "Come to our storage and pick your item.",
      price: 40,
    },
    {
      title: "Get the Best Price Of Taxi In Your Place",
      phase: "New bigger & better F.A.Q. section.",
      price: 15,
    },
    {
      title: "Choose Advertising Position",
      phase: "Come to our storage and pick your item.",
      price: 55,
    },
  ];

  const PlanCard = ({ title, phase, price }) => {
    return (
      <motion.div 
      initial={{
        rotate: 0,
      }}
      whileHover={{
        rotate:[0, -2, 2, -2, 2, 0],
      }}
      whileInView={{
        opacity: [0,1],
        transition: {duration: 1}
      }}
      className="grid h-48 md:h-32 hover:bg-yellow-400 group bg-white md:bg-transparent lg:bg-white mx-auto md:flex md:justify-between items-center gap-5 px-3 md:px-6 py-2 w-80 md:w-screen lg:w-[42vw] my-3 rounded-lg">
        <div className="info grid gap-4 text-black group-hover:text-white">
          <p className="title text-lg md:text-xl font-bold ">
            {title}
          </p>
          <p className="phase md:text-lg">{phase}</p>
        </div>
        <div className="price text-yellow-400 group-hover:text-white text-lg">
          <span className="text-2xl font-bold">Rs {price}</span>/km
        </div>
      </motion.div>
    );
  };



  return (
    <div>
      {/* Hero section */}
      <Hero />

      {/* Booking form */}
      <HomeForm />

      {/* what we offer */}
      <div className="w-full bg-slate-200  grid justify-items-center items-center gap-5 lg:gap-10 py-10 lg:py-24">
        <h2 className="uppercase tracking-[0.25rem] text-yellow-400 font-bold text-lg lg:text-2xl">
          what we offer
        </h2>
        <p className="font-bold text-3xl text-center font-custom">
          We&apos;re a Company Of Talented
        </p>
        <div className="grid items-center gap-5 md:w-[80vw] md:grid-cols-2 lg:flex md:justify-center lg:justify-center lg:gap-10">
          {homeCardArray.map((item, index) => (
            <HomeCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="bg-slate-200 py-16 lg:pb-24">
        <p className="text-yellow-400 text-center text-2xl font-bold py-3">Let&apos;s Go With Us</p>
        <h2 className="text-3xl lg:text-5xl text-center tracking-wider font-bold font-custom my-3 lg:my-5">
          Our Best Plans
        </h2>
        <div className="grid justify-items-center items-center lg:grid-cols-2 lg:w-[90vw] mx-auto my-5 lg:my-10">
          {planCardArray.map((item, index) => (
            <PlanCard
              key={index}
              title={item.title}
              phase={item.phase}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
