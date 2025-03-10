import axios from "axios";
import config from "../../config/config";

const getDistanceAndTime = async ({ pickup, destination }) => {
    
  try {
    const response = await axios.get(`${config.baseUrl}/maps/get-distance-time`, {
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
