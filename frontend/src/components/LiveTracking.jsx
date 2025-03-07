import React, { useEffect, useState } from "react";
import { LoadScriptNext, GoogleMap, MarkerF } from "@react-google-maps/api";
import config from "../config/config";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 28.6139, // Default: New Delhi (Change as needed)
  lng: 77.209,
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const handleError = (error) => {
      console.error("Geolocation Error:", error);
      setError(error.message || "Failed to get location.");
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      handleError,
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
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

      {error && (
        <div className="text-red-500 text-center p-2 bg-gray-200">
          Error: {error}
        </div>
      )}
    </LoadScriptNext>
  );
};

export default LiveTracking;
