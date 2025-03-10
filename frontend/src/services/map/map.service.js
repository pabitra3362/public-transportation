import axios from "axios";
import config from "../../config/config";
import { getUserToken } from "../../utils/token";

const getDistanceAndTime = async ({ pickup, destination }) => {
  const token = getUserToken();
  try {
    const response = await axios.get(`${config.baseUrl}/maps/get-distance-time`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
        params: {
          origin: pickup,
          destination: destination,
        },
      });
    
      if(response.status === 200 ){
        return response.data;
      }

      return false;
  } catch (error) {
    console.log("error in getDistanceTime :: frontend :: ",error.message)
  }
};



export { getDistanceAndTime };
