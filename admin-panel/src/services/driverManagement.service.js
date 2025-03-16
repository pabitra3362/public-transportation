import config from "../config/config";
import axios from 'axios';




// service to get all users
export const getDrivers = async () => {

  try {

    const drivers = await axios.get(`${config.baseUrl}/api/admin/getCaptains`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return drivers.data;

  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};




// Service to update driver details
export const updateDriver = async ({ id, name, email }) => {

  try {
    
    const driver = await axios.put(`${config.baseUrl}/api/admin/updateCaptain`,{ id, name, email },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })

    return driver.data;
  } catch (error) {
    console.log(error.message);
    
    throw new Error(error?.response?.data?.message || error.message);
  }
};



// Service to delete user
export const deleteDriver = async (id) => {

  try {
    
    const user = await axios.delete(`${config.baseUrl}/api/admin/deleteCaptain`,{
      data: {
        id
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })

    return user.data;
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}
