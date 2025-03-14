import { body, query } from "express-validator";
import express from "express";
import { getAdminProfile, getDriverFares, loginAdmin, registerAdmin, adminLogout, forgetAdminPassword, setPassword, getUsers, deleteUser, updateUser, getCaptains, deleteCaptain, updateCaptain, getRides, getCaptain, cancelRide } from "../controller/admin.controller.js";
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
  authAdmin,
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


// GET request for getting all users
router.get('/getUsers',authAdmin, getUsers)

// DELETE request to delete user
router.delete('/deleteUser',
  [
    body('id').isString().withMessage("Please enter a valid id"),
  ],
  authAdmin,
  deleteUser
);


// update request to update user details
router.put('/updateUser',
  [
    body('id').isString().withMessage("Please enter a valid id"),
    body('name').isString().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Please enter a valid email"),
  ],
  authAdmin,
  updateUser
);


// GET request for getting single captain

router.get('/getCaptain',
  [
    query('id').isString().withMessage("Please enter a valid id"),
  ],
  authAdmin,
  getCaptain
);


// GET request for getting all captains
router.get('/getCaptains',authAdmin, getCaptains)

// DELETE request to delete captain
router.delete('/deleteCaptain',
  [
    body('id').isString().withMessage("Please enter a valid id"),
  ],
  authAdmin,
  deleteCaptain
);


// UPDATE request to update captain details
router.put('/updateCaptain',
  [
    body('id').isString().withMessage("Please enter a valid id"),
    body('name').isString().isLength({ min: 3 }).withMessage("Name must be atleast 3 characters long"),
    body('email').isEmail().withMessage("Please enter a valid email"),
  ],
  authAdmin,
  updateCaptain
);


// GET request for getting rides based on status
router.get('/getRides',
  query('status').isString().withMessage('Please enter a valid status'),
  authAdmin,
  getRides
);


// POST request to cancel ride
router.post('/cancelRide',
  body('rideId').isString().withMessage("Invalid ride id"),
  authAdmin,
  cancelRide
);


// GET request to getDriversFares
router.get('/getDriverFares',authAdmin,getDriverFares)


export default router;
