import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    token: null
}


const userAuthSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        userRegister: (state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        }
    }
})


export const { userRegister } = userAuthSlice.actions;

export default userAuthSlice.reducer;
