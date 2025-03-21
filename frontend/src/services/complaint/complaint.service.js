import axios from 'axios';
import config from '../../config/config';



export const registerComplaint = async ({ name, email, subject, message }) => {
  try {
    const response = await axios.post(`${config.baseUrl}/api/complaint/register`, { name, email, subject, message });

    return response.data;

  } catch (error) {
    throw new Error( (error?.response?.data?.message) || (error.message) );
  }
}
