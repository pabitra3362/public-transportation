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
      <Team />
      <div className="mt-40 mb-16 p-20">
       <SlidingTestimonials  />
      </div>
      <Phone />
    </div>
  );
};

export default About;
