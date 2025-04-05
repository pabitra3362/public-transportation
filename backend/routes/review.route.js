import express from 'express';
import { body } from 'express-validator';
import { registerReview } from '../controller/review.controller.js';
import { authUser } from '../middlewares/auth.middleware.js';



const router = express.Router();



// POST request to register review
router.post('/register',
    [
        body('title').isString().withMessage('Title is required'),
        body('description').isString().withMessage('Description is required'),
        body('rating').isNumeric().withMessage("Rating is required"),
        body('rideId').isString().withMessage("Invalid ride id")
    ],
    authUser,
    registerReview
);



export default router;