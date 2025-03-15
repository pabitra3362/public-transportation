import config from '../config/config';
import axios from 'axios';



// Service for fetching rides
export const getRides = async ({ status }) => {

  try {
    const rides = await axios.get(`${config.baseUrl}/api/admin/getRides`,{
        params: {
            status
        },
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    return rides.data;
    
  } catch (error) {
    throw new Error((error?.response?.data?.message) || (error.message))
  }
}
