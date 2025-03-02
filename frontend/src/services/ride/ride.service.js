import axios from "axios";
import config from "../../config/config";
import { getUserToken, getDriverToken } from "../../utils/token";

// Service to get fare
const getFare = async ({ pickup, destination }) => {
  const token = getUserToken();

  try {
    const response = await axios.get(`${config.baseUrl}/ride/get-fare`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        pickup,
        destination,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    throw new Error(error?.response?.data?.error || error.message);
  }
};

// Service to create ride for user
const createRide = async ({ pickup, destination, vehicleType }) => {
  const token = getUserToken();
  try {
    const response = await axios.post(
      `${config.baseUrl}/ride/create`,
      { pickup, destination, vehicleType },
      {
        headers: {
          Authorization: `bearer ${token}`,
        },
      }
    );

    if (response.status === 201) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.log("error in createRide service :: frontend :: ", error);
  }
};

// Service to confirm ride for driver
const confirmRide = async ({ rideId, otp }) => {
  const token = getDriverToken();

  try {
    const response = await axios.get(`${config.baseUrl}/ride/start-ride`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        rideId,
        otp,
      },
    });

    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.log("error in confirm ride service :: frontend :: ", error.message);
  }
};

// Service to end ride
const endRide = async ({ rideId }) => {
  const token = getDriverToken();

  try {
    const response = await axios.post(`${config.baseUrl}/ride/end-ride`, { rideId },{
      headers: {
        Authorization: `Bearer ${token}`,
      }
      
    });

    if (response.status === 200) {
      return response.data;
    }
    return false;
  } catch (error) {
    console.log("error in end ride service :: frontend :: ", error.message);
  }
};

export { getFare, createRide, confirmRide, endRide };
