import React, { useEffect, useState, useContext } from "react";
import { LoadScriptNext, GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import config from "../config/config";
import { SocketContext } from "../context/SocketContext";
import { useSelector } from "react-redux";


const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 0,
  lng: 0,
};

const LiveDirection = ({ pickup, destination }) => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false); // New state to track if Google Maps is loaded
  const { sendMessage } = useContext(SocketContext);
  const { driver } = useSelector(state=> state.driver);

  useEffect(() => {
    const handleError = (error) => {
      setError(error.message);
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });
      },
      handleError
    );

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          lat: latitude,
          lng: longitude,
        });

        sendMessage('update-location-captain',{
          userId: driver?._id,
          location: {
            ltd: latitude,
            lng: longitude,
          }
        });
      },
      handleError
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const updatePosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => setError(error.message)
      );
    };

    updatePosition();

    const intervalId = setInterval(updatePosition, 5000);

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    if (googleLoaded) { // Only run this if Google Maps is loaded
      const directionsService = new google.maps.DirectionsService();
      if (pickup && destination) {
        directionsService.route(
          {
            origin: pickup,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
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
    }
  }, [pickup, destination, googleLoaded]);

  return (
    <LoadScriptNext 
      googleMapsApiKey={config.googleMapApiKey} 
      onLoad={() => setGoogleLoaded(true)} // Set googleLoaded to true when loaded
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        <MarkerF position={currentPosition} />
        {directions && (
          <DirectionsRenderer directions={directions} />
        )}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default LiveDirection;
