/* eslint-disable no-unused-vars */
import React from 'react';

const Phone = () => {
  return (
    <div className="cus h-screen flex flex-col lg:flex-row justify-center lg:gap-28 gap-10 items-center p-5">
      {/* Image Section */}
      <div className="photo w-full lg:w-1/3 flex justify-center">
        <div className="relative w-full max-w-[500px]">
          {/* Yellow Border */}
          <div className="absolute -bottom-9 rounded-lg -right-3 w-full h-full border-[15px] sm:border-[25px] border-yellow-300"></div>

          {/* Image */}
          <img
            src="https://pickme-html.pixelsigns.art/img/action_img.jpg"
            alt="Two women hailing a cab with shopping bags"
            className="relative top-5 left-5 w-full rounded-lg object-cover h-auto max-h-[550px]"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="text w-full lg:w-[550px] flex flex-col items-center lg:items-start text-center lg:text-left mt-5 lg:mt-40">
        <h1 className="text-3xl md:text-4xl font-bold">Call us to Book a Taxi</h1>
        <h2 className="text-yellow-300 text-5xl md:text-7xl font-bold mt-5">
          +91 123 4567890
        </h2>
        <p className="mt-7 text-lg md:text-2xl">
          The operator will call back immediately and report the cost of travel.
        </p>
      </div>
    </div>
  );
};

export default Phone;
