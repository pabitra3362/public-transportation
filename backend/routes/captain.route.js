import express from "express";
import { body } from "express-validator";
import { captainRegister , captainLogin , getCaptainProfile , logoutCaptain } from '../controller/captain.controller.js';
import { authCaptain } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST route for captain register
router.post("/register", [
  body("email").isEmail().withMessage("Email is not valid"),
  body("name").isLength({ min: 5, max: 10 }).withMessage("Name must be between 5 to 10 characters long"),
  body("password").isLength({ min: 7, max: 12 }).withMessage("Password must be between 7 to 12 characters long"),
  body('color').isLength({min:3}).withMessage("Color must be at least 3 characters long"),
  body('plate').isLength({min:3}).withMessage("Plate must be at least 3 characters long"),
  body('vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
  body('capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
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

export default router;
