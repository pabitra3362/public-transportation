import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import { FaMoneyBillWave, FaRupeeSign } from "react-icons/fa";
import { GiJourney } from "react-icons/gi";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";
import LiveDirection from "../components/LiveDirection";
import { loadStripe } from "@stripe/stripe-js";
import config from "../config/config";
import axios from "axios";
import { getUserToken } from "../utils/token";

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride || localStorage.getItem('ride');
  const navigate = useNavigate();
  const { receiveMessage } = useContext(SocketContext);
  const [car, setCar] = useState(useSelector((state) => state.car))
  const token = getUserToken();
  const sessionId = sessionStorage.getItem('sessionId')

  receiveMessage("ride-ended", () => {
    navigate("/");
    window.scrollTo(0, 0);
  });


  useEffect(()=>{
    if(ride){
      localStorage.setItem('ride',ride)
    }
    if(car.name !== null){
      localStorage.setItem('car',JSON.stringify(car))
    }else{
      setCar(JSON.parse(localStorage.getItem('car')) || {} )
    }
    console.log("car: ",car);
    console.log("localstroge:",localStorage.getItem('car'))
    
  },[ride])

  const makePayment = async (params) => {
    const stripe = await loadStripe(config.stripeKey);

    const response = await axios.post(
      `${config.baseUrl}/api/payment/make-payment`,
      {
        fare: ride?.fare,
        pickup: ride?.pickup,
        destination: ride?.destination,
      },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    const session = response.data;

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    sessionStorage.setItem('sessionId',session.id)

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="h-screen lg:h-[70vh] w-full lg:w-[70%] lg:my-12 relative lg:rounded-2xl lg:overflow-hidden lg:hover:shadow-2xl lg:hover:-translate-y-8 duration-300 overflow-y-scroll">
        <div className=" flex justify-between items-center w-full absolute top-3 px-4">
          <h1 className="bg-transparent text-black tracking-[0.25rem] w-fit font-custom text-2xl ">
            Safar
          </h1>
          <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center">
            <Link to={"/"}>
              <MdOutlineLogout />
            </Link>
          </div>
        </div>

        {/* image */}
        <div className="h-1/2">
          <LiveDirection pickup={ride?.pickup} destination={ride?.destination} />
        </div>

        {/* information */}
        <div className="px-3 w-full">
          <div className="py-2">
            {/* header */}
            <h1 className="text-2xl font-semibold text-center mt-3 mb-2"></h1>
            <hr className="w-full bg-black h-[3px] opacity-20" />

            {/* Car Image */}
            <div className="flex justify-between items-center my-7 px-1 lg:px-3">
              <img className="h-16" src={car?.image} alt={car?.image} />

              <div className="text-right">
                <h2 className="capitalize font-semibold text-lg">
                  {ride?.captain.name}
                </h2>
                <p className="font-bold text-lg">
                  {ride?.captain.vehicle.plate}
                </p>
                {/* <p className="">Maruti Suzuki</p> */}
                <h1 className="font-bold">OTP: {ride?.otp}</h1>
              </div>
            </div>

            <hr className="w-full bg-black h-[3px] opacity-20" />

            {/* Main Content */}
            <div className="my-3">
              <div className="startingPoint flex justify-start items-center gap-5 my-5">
                <div className="">
                  <GiJourney className="w-6 h-6 " />
                </div>
                <div className="font-bold w-full">
                  {ride?.pickup}
                  <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
                </div>
              </div>
              <div className="endingPoint flex justify-start items-center gap-5 my-5">
                <div className="">
                  <GiJourney className="w-6 h-6 " />
                </div>
                <div className="font-bold w-full">
                  {ride?.destination}
                  <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
                </div>
              </div>
              <div className="price flex justify-start items-center gap-5 my-5">
                <div className="">
                  <FaMoneyBillWave className="w-6 h-6 " />
                </div>
                <div className="flex flex-col w-full">
                  <div className="font-bold flex justify-start items-center text-xl w-full ">
                    <FaRupeeSign /> {ride?.fare}
                  </div>
                  <div className="w-full bg-black h-[3px] opacity-20 mt-2" />
                </div>
              </div>

              { sessionId ? (
                <button
                onClick={makePayment}
                disabled={true}
                className="w-full bg-green-400 text-black py-2 rounded hover:cursor-not-allowed duration-300 font-bold my-2"
              >
                Already Paid
              </button>
              ) : (
                <button
                onClick={makePayment}
                className="w-full bg-green-500 text-black py-2 rounded hover:bg-black hover:text-white duration-300 font-bold my-2"
              >
                make payment
              </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Riding;
