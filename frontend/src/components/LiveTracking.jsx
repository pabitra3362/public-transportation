import React, { useEffect, useState } from "react";
import { LoadScriptNext, GoogleMap, MarkerF } from "@react-google-maps/api";
import config from "../config/config";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);
  const [error, setError] = useState(null);

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

    const intervalId = setInterval(updatePosition, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <LoadScriptNext googleMapsApiKey={config.googleMapApiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
      >
        <MarkerF position={currentPosition} />
      </GoogleMap>
      {error && <div>Error: {error}</div>}
    </LoadScriptNext>
  );
};

export default LiveTracking;