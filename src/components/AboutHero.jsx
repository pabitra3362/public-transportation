/* eslint-disable no-unused-vars */

import React from "react";
import Card from "./Card";

const AboutHero = () => {
  return (
    <>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            "url(https://as2.ftcdn.net/v2/jpg/09/43/24/41/1000_F_943244109_tSESbUFgllfs7JpR3fmcz2dmrWObFU6D.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Hello there</h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
      </div>

      <div className="card-section">
        <div className="">
          <h3 className="text-center py-5  text-orange-400 text-xl">
            What we offer
          </h3>
          <h1 className="text-center  text-3xl mb-5">
            We’re a Company of Talented
          </h1>
        </div>
 
      <Card />
     
      </div>
    </>
  );
};

export default AboutHero;
