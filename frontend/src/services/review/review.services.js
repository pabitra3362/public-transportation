import config from '../../config/config';
import axios from 'axios';
import { getUserToken } from '../../utils/token';




// Service for register review
export async function registerReview({title, description, rating, rideId }) {

    const token = getUserToken();
    
    const response = await axios.post(`${config.baseUrl}/api/review/register`,{title, description, rating, rideId},{
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data;
}