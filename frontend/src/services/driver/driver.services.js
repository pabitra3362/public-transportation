import config from '../../config/config';
import axios from 'axios';
import { getDriverToken } from '../../utils/token';



// service for update profile
export async function updateProfile (formData){

    const token = getDriverToken();
    

    const response = await axios.put(`${config.baseUrl}/api/captain/updateCaptain`,formData,{
        headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        },
        
    })

    return response.data;
    
}


// service to fetch current ride
export async function fetchCurrentRide(id) {
    const token = getDriverToken();
    
    const response = await axios.get(`${config.baseUrl}/api/captain/getCurrentRide`, {
        headers: {
            Authorization: `bearer ${token}`,
        },
        params: {
            id
        }
    });
    return response.data;
}


// service to cancel ride
export async function cancelRide({ rideId }) {
    const token = getDriverToken();

    const response = await axios.post(`${config.baseUrl}/api/captain/cancelRide`,{rideId},{
        headers: {
            Authorization: `bearer ${token}`
        }
    });


    return response.data;
}