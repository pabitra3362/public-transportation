import express from "express";
import {body, query} from 'express-validator';
import {userRegister, userLogin, getUserProfile, userLogout, forgetUserPassword, setPassword, updateUser, getPayments, getRides } from '../controller/user.controller.js';
import { authUser } from "../middlewares/auth.middleware.js";
import upload from '../middlewares/multer.middleware.js';

const router=express.Router();

// POST request for user register
router.post('/register',[
 body('email').isEmail().withMessage("Email is not valid"),
 body('name').isLength({min:3}).withMessage("Name must be at least 3 characters long"),
 body('password').isLength({min:7,max:12}).withMessage("Password must be between 7 to 12 characters long"),
],userRegister);


// POST request for user login
router.post('/login',[
    body('email').isEmail().withMessage("Email is not valid"),
    body('password').isLength({min:7,max:12}).withMessage("Password must be between 7 to 12 characters long"),
], userLogin)


// GET request for user profile
router.get('/profile', authUser, getUserProfile)


// GET request for user logout
router.get('/logout',authUser,userLogout)

// GET request for forget password
router.post('/forgetPassword',[
    body('email').isEmail().withMessage("Email is not valid"),
], forgetUserPassword )

// POST request for set new password
router.post('/setNewPassword',[
    body('password').isLength({min:7,max:12}).withMessage("Password must be between 7 to 12 characters long")
],setPassword)

// PUT request to update user details
router.put('/updateUser',
    upload.any(),
    authUser,
    body('id').isString().withMessage(' Id is required'),
    body('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Email is not valid'),
    updateUser
);

// GET request to user payments
router.get('/getPaymentDetails',
    authUser,
    query('id').isString().withMessage(' Id is required'),
    getPayments
);

// GET request to get all rides
router.get('/getAllRides',
    authUser,
    query('id').isString().withMessage(' Id is required'),
    getRides
)




export default router;