/* eslint-disable no-unused-vars */
import config from "../../config/config";
import axios from "axios";


export const createDriver = async (formData) => {
  
    try {
        const driver = await axios.post(`${config.baseUrl}/api/captain/register`,formData,{
            headers: {
                "Content-Type":'multipart/form-data'
            }
        })
    
        if(driver.status === 201){
            return driver.data
        }
    
        return false;
    } catch (error) {
        throw new Error((error?.response?.data?.error) || (error.message))
    }
}
