import axios from "axios";
import config from "../../config/config";
import { useSelector } from "react-redux";


// service for createUser
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
      throw new Error((error?.response?.data?.error) || (error.message))
    }
};



// service for loginUser
export const loginUser = async ({ email, password })=>{
  try {

    const user = await axios.post(`${config.baseUrl}/api/user/login`,{ email, password })

    if(user.status===200){
      return user.data;
    }

    return false;
    
  } catch (error) {
    throw new Error((error?.response?.data?.error) || (error.message))
  }
}



// service for logoutUser
export const logoutUser = async ({token, role}) => {

  try {
    const result = await axios.get(`${config.baseUrl}/api/${role}/logout`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
    })

    if(result.status === 200){
      return true;
    }

    return false;

  } catch (error) {
    console.error(error);
    
    throw new Error((error?.response?.data?.error) || (error.message))
  }
}

