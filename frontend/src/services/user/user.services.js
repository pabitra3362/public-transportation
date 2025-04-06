import axios from 'axios';
import config from '../../config/config';
import { getUserToken } from '../../utils/token';


// service for update profile
export async function updateProfile (formData){

    const token = getUserToken();
    

    const response = await axios.put(`${config.baseUrl}/api/user/updateUser`,formData,{
        headers: {
            Authorization: `bearer ${token}`,
            "Content-Type": 'multipart/form-data'
        },
        
    })

    return response.data;
    
}


// service to fetch payment history
export async function fetchPaymentHistory(id) {
    const token = getUserToken();
    
    const response = await axios.get(`${config.baseUrl}/api/user/getPaymentDetails`, {
        headers: {
            Authorization: `bearer ${token}`,
        },
        params: {
            id
        }
    });
    return response.data;
}


// service to fetch ride history
export async function fetchRideHistory(id) {
    const token = getUserToken();
    
    const response = await axios.get(`${config.baseUrl}/api/user/getAllRides`, {
        headers: {
            Authorization: `bearer ${token}`,
        },
        params: {
            id
        }
    });
    return response.data;
}


// service to fetch current ride
export async function fetchCurrentRide(id) {
    const token = getUserToken();
    
    const response = await axios.get(`${config.baseUrl}/api/user/getCurrentRide`, {
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
    const token = getUserToken();

    const response = await axios.post(`${config.baseUrl}/api/user/cancelRide`,{rideId},{
        headers: {
            Authorization: `bearer ${token}`
        }
    });


    return response.data;
}
