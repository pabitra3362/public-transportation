import axios from 'axios';
import config from '../../config/config';

export const loginAdminService = async ({ email, password })=>{
    try {
  
      const admin = await axios.post(`${config.baseUrl}/api/admin/login`,{ email, password })
  
     if(admin.status === 200 ){
      return admin.data;
     }

     return false;
      
    } catch (error) {
      throw new Error((error?.response?.data?.message) || (error.message))
    }
  }



export const logoutAdminService = async () => {
  try {
    const logout = await axios.get(`${config.baseUrl}/api/admin/logout`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(logout.status === 200 ){
      return logout.data;
    }
    
    return false;
    
  } catch (error) {
    throw new Error((error?.response?.data?.message) || (error.message))
  }
}