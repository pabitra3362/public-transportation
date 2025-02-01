import config from "../../config/config";
import axios from "axios";


export const setNewPassword = async ({id, role, password}) => {
    try{
        const res = await axios.post(`${config.baseUrl}/api/${role}/setNewPassword`,{id, password})

        if(res.status === 200){
            return res.data.message
        }
        return false;
        
    } catch ( error ) {
        throw new Error((error?.response?.data?.error) || (error.message))
    }
}
