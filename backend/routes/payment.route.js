import express from 'express';
import { authUser } from '../middlewares/auth.middleware.js';
import { body,query } from 'express-validator';
import { fetchPaymentInfo, makePayment } from '../controller/payment.controller.js';

const router = express.Router();



// Route to make payment
router.post('/make-payment',
    authUser,
    body('fare').isNumeric().withMessage('Fare is required'),
    body('pickup').isString().isLength({min:3}).withMessage('pickup location is required'),
    body('destination').isString().isLength({min:3}).withMessage('destination location is required'),
    makePayment
)


// Route to fetch payment info
router.get('/getPaymentInfo',
    authUser,
    query('sessionId').isString().withMessage('Session id is required'),
    fetchPaymentInfo
)










export default router;