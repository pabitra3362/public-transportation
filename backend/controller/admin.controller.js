import { validationResult } from 'express-validator';
import { createAdminService, forgetPassword, loginAdminService } from '../services/admin.service.js';
import Admin from '../models/admin.model.js';
import BlacklistedToken from '../models/blacklistToken.model.js';
import { FPES } from '../utils/emailSender.js';

// Controller for admin register
const registerAdmin = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { name, email, password } = req.body;

  try {
  const hadshedPassword = await Admin.hashPassword(password)
  const admin = await createAdminService({ name, email, password: hadshedPassword });
  const token = admin.generateAuthToken();

  return res.status(201).json({admin,token});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}


// Controller for admin login
const loginAdmin = async (req, res) => {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }

  const { email, password } = req.body;


  try {
    const admin = await loginAdminService({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    admin.password
    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = admin.generateAuthToken();
    res.status(200).json({ admin, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Controller for get profile
const getAdminProfile = async (req, res) => {
  res.status(200).json(req.admin);
}


// Controller for admin logout
const adminLogout = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1] || req.cookies.token;

  if(!token){
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    await BlacklistedToken.create({token})

    res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    return res.status(401).json({ error });
  }
}


// Controller for forget password
async function forgetAdminPassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;
  try {
    const admin = await forgetPassword({ email });
    const emailService = await FPES({ email, name: admin.name, id: admin._id, role:admin.role });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


// Controller for set password
async function setPassword(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id, password } = req.body;

  try {
    const hashedPassword = await Admin.hashPassword(password);
    const updatedUser = await Admin.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}


export { registerAdmin, loginAdmin, getAdminProfile, adminLogout, forgetAdminPassword, setPassword };
