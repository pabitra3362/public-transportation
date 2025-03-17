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
    throw new Error((error?.response?.data?.error) || (error.message))
  }
};


// Service for cancel ride
export const cancelRide = async ({ rideId }) => {

  try {
    const rides = await axios.post(`${config.baseUrl}/api/admin/cancelRide`,{ rideId },{
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    })

    return rides.data;
    
  } catch (error) {
    throw new Error((error?.response?.data?.error) || (error.message))
  }
}
