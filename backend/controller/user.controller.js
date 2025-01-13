import User from "../models/user.model.js";
import { validationResult } from "express-validator";
import {
  createUser,
  loginUser,
  forgetPassword,
} from "../services/user.service.js";
import BlacklistedToken from "../models/blacklistToken.model.js";
import { RES, FPES } from "../utils/emailSender.js";

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
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in userLogin controller: ", err.message);
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

  await BlacklistedToken.create({ token });

  res.status(200).json({ message: "Logged out successfully" });
}

// controller for forget password
async function forgetUserPassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  try {
    const user = await forgetPassword({ email });
    const emailService = await FPES({ email, name: user.name, id: user._id });
    res.status(201).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.log("error in forgetUserPassword controller: ", err.message);
  }
}

// controller for set new password
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
    console.log("error in setPassword controller: ", err.message);
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
