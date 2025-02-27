/* eslint-disable no-unused-vars */

import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Card from "./Card";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  useEffect(() => {
    gsap.to(".hero", {
      backgroundPosition: "50% 100%", // Adjust as needed for desired effect
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://as2.ftcdn.net/v2/jpg/09/43/24/41/1000_F_943244109_tSESbUFgllfs7JpR3fmcz2dmrWObFU6D.jpg)",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center px-5 md:px-10 lg:px-20">
          <div className="mx-auto">
            <h1 className="title mb-5 text-4xl md:text-5xl font-bold w-[70%] mx-auto">
              Safar: Your Journey, Our Priority
            </h1>
            <p className="pera mb-5 w-[70%] mx-auto text-base md:text-lg">
              Safar is a reliable and user-friendly cab booking platform
              designed to make your travel experience hassle-free. Whether you
              need a ride for work or leisure, Safar offers fast, safe, and
              affordable transportation options, ensuring comfort and
              convenience every time.
            </p>
          </div>
        </div>
      </div>

      <div className="card-section">
        <div className="text-center">
          <h3 className="text-yellow-300 text-xl md:text-3xl  py-5 mt-[3.5rem]">
            What we offer
          </h3>
          <h1 className="text-center text-3xl mt-[1.5rem] mb-5">
            We&apos;re a Company of Talented
          </h1>
        </div>

        <div className=" ">
          <Card />
        </div>
      </div>
    </>
  );
};

export default AboutHero;
