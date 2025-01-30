import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: {},
    token: null
}


const userAuthSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        saveUser: (state,action)=>{
            state.user=action.payload.user;
            state.token=action.payload.token;
        }
    }
})


export const { saveUser } = userAuthSlice.actions;

export default userAuthSlice.reducer;
