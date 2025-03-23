import axios from 'axios';
import config from '../../config/config';
import { getUserToken } from '../../utils/token';


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