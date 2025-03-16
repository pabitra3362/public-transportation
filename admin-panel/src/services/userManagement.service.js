import config from "../config/config";
import axios from 'axios';




// service to get all users
export const getUsers = async () => {

  try {

    const users = await axios.get(`${config.baseUrl}/api/admin/getUsers`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return users.data;

  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
};



// Service to update user details
export const updateUser = async ({ id, name, email }) => {

  try {
    
    const user = await axios.put(`${config.baseUrl}/api/admin/updateUser`,{ id, name, email },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    })

    return user.data
  } catch (error) {
    throw new Error(error?.response?.data?.message || error.message);
  }
}


// Service to delete user
export const deleteUser = async (id) => {

  try {
    
    const user = await axios.delete(`${config.baseUrl}/api/admin/deleteUser`,{
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
