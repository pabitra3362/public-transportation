import React, { useRef, useState } from "react";
import Hero from "../components/Hero";
import HomeForm from "../components/HomeForm";

const Home = () => {
  const ref=useRef(null)
  
  return (
    <div>
      {/* Hero section */}
      <Hero />

      {/* Booking form */}
      <HomeForm ref2={ref} />
      
    </div>
  );
};

export default Home;
