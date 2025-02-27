/* eslint-disable no-unused-vars */
import React from "react";
import AboutHero from "../components/AboutHero";
import Team from "./Team";
import Phone from "../components/Phone";
import SlidingTestimonials from "../components/SlidingTestimonials";

const About = () => {
  return (
    <div>
      <AboutHero />
      {/* <Team /> */}
      <div className=" mt-[10rem]">
        <SlidingTestimonials />
      </div>
      <div className="div mt-[8rem]">

      <Phone />
      </div>
    </div>
  );
};

export default About;
