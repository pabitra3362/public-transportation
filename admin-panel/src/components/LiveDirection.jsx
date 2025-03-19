import React, { useEffect, useState } from "react";
import { LoadScriptNext, GoogleMap, MarkerF, DirectionsRenderer } from "@react-google-maps/api";
import config from "../config/config";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = { lat: 0, lng: 0 };

const LiveDirection = () => {
  const ride = JSON.parse(localStorage.getItem("rideDetails")) || {};
  
  const { pickup, destination } = ride || {};

  const [currentPosition, setCurrentPosition] = useState(center);
  const [error, setError] = useState(null);
  const [directions, setDirections] = useState(null);
  const [googleLoaded, setGoogleLoaded] = useState(false);

  useEffect(() => {
    const handleError = (error) => setError(error.message);

    const updatePosition = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(updatePosition, handleError);
    
    // Watch for live position updates
    const watchId = navigator.geolocation.watchPosition(updatePosition, handleError);

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

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
    <LoadScriptNext
      googleMapsApiKey={config.googleMapApiKey}
      onLoad={() => {
        setGoogleLoaded(true);
      }}
    >
      <GoogleMap mapContainerStyle={containerStyle} center={currentPosition} zoom={15}>
        <MarkerF position={currentPosition} />
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
    </LoadScriptNext>
  );
};

export default LiveDirection;
