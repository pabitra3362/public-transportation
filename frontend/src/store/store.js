import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from '../features/auth/userAuthSlice';
import driverAuthReducer from '../features/auth/driverAuthSlice';
import carValueReducer from '../features/car/confirmedCarSlice';


const store = configureStore({
    reducer: {
        user: userAuthReducer,
        driver: driverAuthReducer,
        car: carValueReducer, 
    }
})

export default store;