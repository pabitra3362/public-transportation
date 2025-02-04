import express from "express";
import { body } from "express-validator";
import { captainRegister , captainLogin , getCaptainProfile , logoutCaptain , forgetCaptainPassword , setPassword } from '../controller/captain.controller.js';
import { authCaptain } from "../middlewares/auth.middleware.js";
import upload from '../middlewares/multer.middleware.js';

const router = express.Router();

// POST route for captain register
router.post("/register", upload.single('file'), [
  body("email").isEmail().withMessage("Email is not valid"),
  body("name").isLength({ min: 3 }).withMessage("Name must be at least 3 characters long"),
  body("password").isLength({ min: 7, max: 12 }).withMessage("Password must be between 7 to 12 characters long"),
  body('plate').isLength({min:10, max: 10}).withMessage("Plate must be 10 characters long"),
  body('vehicleType').isIn(['car','motorcycle','rickshaw']).withMessage('Invalid vehicle type'),
  body('capacity').isInt({min:1,max:8}).withMessage('Capacity must be between 1 and 9'),
], captainRegister );



// POST route for captain login
router.post("/login",[
  body('email').isEmail().withMessage("Email is not valid"),
  body('password').isLength({ min:7, max:12 }).withMessage("Password must be between 7 to 12 characters long"),
], captainLogin);


// GET route for captain profile
router.get('/profile', authCaptain , getCaptainProfile );


// GET route for captain logout
router.get('/logout', authCaptain, logoutCaptain )


// POST route for forgetPassword
router.post('/forgetPassword',[
  body('email').isEmail().withMessage("Email is not valid"),
], forgetCaptainPassword );


// POST route for resetPassword
router.post('/setNewPassword',[
  body('password').isLength({min:7,max:12}).withMessage("Password must be between 7 to 12 characters long")
], setPassword )

export default router;
