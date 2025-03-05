import { createSlice } from "@reduxjs/toolkit";
import getProfileData from "../../utils/getProfileData";
import { getDriverToken } from "../../utils/token";


const loadIntialState = () => {
    const token = getDriverToken();
    if(!token) return { driver: {}, token: null};

    let driver = {} ;
    getProfileData({ token })
    .then((data)=> driver=data.driver)
    .catch(err=>console.log(err));

    return { driver, token };
}


const initialState = loadIntialState();
const driverAuthSlice = createSlice({
    name:'driver',
    initialState,
    reducers: {

        // reducer to save Driver info
        saveDriver: (state, action)=>{
            state.driver = action.payload.driver;
            state.token = action.payload.token;
        },

        // reducer to remove Driver info
        removeDriver: (state) => {
          state.driver = {};
          state.token = null;
        }
        
    }
})


export const { saveDriver, removeDriver } = driverAuthSlice.actions;


export default driverAuthSlice.reducer;