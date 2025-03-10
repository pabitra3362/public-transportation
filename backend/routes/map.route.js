import express from 'express';
import { authUser,authCaptain } from '../middlewares/auth.middleware.js';
import { getCoordinates, getDistanceAndTime, getAutoCompleteSuggestions } from '../controller/map.controller.js';
import { query } from 'express-validator';

const router = express.Router();


// Route to get coordinates
router.get('/get-coordinates',
    query('address').isString().isLength({min: 3}).withMessage("Please enter valid address")
    ,authUser,getCoordinates);


// Route to get distance and time
router.get('/get-distance-time',
    query('origin').isLength({min: 3}).withMessage("Please enter valid origin address"),
    query('destination').isLength({min: 3}).withMessage("Please enter valid destination address"),
    authcaptain,
    getDistanceAndTime);


// Route to get autoComplete suggestions
router.get('/get-suggestions',
    query('input').isLength({min: 3}).withMessage("Please enter valid address"),
    authUser, getAutoCompleteSuggestions);





export default router;