import config from "../../config/config";
import axios from "axios";


// service for driver registration
export const createDriver = async (formData) => {
  
    try {
        const driverResponse = await axios.post(`${config.baseUrl}/api/captain/register`,formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }) 

        if(driverResponse.status === 201 ) {
            return driverResponse.data;
        }

        return false;

    } catch (error) {
        throw new Error( (error?.response?.data?.error) || (error.message) )
    }
}



// service for driver login
export const loginDriver = async ({ email, password }) => {
    try {
        const res = await axios.post(`${config.baseUrl}/api/captain/login`,{email, password})
        if(res.status === 200) {
            return res.data;
        }
        return false;
    } catch (error) {
        throw new Error( (error?.response?.data?.error) || (error.message) )
    }
}



// service for driver logout
export const logoutDriver = async ({token}) => {
    try {
        const response = await axios.get(`${config.baseUrl}/api/captain/logout`, {
            headers: {
                Authorization:`Bearer ${token}`
            }
        })
    
        if(response.status === 200 ){
            return true;
        }
        return false;
    } catch (error) {
        throw new Error((error?.response?.data?.error) || (error.message))
    }
}

