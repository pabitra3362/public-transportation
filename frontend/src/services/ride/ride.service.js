import axios from 'axios';
import config from '../../config/config';
import { getToken } from '../../utils/token';

const token = getToken();



// Service to get fare
const getFare = async ({pickup, destination}) => {
   try {
    const response = await axios.get(`${config.baseUrl}/ride/get-fare`,{
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            pickup,
            destination
        }
    })

    if(response.status === 200 ){
        return response.data;
    }
    return false;

   } catch (error) {
    throw new Error((error?.response?.data?.error) || (error.message))
   }

}


// Service to create ride for user
const createRide = async ({pickup, destination, vehicleType}) => {
    try {
        const response = await axios.post(`${config.baseUrl}/ride/create`,{pickup, destination, vehicleType},{
            headers: {
                Authorization: `bearer ${token}`
            }
        })


        if(response.status === 201 ){
            return response.data;
        }
        return false;
    } catch (error) {
        console.log(error);
        
    }
}






export {getFare, createRide};


