import { body } from "express-validator";
import express from "express";
import { getAdminProfile, loginAdmin, registerAdmin, adminLogout, forgetAdminPassword, setPassword } from "../controller/admin.controller.js";
import { authAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

// POST Route for register admin
router.post(
  "/registerAdmin",
  [
    body("name")
      .isString()
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 7 })
      .withMessage("Password must be atleast 7 characters long"),
  ],
  registerAdmin
);


// POST Route for admin Login
router.post("/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isString().withMessage(' password must be atleast 7 characters long')
  ],
  loginAdmin);


// GET Route for get admin profile
router.get('/profile', authAdmin, getAdminProfile);


// GET Route for admin logout
router.get('/logout',authAdmin, adminLogout);


// GET request for forget password
router.post('/forgetPassword',[
    body('email').isEmail().withMessage("Email is not valid"),
], forgetAdminPassword )

// POST request for set new password
router.post('/setNewPassword',[
    body('password').isLength({min:7,max:12}).withMessage("Password must be between 7 to 12 characters long")
],setPassword)


export default router;
