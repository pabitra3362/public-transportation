import { createSlice } from '@reduxjs/toolkit';
import getProfileData from '../../utils/getProfileData';
import { getUserToken } from '../../utils/token';

const token = getUserToken();
const {user} = await getProfileData({token})



const initialState = {
    user: user || {},
    token: token || null
}


const userAuthSlice = createSlice({
    name:"user",
    initialState,
    reducers:{

        // reducer to store user information
        saveUser: (state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        },

        // reducer to remove user information
        removeUser: (state)=>{
            state.user = {};
            state.token = null;
        }
    }
})


export const { saveUser, removeUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;