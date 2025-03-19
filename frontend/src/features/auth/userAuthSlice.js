import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    user: {},
    token: null
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