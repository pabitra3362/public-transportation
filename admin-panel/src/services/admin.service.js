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


export const forgetPassword = async ({email}) => {
  try {
    
    const response = await axios.post(`${config.baseUrl}/api/admin/forgetPassword`,{email})
    
    if(response.status === 200){
        return response.data.message
    }
    return false;
  } catch (error) {
    throw new Error((error?.response?.data?.error) || (error.message))
  }
}


export const setNewPassword = async ({id, password}) => {
  try{
      const res = await axios.post(`${config.baseUrl}/api/admin/setNewPassword`,{id, password})

      if(res.status === 200){
          return res.data.message
      }
      return false;
      
  } catch ( error ) {
      throw new Error((error?.response?.data?.error) || (error.message))
  }
}
