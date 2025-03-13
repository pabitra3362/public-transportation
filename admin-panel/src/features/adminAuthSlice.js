import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    admin: null,
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        loginAdmin: (state,action) =>{
            state.admin = action.payload.admin;
            localStorage.setItem('token',action.payload.token);
        },

        logoutAdmin: (state) => {
            state.admin = null;
            localStorage.removeItem('token');
        },
    }
})


export const { loginAdmin , logoutAdmin } = adminSlice.actions;


export default adminSlice.reducer;