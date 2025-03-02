import express from 'express';
import { body, query } from 'express-validator';
import { authCaptain, authUser } from '../middlewares/auth.middleware.js';
import { confirmRide, createRide, endRide, getFare, startRide } from '../controller/ride.controller.js';



const router = express.Router();




// Route to create ride
router.post('/create',
    authUser,
    body('pickup').isString().isLength({min: 3}).withMessage("Invalid pickup address"),
    body('destination').isString().isLength({min: 3}).withMessage("Invalid destination address"),
    body('vehicleType').isString().isIn(['auto','car','moto']).withMessage("Invalid vehicle type"),
    createRide
);


// Route to get fare
router.get('/get-fare',
    authUser,
    query('pickup').isString().isLength({min: 3}).withMessage("Invalid pickup address"),
    query('destination').isString().isLength({min: 3}).withMessage("Invalid destination address"),
    getFare
);


// Route to confirm ride
router.post('/confirm',
    authCaptain,
    body('rideId').isString().withMessage("Invalid ride id"),
    confirmRide
);


// Route to start ride
router.get('/start-ride',
    authCaptain,
    query('rideId').isString().withMessage("Invalid ride id"),
    query('otp').isString().withMessage('Invalid Otp'),
    startRide
);



// Route to end ride
router.post('/end-ride',
    authCaptain,
    body('rideId').isString().withMessage("Invalid ride id"),
    endRide
);







export default router;
