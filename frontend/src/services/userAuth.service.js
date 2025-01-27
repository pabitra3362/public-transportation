import axios from "axios";
import config from "../config/config";

export const createUser = async ({ email, name, password }) => {
  
    try {
      const response = await axios.post(`${config.baseUrl}/api/user/register`, {
        email,
        name,
        password,
      });

      if(response.status===201){
        return response.data;
      }
      return false;
    } catch (error) {
      console.log((error?.response.data.error) || (error.message))
    }
};
