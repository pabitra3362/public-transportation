import config from '../../config/config';
import axios from 'axios';


export const forgetPassword = async ({email,role}) => {
  try {
    
    const response = await axios.post(`${config.baseUrl}/api/${role}/forgetPassword`,{email})
    
    if(response.status === 200){
        return response.data.message
    }
    return false;
  } catch (error) {
    throw new Error((error?.response?.data?.error) || (error.message))
  }
}
