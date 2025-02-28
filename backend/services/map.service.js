import axios from "axios";
import config from "../config/config.js";
import Captain from "../models/captain.model.js";

// Service to fetch coordinates
const fetchCoordinates = async (address) => {
  try {
    const apiKey = config.mapApiKey;
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const { lat, lng } = response.data.results[0].geometry.location;
      return { ltd: lat, lng: lng };
    } else {
      throw new Error("Unable to get coordinates for the given address");
    }
  } catch (error) {
    console.error("Error getting coordinates:", error.message);
    throw error;
  }
};

// Service to fetch Distance and Time
const fetchDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination addresses are required");
  }

  try {
    const apiKey = config.mapApiKey;
    const originEncoded = encodeURIComponent(origin);
    const destinationEncoded = encodeURIComponent(destination);
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${originEncoded}&destinations=${destinationEncoded}&key=${apiKey}`;

    const response = await axios.get(url);

    if (response.data.status === "OK") {
      const { distance, duration } = response.data.rows[0].elements[0];
      return { distance, duration };
    } else {
      throw new Error(
        "Unable to get distance and time for the given addresses"
      );
    }
  } catch (err) {
    console.error("Error getting distance and time:", err.message);
    throw err;
  }
};

// Service for address autoComplete
const fetchAutoCompleteSuggestions = async (input) => {
  if (!input) {
    throw new Error("Address is required");
  }

  try {
    const apiKey = config.mapApiKey;
    const encodedAddress = encodeURIComponent(input);
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodedAddress}&key=${apiKey}&components=country:IN`;

    const response = await axios.get(url);

    if (response.data.status === "OK") {
      return response.data.predictions;
    } else {
      throw new Error(
        "Unable to get autocomplete suggestions for the given address"
      );
    }
  } catch (error) {
    console.error("Error getting autocomplete suggestions:", error.message);
    throw error;
  }
};

// Service for get captains/drivers in the radius
const getCaptainsInRadius = async (ltd, lng, radius) => {
  // radius in km

  const captains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[ltd, lng], radius / 6371],
      },
    },
  });

  return captains;
};

export {
  fetchCoordinates,
  fetchDistanceTime,
  fetchAutoCompleteSuggestions,
  getCaptainsInRadius,
};
