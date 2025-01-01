import React, { useRef, useState } from "react";
import Hero from "../components/Hero";
import HomeForm from "../components/HomeForm";
import { MdEmojiTransportation, MdOutlineMiscellaneousServices, MdHomeRepairService } from "react-icons/md";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaTaxi, FaGlobeAmericas } from "react-icons/fa";
import HomeCard from "../components/HomeCard";
import { motion } from "framer-motion";
import homeBg from '../assets/homeBg.jpg'
import driverIcon from '../assets/driverIcon.png'
import Phone from '../components/Phone'
import SlidingTestimonials from "../components/SlidingTestimonials";
import ContactForm from "../components/ContactForm";

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

  const FeatureCardArray = [
    {
      icon: <MdOutlineMiscellaneousServices className="size-16" />,
      title: "100% Pleasure",
      description:
        "Experience smooth, comfortable rides with our 100% pleasure guarantee—your satisfaction is our top priority.",
    },
    {
      icon: <FaGlobeAmericas className="size-16" />,
      title: "Lots of locations",
      description:
        "Access a wide range of locations with our extensive network, ensuring convenience wherever you go.",
    },
    {
      icon: <FaTaxi className="size-16" />,
      title: "Luxury Cars",
      description:
        "Travel in style and comfort with our fleet of premium, luxury cars for an unforgettable ride.",
    },
    {
      icon: <MdHomeRepairService  className="size-16" />,
      title: "Additional Services",
      description:
        "Enjoy extra conveniences like airport transfers, priority booking, and personalized assistance for a seamless journey.",
    },
  ];

  const planCardArray = [
    {
      "title": "Free Cab On Friday, 70% Cashback",
      "phase": "On Luxury Cab Bookings.",
      "price": 48
    },
    {
      "title": "Weekend Special: 50% Off on All Rides",
      "phase": "Offer valid for both Regular and Premium Cabs.",
      "price": 25
    },
    {
      "title": "Get 20% Off on Your First Ride",
      "phase": "Welcome offer for new users only.",
      "price": 15
    },
    {
      "title": "Book a Ride, Earn 100 Loyalty Points",
      "phase": "Redeem points for discounts on future bookings.",
      "price": 30
    },
    {
      "title": "Free Festive Offer",
      "phase": "Share your referral code and enjoy the perks.",
      "price": 0
    },
    {
      "title": "Surge Pricing Alert: 10% Off",
      "phase": "Book during peak hours to enjoy discounts.",
      "price": 35
    }
  ]


  

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
        <div className="grid items-center gap-5 md:w-[80vw] md:grid-cols-2 lg:flex lg:w-[70vw] md:justify-center lg:justify-between lg:gap-10">
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

      {/* Reliable Taxi Service */}
      <div className="py-10 lg:py-20 bg-slate-200">
      <div className="relative w-full h-[50vh] border-2 border-cyan-500">
          <img className="absolute w-full h-full z-10 brightness-[50%]" src={homeBg} alt={homeBg} />
          <div className="absolute w-full h-full z-20 bg-[#cfaf21] opacity-80 grid justify-items-center content-center items-center gap-6 md:gap-10">
              <div className="w-36 h-36 rounded-full flex justify-center items-center bg-white">
                <img src={driverIcon} alt={driverIcon} />
              </div>
              <p className="text-white text-2xl md:text-4xl font-bold">24/7 Reliable Taxi Service</p>
              <p className="text-white font-custom text-xl md:text-2xl text-center">Ride in Comfort and Convenience with Our Taxi Services</p>
          </div>
      </div>
      </div>


      {/* Main Features */}
      <div className="w-full bg-slate-200  grid justify-items-center items-center gap-5 lg:gap-10 py-10 lg:py-24">
        <h2 className="uppercase tracking-[0.25rem] text-yellow-400 font-bold text-lg lg:text-xl">
          Main Features
        </h2>
        <p className="font-bold text-4xl lg:text-5xl text-center font-custom">
          Our Advantages
        </p>
        <div className="grid items-center gap-5 md:w-[80vw] md:grid-cols-2 lg:flex md:justify-center lg:justify-center lg:gap-10">
          {FeatureCardArray.map((item, index) => (
            <HomeCard
              key={index}
              icon={item.icon}
              title={item.title}
              description={item.description}
              gridAlign="justify-items-start"
              textAlign="text-start"
            />
          ))}
        </div>
      </div>

      
      {/* Call Us To Book A Taxi */}
      <div>
        <Phone />
      </div>

      
      {/* Feedback */}
      <div>
        <SlidingTestimonials />
      </div>

      {/* Contact Us */}
      <div className=" py-10 lg:py-20 grid gap-10 lg:gap-10 md:flex md:justify-center items-center md:gap-2">
        <div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.815203677499!2d72.83883427597932!3d21.15975128326525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04e2fe47b1ee1%3A0x504c1d61b4e6e422!2sudhna%20college!5e0!3m2!1sen!2sin!4v1735398344280!5m2!1sen!2sin"  className="border-0 w-full md:w-96 lg:w-[45vw] mx-auto h-[70vh] md:h-[55vh] lg:h-[65vh] rounded-lg" allowFullScreen={true}></iframe>
        </div>
        <ContactForm />
      </div>
    </div>
  );
};

export default Home;
