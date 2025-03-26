import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import {
  createUser,
  loginUser,
  forgetPassword,
  updateUserService,
  getPaymentService,
  getRidesService,
  getCurrentRideService,
  cancelRideService
} from "../services/user.service.js";
import BlacklistedToken from "../models/blacklistToken.model.js";
import { RES, FPES } from "../utils/emailSender.js";
import { cloudinaryUpload } from '../utils/cloudinary.js';
import { sendMessageToSocketId } from '../socket.js';

// controller for userRegister
async function userRegister(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password } = req.body;
  const hashedPassword = await User.hashPassword(password);
  
  
  try {

    const user = await createUser({
      email,
      name,
      password: hashedPassword,
    });

    await RES({ name, email });

    const token = user.generateAuthToken();
    res.status(201).json({ token, user });
  } catch (err) {
     res.status(500).json({ error: err.message });
  }
}

// controller for userLogin
async function userLogin(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400), json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await loginUser({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.status(200).json({ token, user });
    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// controller for getUserProfile
async function getUserProfile(req, res) {
  res.status(200).json(req.user);
}

// controller for userLogout
async function userLogout(req, res) {

  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

 try {
  
  await BlacklistedToken.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
  
 } catch (error) {
  res.status(500).json({error})
 }
}

// controller for user forget password
async function forgetUserPassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  try {
    const user = await forgetPassword({ email });
    const emailService = await FPES({ email, name: user.name, id: user._id, role:user.role });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// controller for set password
async function setPassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, password } = req.body;

  try {
    const hashedPassword = await User.hashPassword(password);
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// controller for update user details
async function updateUser(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  

  const {id, email, name } = req.body;

  const file = req.files?.length > 0 ? req.files[0] : null;

  let uploadedUrl;

  if(file){
    uploadedUrl = await cloudinaryUpload(file);
  }

  try {
    const updatedUser = await updateUserService({name,email,id,file:uploadedUrl});
    res.status(200).json({ message: "User details updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// controller for fetch all payment history
async function getPayments(req,res){
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    
    const payments = await getPaymentService({id})
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// controller for fetch all rides
async function getRides (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    const rides = await getRidesService({id})
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// controller to get current ride
async function getCurrentRide (req, res) {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }


  const {id} = req.query;

  try {
    const currentRide = await getCurrentRideService({id})

    res.status(200).json(currentRide)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}


// controller to cancel ride
async function cancelRide (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await cancelRideService({ rideId });


    sendMessageToSocketId(ride?.captain?.socketId, {
      event: "ride-cancelled",
      data: ride,
    });


    res.status(200).json({ message: `Ride cancelled successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  userRegister,
  userLogin,
  getUserProfile,
  userLogout,
  forgetUserPassword,
  setPassword,
  updateUser,
  getPayments,
  getRides,
  getCurrentRide,
  cancelRide
};
