import { createSlice } from '@reduxjs/toolkit';
import getProfileData from '../../utils/getProfileData';
import { getUserToken } from '../../utils/token';

const loadIntialState = () => {
    const token = getUserToken();
    if(!token) return { user: {}, token: null};

    let user = {} ;
    getProfileData({ token })
    .then((data)=> user=data.user)
    .catch(err=>console.log(err));

    return { user, token };
}



const initialState = loadIntialState();


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
