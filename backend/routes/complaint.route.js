import express from 'express';
import { body } from 'express-validator';
import { fetchComplaints, registerComplaint } from '../controller/complaint.controller.js';
import { authAdmin } from '../middlewares/auth.middleware.js';


const router = express.Router();


// POST request for register complaint
router.post('/register',
    body('name').isString().isLength({min: 3}).withMessage('Please enter a name'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('subject').isString().isLength({min: 3}).withMessage('Please enter a subject'),
    body('message').isString().isLength({min: 3}).withMessage('Please enter a message'),
    registerComplaint
);


// GET request to get all pending compalints
router.get('/pendingComplaints', authAdmin, fetchComplaints);






export default router;