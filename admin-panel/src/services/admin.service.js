import axios from 'axios';
import config from '../config/config';



// Service for admin login
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


// Service for admin logout
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


// Service for admin forget password
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


// Service for reset password
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


// Service for earning and  payments
export const earningAndPayments = async () => {

  try {
      
    const response = await axios.get(`${config.baseUrl}/api/admin/getDriverFares`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    return response.data;
    
  } catch (error) {
    throw new Error((error?.response?.data?.message) || (error.message))
  }
}

// Service for getting total revenue
export const revenueSevice = async () => {

  try {

    const response = await axios.get(`${config.baseUrl}/api/admin/totalRevenue`,{

      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    return response.data;
    
  } catch (error) {
    throw new Error( (error?.response?.data?.message) || (error.message))
  }
}




