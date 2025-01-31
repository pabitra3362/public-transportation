import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from '../features/auth/userAuthSlice';
import driverAuthReducer from '../features/auth/driverAuthSlice';


const store = configureStore({
    reducer: {
        user: userAuthReducer,
        driver: driverAuthReducer,
    }
})

export default store;