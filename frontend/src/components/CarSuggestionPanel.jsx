import React from "react";
import carImage from "../assets/booking_car.png";
import { FaUser, FaRupeeSign } from "react-icons/fa";

const tempArray = [
  {
    carImage,
    carName: "UberGo",
    capacity: 4,
    duration: "2 mins away",
    phase: "Affordable, compact rides",
    price: "193.20",
  },
  {
    carImage,
    carName: "UberGo",
    capacity: 3,
    duration: "2 mins away",
    phase: "Affordable, compact rides",
    price: "193.20",
  },
  {
    carImage,
    carName: "UberGo",
    capacity: 6,
    duration: "2 mins away",
    phase: "Affordable, compact rides",
    price: "193.20",
  },
  {
    carImage,
    carName: "UberGo",
    capacity: 6,
    duration: "2 mins away",
    phase: "Affordable, compact rides",
    price: "193.20",
  },
  {
    carImage,
    carName: "UberGo",
    capacity: 8,
    duration: "2 mins away",
    phase: "Affordable, compact rides",
    price: "193.20",
  },
  {
    carImage,
    carName: "UberGo",
    capacity: 2,
    duration: "2 mins away",
    phase: "Affordable, compact rides",
    price: "193.20",
  },
  {
    carImage,
    carName: "UberGo",
    capacity: 5,
    duration: "2 mins away",
    phase: "Affordable, compact rides",
    price: "193.20",
  },
  {
    carImage,
    carName: "UberGo",
    capacity: 7,
    duration: "2 mins away",
    phase: "Affordable, compact rides",
    price: "193.20",
  },
];

const CarSuggestionPanel = ({ setCarConfirmPanel, setConfirmedCar }) => {
  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-bold pl-3">Choose Vehicle</h3>
      {tempArray.map((item, index) => (
        <div
          key={index}
          onClick={()=>{
            setConfirmedCar(item)
            setCarConfirmPanel(true)
          }}
          className="flex h-32 w-full gap-7 md:gap-3 lg:gap-7 justify-start lg:justify-evenly items-center border-2 active:border-black bg-white drop-shadow-lg rounded-md px-3 cursor-pointer"
        >
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
      ))}
    </div>
  );
};

export default CarSuggestionPanel;
