import config from "../config/config";
import axios from 'axios';




// service to get all users
export const getDrivers = async () => {

  try {

    const drivers = await axios.get(`${config.baseUrl}/api/admin/getCaptains`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return drivers.data;

  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};
