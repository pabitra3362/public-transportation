import React from "react";
import { FaUser, FaRupeeSign } from "react-icons/fa";

const CarConfirmPanel = ({ confirmedCar }) => {
  const item = confirmedCar;
  return (
    <div className="flex h-32 w-full gap-7 md:gap-3 lg:gap-7 justify-start lg:justify-evenly items-center border-2 active:border-black bg-white drop-shadow-lg rounded-md px-3 cursor-pointer">
      <div className="flex justify-center items-center w-16 h-16 border-2 bg-base-100 border-gray-500 p-1 rounded-md">
        <img src={item.carImage} alt={item.carImage} />
      </div>
      <div className="leading-tight">
        <h4 className="font-bold text-lg flex justify-start items-center gap-2">
          <div>{item.carName}</div>
          <div>
            <FaUser />
          </div>
          <div>{item.capacity}</div>
        </h4>
        <p className="font-semibold text-lg">{item.duration}</p>
        <p>{item.phase}</p>
      </div>
      <div className="flex justify-start items-center font-bold">
        <FaRupeeSign />
        <p>{item.price}</p>
      </div>
    </div>
  );
};

export default CarConfirmPanel;
