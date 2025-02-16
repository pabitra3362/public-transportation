import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    name: null,
    phone: null,
    date: null,
    startingPoint: null,
    endingPoint: null,
}



const confirmedCarSlice = createSlice({
    name: 'confirmedCar',
    initialState,
    reducers: {

        // reducer to set confirmed car details
        setConfirmedCarDetails: (state, action) => {
            state.name = action.payload.name;
            state.phone = action.payload.phone;
            state.date = action.payload.date;
            state.startingPoint = action.payload.startingPoint;
            state.endingPoint = action.payload.endingPoint;
        },
        
    }
})


export const { setConfirmedCarDetails, getConfirmedCarDetails } = confirmedCarSlice.actions;

export default confirmedCarSlice.reducer;