import { createRideService, getFareService } from "../services/ride.service.js";
import { validationResult } from "express-validator";



// Controller for create ride
const createRide = async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { pickup, destination, vehicleType } = req.body;

    try {
        const ride = await createRideService({user: req.user._id, pickup, destination, vehicleType })
        return res.status(201).json(ride);        
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}




// Controller for getFare
const getFare = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await getFareService(pickup, destination);
        return res.status(200).json(fare);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }


}




export { createRide, getFare };

