import React from "react";
import uberCar from '../assets/uberCar.jpg'
import uberMoto from '../assets/uberMoto.jpg'
import uberAuto from '../assets/uberAuto.jpg'
import { FaUser, FaRupeeSign } from "react-icons/fa";
import { createRide } from "../services/ride/ride.service";
import { useDispatch, useSelector } from "react-redux";
import { setImageOfCar } from '../features/car/confirmedCarSlice';



const CarSuggestionPanel = ({ setCarConfirmPanel, setConfirmedCar, fare }) => {
  const dispatch = useDispatch()

  const journeyDetails = useSelector(state=>state.car)

  
  const tempArray = [
    {
      image: uberCar,
      carName: "UberGo",
      capacity: 4,
      duration: "2 mins away",
      phase: "Affordable, compact rides",
      price: fare.car,
      vehicleType: 'car'
    },
    {
      image: uberMoto,
      carName: "UberGo",
      capacity: 2,
      duration: "2 mins away",
      phase: "Affordable, compact rides",
      price: fare.moto,
      vehicleType: 'moto'
    },
    {
      image: uberAuto,
      carName: "UberGo",
      capacity: 4,
      duration: "2 mins away",
      phase: "Affordable, compact rides",
      price: fare.auto,
      vehicleType: 'auto'
    }
    
  ];


  const handleClick = async (item) => {
    
    setConfirmedCar(item)
    dispatch(setImageOfCar(item.image))
    setCarConfirmPanel(true)

  }
  
  return (
    <div className="grid gap-4">
      <h3 className="text-lg font-bold pl-3">Choose Vehicle</h3>
      {tempArray.map((item, index) => (
        <div
          key={index}
          onClick={()=> handleClick(item)}
          className="flex h-32 w-full gap-7 md:gap-3 lg:gap-7 justify-start md:justify-around lg:justify-evenly items-center border-2 active:border-black bg-white drop-shadow-lg rounded-md px-3 cursor-pointer"
        >
          <div className="flex justify-center items-center w-16 h-16 bg-base-100  rounded-md">
            <img className="scale-125" src={item.image} alt={item.image} />
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
