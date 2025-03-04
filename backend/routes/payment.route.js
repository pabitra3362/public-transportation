import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import { body } from 'express-validator';
import { makePayment } from '../controller/payment.controller.js';

const router = express.Router();



// Route to make payment
router.post('/make-payment',
    authUser,
    body('fare').isNumeric().withMessage('Fare is required'),
    body('pickup').isString().isLength({min:3}).withMessage('pickup location is required'),
    body('destination').isString().isLength({min:3}).withMessage('destination location is required'),
    makePayment
)










export default router;