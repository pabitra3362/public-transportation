import express from "express";
import {body} from 'express-validator';
import userRegister from '../controller/user.controller.js';

const router=express.Router();

// POST request to user register

router.post('/register',[
 body('email').isEmail().withMessage("Email is not valid"),
 body('username').isLength({min:5,max:10}).withMessage("Username must be between 5 to 10 characters long"),
 body('password').isLength({min:7}).withMessage("Password must be atleast 7 characters long"),
],userRegister);






export default router;