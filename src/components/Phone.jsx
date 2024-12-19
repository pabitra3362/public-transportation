/* eslint-disable no-unused-vars */
import React from 'react'

const Phone = () => {
  return (
    <div className="cus  h-screen flex justify-center gap-28 ">
    <div className="photo  w-1/3">
      <div className="relative w-[500px]">
        {/* Yellow Border */}
        <div className="absolute  -bottom-9 -right-3 w-full h-[578px] border-[29px] border-yellow-300"></div>

        {/* Image */}
        <img
          src="https://pickme-html.pixelsigns.art/img/action_img.jpg"
          alt="Two women hailing a cab with shopping bags"
          className="relative top-9 left-10 z-10 w-[450px] rounded-lg h-[550px] object-cover"
        />
      </div>
    </div>
    <div className="text  w-[550px] flex flex-col p-3 mt-40 ">
       <h1 className="text-4xl font-bold  ">Call us to Book a Taxi</h1>
       <h2 className="text-yellow-300 text-7xl font-bold mt-5">+91 123
       4567890</h2>
       <p className="mt-7 text-2xl">The operator will call back immediately and report the cost of travel</p>
    </div>
  </div>
  )
}

export default Phone
