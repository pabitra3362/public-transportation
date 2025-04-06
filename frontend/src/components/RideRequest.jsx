/* eslint-disable no-unused-vars */
import { useEffect, useContext, useState } from "react";
import Logo from "../assets/Logo.jpg"; // Ensure the logo path is correct
import { SocketContext } from "../context/SocketContext";
import { getDistanceAndTime } from "../services/map/map.service";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getDriverToken } from "../utils/token";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import config from "../config/config";
import { useForm } from "react-hook-form";
import { confirmRide } from "../services/ride/ride.service";
import { useNavigate } from "react-router-dom";

const RideRequest = () => {
  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const [RideRequest, setRideRequest] = useState(null);
  const [distanceTime, setDistanceTime] = useState(null);
  const [otpPanel, setOtpPanel] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { driver } = useSelector((state) => state.driver);
  const token = getDriverToken();
  const navigate = useNavigate();

  useEffect(() => {
    if (driver) {
      sendMessage("join", { userType: "captain", userId: driver?._id });
    }

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        sendMessage("update-location-captain", {
          userId: driver?._id,
          location: {
            ltd: latitude,
            lng: longitude,
          },
        });
      });
    };

    const locationInterval = setInterval(updateLocation, 10000);

    return () => clearInterval(locationInterval);
  }, [driver]);

  useEffect(() => {
    receiveMessage("new-ride", async (data) => {
      setRideRequest(data);

      try {
        const response = await getDistanceAndTime({
          pickup: data?.pickup,
          destination: data?.destination,
        });

        if (response) {
          const distance = response.distance.value / 1000;
          setDistanceTime(distance);
        } else {
          setDistanceTime(null);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      }
    });
  }, [receiveMessage]);

  async function acceptRide() {
    try {
      const response = await axios.post(
        `${config.baseUrl}/ride/confirm`,
        {
          rideId: RideRequest?._id,
          captainId: driver?._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOtpPanel(true);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  }

  const onSubmit = async (data) => {
    try {
      const response = await confirmRide({
        rideId: RideRequest?._id,
        otp: data.otp,
      });

      if (response) {
        navigate("/driver-riding", { state: { ride: RideRequest } });
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-6">
      <ToastContainer autoClose={3000} draggable={true} />
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl text-center">
        {/* Larger Logo */}
        <div className="mb-4">
          <img src={Logo} alt="Logo" className="h-32 mx-auto rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Ride Request</h2>

        {RideRequest ? (
          otpPanel ? (
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="otp">
                  <div className="relative flex items-center">
                    <input
                      type={"number"}
                      {...register("otp", {
                        required: "OTP is required",
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "OTP should be exactly 6 digits",
                        },
                      })}
                      className="w-full border border-black focus:border-none focus:ring-2 focus:ring-yellow-300 placeholder:focus:text-yellow-300 rounded-md duration-200 pl-14 px-3 py-2"
                      placeholder="Enter OTP"
                    />
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <img
                        src={"https://img.icons8.com/metro/26/sms.png"}
                        className="size-6 duration-200"
                        alt="otp image"
                      />
                    </span>
                  </div>

                  {/* Error Message */}
                  {errors.otp && (
                    <p className="text-red-500 text-xs md:text-lg mt-1">
                      {errors.otp.message}
                    </p>
                  )}
                </div>

                {/* Confirm Button */}
                <button
                  type="submit"
                  className="w-full bg-green-500 text-black py-2 rounded hover:bg-black hover:text-white duration-300 font-bold my-2"
                >
                  Confirm
                </button>
              </form>
            </div>
          ) : (
            <>
              {/* Ride Details */}

              <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
                <p className="text-xl font-semibold text-gray-900">User Name</p>
                <p className="text-lg text-gray-700 mt-1">
                  {RideRequest?.user?.name}
                </p>
              </div>
              <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
                <p className="text-xl font-semibold text-gray-900">
                  Trip Distance{" "}
                </p>
                <p className="text-lg text-gray-700 mt-1">{distanceTime} KM</p>
              </div>

              <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
                <p className="text-xl font-semibold text-gray-900">
                  Pickup Location
                </p>
                <p className="text-lg text-gray-700 mt-1">
                  {RideRequest?.pickup}
                </p>
              </div>

              <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
                <p className="text-xl font-semibold text-gray-900">
                  Drop Location
                </p>
                <p className="text-lg text-gray-700 mt-1">
                  {RideRequest?.destination}
                </p>
              </div>

              <div className="bg-gray-200 p-4 rounded-lg shadow-md mt-4">
                <p className="text-xl font-semibold text-gray-900">
                  Estimated Fare
                </p>
                <p className="text-3xl font-bold text-black mt-2 flex justify-center items-center">
                  <FaRupeeSign className="size-6" /> {RideRequest?.fare}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 flex flex-col gap-4">
                <button
                  onClick={acceptRide}
                  className="bg-green-500 text-black text-xl px-6 py-2 rounded-md font-semibold hover:bg-black hover:text-white duration-500"
                >
                  Accept
                </button>
                <button
                  onClick={() => setRideRequest(null)}
                  className="bg-red-600 text-white text-xl px-6 py-2 rounded-md font-semibold hover:bg-black hover:text-white duration-500"
                >
                  Reject
                </button>
              </div>
            </>
          )
        ) : (
          <video
            className="w-full h-96"
            src="https://cdnl.iconscout.com/lottie/premium/preview-watermark/empty-14042396-11352619.mp4"
            autoPlay
            loop
            muted
          ></video>
        )}
      </div>
    </div>
  );
};

export default RideRequest;
