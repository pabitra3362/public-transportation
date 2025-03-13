import { configureStore } from '@reduxjs/toolkit';
import adminReducer from '../features/adminAuthSlice';


export const store = configureStore({
    reducer: {
        admin: adminReducer,
    },
})