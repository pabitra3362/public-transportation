import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import {
  createUser,
  loginUser,
  forgetPassword,
} from "../services/user.service.js";
import BlacklistedToken from "../models/blacklistToken.model.js";
import { RES, FPES } from "../utils/emailSender.js";
import emailVerify from '../utils/emailVerify.js';

// controller for userRegister
async function userRegister(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password } = req.body;
  const hashedPassword = await User.hashPassword(password);
  
  
  try {
    const isReal = await emailVerify({email});
    console.log(isReal);
    

    if(!isReal){
      return res.status(400).json({error:"Invalid email address"});
    }

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
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

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
  
  res.clearCookie("token");

  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

 try {
  
  await BlacklistedToken.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
  
 } catch (error) {
  return res.status(500).json({error:"Internal server error"})
 }
}

/**
 * @route POST /forgetPassword
 * @param {string} email.body.required - The email of the user requesting password reset
 * @returns {object} 200 - Email sent successfully
 * @returns {object} 400 - Validation errors
 * @returns {object} 500 - Internal server error
 */
async function forgetUserPassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  try {
    const user = await forgetPassword({ email });
    const emailService = await FPES({ email, name: user.name, id: user._id });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * @route POST /setNewPassword
 * @param {string} id.body.required - The ID of the user
 * @param {string} password.body.required - The new password
 * @returns {object} 200 - Password updated successfully
 * @returns {object} 400 - Validation errors
 * @returns {object} 500 - Internal server error
 */
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

export {
  userRegister,
  userLogin,
  getUserProfile,
  userLogout,
  forgetUserPassword,
  setPassword,
};
