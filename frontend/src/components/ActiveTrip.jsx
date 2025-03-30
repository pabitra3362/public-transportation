import React, { useContext, useEffect, useState, useMemo } from "react";
import Logo from "../assets/Logo.jpg"; // Import the logo image
import { useSelector } from "react-redux";
import { Spinner, Button } from "flowbite-react";
import { toast, ToastContainer } from "react-toastify";
import { fetchCurrentRide, cancelRide } from "../services/driver/driver.services";
import {
  LoadScriptNext,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import config from "../config/config";
import { SocketContext } from "../context/SocketContext";
import { endRide } from "../services/ride/ride.service";

const containerStyle = {
  width: "100%",
  height: "100%",
};

function RideTracking() {
  const { driver } = useSelector((state) => state.driver);
  const [ride, setRide] = useState({});
  const [loader, setLoader] = useState(true);
  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const [directions, setDirections] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);
  const [userPosition, setUserPosition] = useState(null);
  const [driverPosition, setDriverPosition] = useState(null);
  const [error, setError] = useState(null);

  const handleCancelRide = async () => {
    try {
      const response = await cancelRide({ rideId: ride?._id });
      toast.success(response.message,{
        onClose: ()=>{
         window.location.reload();
        }
      });
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };


  const handleFinishButton = async () => {

    const response = await endRide({rideId: ride._id});

    navigator.geolocation.getCurrentPosition(position=>{
      const { latitude, longitude } = position.coords;
      sendMessage('update-location-captain',{
        userId: driver?._id,
        location: {
          ltd: latitude,
          lng: longitude,
        }
      });
    })

    if(response){
      toast.success('Ride ended',{
        onClose: ()=>{
          window.location.reload();
          window.scrollTo(0,0);
        }
      })
    }
    
  }

  useEffect(() => {
    async function getCurrentRide() {
      try {
        if (driver._id) {
          const response = await fetchCurrentRide(driver._id);
          setRide(response);
          setLoader(false);
        }
      } catch (error) {
        toast.error(error.response?.data?.error || error.message);
      }
    }
    getCurrentRide();
  }, [driver]);

  useEffect(() => {
    function fetchLocation() {
      sendMessage("fetch-user-location", { userId: ride?.user?._id });

      window.navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setDriverPosition({ lat: latitude, lng: longitude });
      });
    }

    const intervalId = setInterval(fetchLocation, 10000);

    return () => clearInterval(intervalId);
  }, [ride]);

  useEffect(()=>{
    receiveMessage("user-location", (data) => {
      if (data) {
        const { location } = data;
        setUserPosition({ lat: location?.ltd, lng: location?.lng });
      }
    });

    receiveMessage('ride-cancelled', (ride) => {
       toast.error("ride cancelled", {
        onclose: () => {
          setRide({});
          window.scrollTo(0, 0);
        }
       })
      })
  },[receiveMessage])

  useEffect(() => {
    if (googleLoaded && ride && ride?.pickup && ride?.destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: ride?.pickup,
          destination: ride?.destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
          } else {
            setError("Directions request failed due to " + status);
          }
        }
      );
    }
  }, [ride, googleLoaded]);

  const memoizedDirections = useMemo(() => {
    if (directions) {
      return <DirectionsRenderer directions={directions} />;
    }
    return null;
  }, [directions]);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-2xl mx-auto mt-8 w-full max-w-screen-lg">
      <ToastContainer autoClose={3000} draggable={true} />

      {/* Logo image */}
      <div className="text-center mb-4 sm:mb-6">
        <img
          src={Logo}
          alt="Logo"
          className="mx-auto h-28 sm:h-40 rounded-full"
        />
      </div>

      <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6 text-gray-800">
        Track Your Ride
      </h2>

      {loader ? (
        <div className="text-center">
          <Spinner aria-label="Center-aligned spinner example" size="xl" />
        </div>
      ) : ride ? (
        <div className="space-y-2 sm:space-y-2 flex flex-col gap-10">
          <div className="space-y-4 sm:space-y-6">
            <div className="p-4 sm:p-6 bg-gray-50 border border-gray-300 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="space-y-3">
                {/* Ride ID and Fare */}
                <div className="flex justify-between items-center text-gray-800">
                  <span className="font-semibold text-base sm:text-xl">
                    Ride ID: {ride?._id}
                  </span>
                  <span className="text-green-600 font-bold text-base sm:text-lg">
                    ₹{ride?.fare}
                  </span>
                </div>

                {/* Driver, Pickup, and Destination */}
                <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                  <span>Driver: {ride?.captain?.name}</span>
                  <span>
                    {ride?.pickup} to {ride?.destination}
                  </span>
                </div>

                {/* Date */}
                <div className="text-xs sm:text-sm text-gray-500 mt-2">
                  <span className="font-semibold">Date: </span>
                  {ride?.date.split("T")[0] || Date.now()}
                </div>
              </div>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="h-96 sm:h-[500px] bg-gray-200 rounded-md flex flex-col items-center justify-center">
            <LoadScriptNext
              googleMapsApiKey={config.googleMapApiKey}
              onLoad={() => {
                setGoogleLoaded(true);
              }}
            >
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={driverPosition}
                zoom={15}
              >
                {userPosition && (
                  <Marker
                    position={userPosition}
                    label={{
                      text: "Me",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  />
                )}

                {driverPosition && (
                  <Marker
                    position={driverPosition}
                    label={{
                      text: "Driver",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  />
                )}

                {memoizedDirections}
              </GoogleMap>
            </LoadScriptNext>
          </div>

          <div className="flex justify-center">
            {" "}
            {/* Center the button */}
            <button
              onClick={handleCancelRide}
              className="w-[80%]  px-4 py-3 rounded-md font-semibold bg-yellow-300 hover:bg-black hover:text-white duration-500"
            >
              Cancel Ride
            </button>
          </div>

          <div className="flex justify-center">
            {" "}
            {/* Center the button */}
            <button
              onClick={handleFinishButton}
              className="w-[80%]  px-4 py-3 rounded-md font-semibold bg-yellow-300 hover:bg-black hover:text-white duration-500"
            >
              Finish Ride
            </button>
          </div>
        </div>
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
  );
}

export default RideTracking;
