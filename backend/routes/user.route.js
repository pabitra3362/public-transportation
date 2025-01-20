import express from "express";
import {body} from 'express-validator';
import {userRegister, userLogin, getUserProfile, userLogout, forgetUserPassword, setPassword } from '../controller/user.controller.js';
import { authUser } from "../middlewares/auth.middleware.js";

const router=express.Router();

// POST request for user register
router.post('/register',[
 body('email').isEmail().withMessage("Email is not valid"),
 body('name').isLength({min:5}).withMessage("Name must be at least 5 characters long"),
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






export default router;