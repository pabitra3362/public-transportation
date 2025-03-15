import config from "../config/config";
import axios from 'axios';




// service to get all users
export const getUsers = async () => {

  try {

    const users = await axios.get(`${config.baseUrl}/api/admin/getUsers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return users.data;

  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};
