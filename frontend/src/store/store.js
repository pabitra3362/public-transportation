import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from '../features/auth/userAuthSlice';


const store = configureStore({
    reducer: {
        user: userAuthReducer
    }
})

export default store;