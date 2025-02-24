import { fetchCoordinates, fetchDistanceTime } from '../services/map.service.js';
import { validationResult } from 'express-validator'



// Controller for getCoordinates
const getCoordinates = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }


    const { address } = req.query;


    try {
        const coordinates = await fetchCoordinates(address);
        res.status(200).json(coordinates)
    } catch (error) {
        res.status(404).json({ message: "Coordinates not found "})
    }
}



// Controller for  get Distance and Time
const getDistanceAndTime = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { origin, destination } = req.query;

    try{
        const distanceAndTime = await fetchDistanceTime(origin,destination);
        res.status(200).json(distanceAndTime)
    } catch (error) {
        res.status(404).json({ message: "Distance and time not found "})
    }
}




export { getCoordinates, getDistanceAndTime };