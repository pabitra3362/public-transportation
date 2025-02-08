import React, { useRef } from "react";
import driver from "../assets/drunk-driver.png";
import whyDrive from '../assets/why-drive-with-us.jpg';
import { Link } from "react-router-dom";
import { RiCalendarScheduleLine, RiUserCommunityLine } from "react-icons/ri";
import { FaMoneyBillAlt } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { FcDataProtection } from "react-icons/fc";
import { HiMiniChatBubbleLeftRight } from "react-icons/hi2";
import { Accordion } from "flowbite-react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);


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

const safetyCard = [
    {
        icon: <FcDataProtection className="size-16" />,
        heading: "Protection on every trip",
        description: "Our platform ensures a safe and reliable experience for all drivers, providing a secure environment to earn a living with in-app support and emergency assistance, protecting you on every trip."
    },
    {
        icon: <HiMiniChatBubbleLeftRight className="size-16" />,
        heading: "Get Help whenever you need",
        description: "Get support from our dedicated team whenever you need it, ensuring you have a smooth and stress-free experience on the road."
    },
    {
        icon: <RiUserCommunityLine className="size-16" />,
        heading: "Community Guidelines",
        description: "Our community guidelines are designed to ensure a safe and respectful experience for all drivers, providing a clear understanding of what is expected of you on the road and how to maintain a positive and professional attitude."
    },
]

const Drive = () => {

  const ref = useRef(null)

  useGSAP(()=>{
    gsap.from('.last-button',{
      y:500,
      duration:1,
      scrollTrigger:{
        trigger:ref.current,
        scroller:"body",
        start:'top 10%',
        end:'top 0%',
        scrub:2
        
      }
    })
  })
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
      <div ref={ref} className="py-10 lg:py-20 flex flex-col gap-14 w-[90%] lg:w-[70%] mx-auto">
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



      {/* fleet join */}
      <div className="w-full md:w-[90%] lg:w-[70%] flex flex-col md:flex-row justify-center items-center md:justify-between md:items-start lg:justify-around gap-12 py-8 lg:py-16 mx-auto">
        <div className="w-80 grid gap-4 lg:w-[43%]">
          <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_388,w_690/v1535744030/assets/7e/4c2f7e-da89-4c1e-a8cf-1b56172c6e5b/original/D_Fleet2x.png" alt="" />
          <h3 className="font-semibold text-xl">Join a fleet</h3>
          <p className="">Join a fleet and start driving with a team. Get access to more opportunities, support, and resources to help you succeed on the road.</p>
        </div>
        
        <div className="w-80 grid gap-4 lg:w-[43%]">
          <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_388,w_690/v1535753709/assets/ec/8183dc-ffee-468a-9ee8-175bd1fb1f55/original/D_Fleet_22x.png" alt="" />
          <h3 className="font-semibold text-xl">Become a fleet partner</h3>
          <p className="">Partner with us to grow your fleet and unlock new opportunities for your drivers. Get access to exclusive resources, support, and tools to help you succeed.</p>
        </div>
      </div>




      {/* Safety on the road */}
      <div className="py-10 lg:py-20 flex flex-col gap-7 lg:gap-14 w-[90%] lg:w-[70%] mx-auto">
        <div className="top">
            <h2 className="font-mono font-bold text-3xl lg:text-4xl ">Why drive with us</h2>
        </div>
        <p className="text-lg font-semibold">Your safety drive us to continuously raise the bar.</p>
        <div className="bottom flex flex-col lg:flex-row justify-start items-start lg:justify-around gap-10">
            {
                safetyCard.map((card,index)=>(
                    <div key={index} className="grid gap-4 w-80 md:w-full lg:w-80">
                        <div className='icon'>{card.icon}</div>
                        <h3 className="heading text-xl font-semibold">{card.heading}</h3>
                        <p className="description">{card.description}</p>
                    </div>
                ))
            }
        </div>
      </div>




      {/* FAQ */}
      <div className="w-[90%] mx-auto flex flex-col justify-center items-center gap-9 md:w-[90%] md:items-start lg:w-[70%] py-10">
      <h1 className="font-mono font-bold text-3xl ">Frequently Asked Questions</h1>
      <Accordion className="w-[90%] md:w-[80%] lg:w-[100%]">
      <Accordion.Panel>
        <Accordion.Title className="font-bold text-lg">Can i drive with Safar in my city?</Accordion.Title>
        <Accordion.Content>
          <p className="text-wrap">Safar is available in all cities of india. so, yes you can drive with Safar in your city.</p>
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="font-bold text-lg">What are the requirements to drive with Safar?I</Accordion.Title>
        <Accordion.Content>
        You must meet the minimum age to drive in your city, have an eligible mode of transportation, and submit required documents, including a valid driver&apos;s license.
        </Accordion.Content>
      </Accordion.Panel>
      <Accordion.Panel>
        <Accordion.Title className="font-bold text-lg">Do I need my own car?</Accordion.Title>
        <Accordion.Content>
        If you want to drive with Safar but need a car, you can get a car from one of our vehicle partners or from a fleet partner in select markets. Please note that vehicle options may vary by city.
        </Accordion.Content>
      </Accordion.Panel>
    </Accordion>
      </div>


      {/* button */}
       <Link to={'/driver-signup'}>
       <button className="last-button w-[95vw] bg-black text-white font-bold text-xl py-4 rounded-lg fixed bottom-3 mx-auto left-[50%] -translate-x-[50%] z-50 ">Sign up</button></Link>
    </div>
  );
};

export default Drive;
