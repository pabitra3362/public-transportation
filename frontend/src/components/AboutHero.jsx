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
          <div className="max-w-md">
            <h1 className="mb-5 text-4xl md:text-5xl font-bold">Hello there</h1>
            <p className="mb-5 text-base md:text-lg">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>

      <div className="card-section">
        <div className="text-center">
          <h3 className="text-orange-400 text-xl md:text-2xl py-5">
            What we offer
          </h3>
          <h1 className="text-center  text-3xl mb-5">
            We&apos;re a Company of Talented
          </h1>
        </div>

        <div className="">
          <Card />
          
        </div>
      </div>
    </>
  );
};

export default AboutHero;
