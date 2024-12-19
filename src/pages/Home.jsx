import React, { useRef, useState } from "react";
import Hero from "../components/Hero";
import HomeForm from "../components/HomeForm";

const Home = () => {
  
  return (
    <div>
      {/* Hero section */}
      <Hero />

      {/* Booking form */}
      <HomeForm />
      
    </div>
  );
};

export default Home;
