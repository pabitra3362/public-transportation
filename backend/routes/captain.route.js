import express from "express";
import { body } from "express-validator";
import { captainRegister } from '../controller/captain.controller.js';

const router = express.Router();

// route for captain register
router.post("/register", [
  body("email").isEmail().withMessage("Email is not valid"),
  body("username").isLength({ min: 5, max: 10 }).withMessage("Name must be between 5 to 10 characters long"),
  body("password").isLength({ min: 7, max: 12 }).withMessage("Password must be between 7 to 12 characters long"),
  body('vehicle.color').isLength({min:3}).withMessage("Color must be at least 3 characters long"),
  body('vehicle.plate').isLength({min:3}).withMessage("Plate must be at least 3 characters long"),
  body('vehicle.vehicleType').isIn(['car','motorcycle','auto']).withMessage('Invalid vehicle type'),
  body('vehicle.capacity').isInt({min:1}).withMessage('Capacity must be at least 1'),
], captainRegister );

export default router;
