import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineLogout } from "react-icons/md";
import DriverDetails from "../components/DriverDetails";
import RidePopup from "../components/RidePopup";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ConfirmRidePopup from "../components/ConfirmRidePopup";
import { getDriverToken } from "../utils/token";
import { useSelector } from "react-redux";
import { SocketContext } from "../context/SocketContext";

const DriverHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const token = getDriverToken();
  const { driver } = useSelector(state => state.driver);
  const { sendMessage, receiveMessage } = useContext(SocketContext);

  useEffect(()=>{
    sendMessage('join',{userType: 'captain', userId: driver._id})

  },[token])


  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="h-screen lg:h-[70vh] w-full lg:w-[70%] lg:my-12 relative lg:rounded-2xl lg:overflow-hidden lg:hover:shadow-2xl lg:hover:-translate-y-8 duration-300">
        <div className=" flex justify-between items-center w-full absolute top-3 px-4">
          <h1 className="bg-transparent text-black tracking-[0.25rem] w-fit font-custom text-2xl ">
            Safar
          </h1>
          <div className="w-8 h-8 rounded-full bg-white flex justify-center items-center">
            <Link to={"/drive"}>
              <MdOutlineLogout />
            </Link>
          </div>
        </div>

        {/* image */}
        <div className="h-3/5">
          <img
            className="h-full w-full object-cover "
            src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
            alt="map.gif"
          />
        </div>

        {/* information */}
        <div className="h-2/5 grid items-start bg-yellow-300 w-full">
          <DriverDetails />
        </div>

        <div
          ref={ridePopupPanelRef}
          className="sticky w-full z-10 bottom-0 translate-y-full bg-white px-3 py-5 pt-1"
        >
          <RidePopup
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          />
        </div>

        <div
          ref={confirmRidePopupPanelRef}
          className="sticky w-full z-10 h-screen bottom-0 translate-y-full bg-white px-3 py-5 pt-1"
        >
          <ConfirmRidePopup
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default DriverHome;
