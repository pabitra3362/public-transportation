import React, { useEffect, useState, useContext } from "react";
import {
  LoadScriptNext,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import config from "../config/config";
import { SocketContext } from "../context/SocketContext";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const center = { lat: 0, lng: 0 };

const LiveDirection = () => {
  const { sendMessage, receiveMessage } = useContext(SocketContext);
  const ride = JSON.parse(localStorage.getItem("rideDetails")) || {};

  const { pickup, destination } = ride || {};

  const [currentPosition, setCurrentPosition] = useState(center);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      sendMessage("fetch-captain-location", { userId: ride?.captain?._id });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [ride]);

  // captain-location socket
  receiveMessage("captain-location", (data) => {
    if(data.length > 0){
      const { location } = data;
      setCurrentPosition({ lat: location.ltd, lng: location.lng }); 
    }
  });

  useEffect(() => {
    if (googleLoaded && pickup && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: destination,
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
  }, [pickup, destination, googleLoaded]);

  return (
    <div>
      <LoadScriptNext
        googleMapsApiKey={config.googleMapApiKey}
        onLoad={() => {
          setGoogleLoaded(true);
        }}
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
        >
          <Marker position={currentPosition} />
          {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </LoadScriptNext>

      <Link to={"/rides"}>
        <Button className="w-[50%] mx-auto my-5 font-bold" gradientDuoTone="purpleToBlue">
          Go Back
        </Button>
      </Link>
    </div>
  );
};

export default LiveDirection;
