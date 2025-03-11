import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Captain from '../models/captain.model.js';

// Service for admin register
const createAdminService = async ({ name, email, password }) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  const existAdmin = await Admin.findOne({ email });

  if (existAdmin) {
    throw new Error("Account with this email already exist");
  }

  const result = await Admin.create({ name, email, password });

  return result;
};

// service for admin login
const loginAdminService = async ({ email }) => {
  if (!email) {
    throw new Error("All fields are required");
  }

  const admin = await Admin.findOne({ email }).select("+password");
  if (!admin) {
    throw new Error("Admin with this email does not exist");
  }

  return admin;
};

// service for forget admin password
async function forgetPassword({ email }) {
  if (!email) {
    throw new Error("All fields are required");
  }
  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Error("Admin with this email does not exist");
  }

  return admin;
}

// Service for getting all users
const getUsersService = async () => {
  const users = await User.find({});

  return users;
};

// Service to delete user
const deleteUserService = async ({ id }) => {
  if (!id) {
    throw new Error("All fields are required");
  }
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    throw new Error("User with this id does not exist");
  }

  return user;
};

// Service to update user details
const updateUserService = async ({ id, name, email }) => {
  if (!id || !name || !email) {
    throw new Error("All fields are required");
  }
  const user = await User.findByIdAndUpdate(id, { name, email }, { new: true });

  if (!user) {
    throw new Error("User with this id does not exist");
  }

  return user;
};


// Service for getting all users
const getCaptainsService = async () => {
  const captains = await Captain.find({});

  return captains;
};

// Service to delete user
const deleteCaptainService = async ({ id }) => {
  if (!id) {
    throw new Error("All fields are required");
  }
  const captain = await Captain.findByIdAndDelete(id);

  if (!captain) {
    throw new Error("Driver with this id does not exist");
  }

  return captain;
};

// Service to update user details
const updateCaptainService = async ({ id, name, email }) => {
  if (!id || !name || !email) {
    throw new Error("All fields are required");
  }
  const captain = await Captain.findByIdAndUpdate(id, { name, email }, { new: true });

  if (!captain) {
    throw new Error("Driver with this id does not exist");
  }

  return captain;
};



export {
  createAdminService,
  loginAdminService,
  forgetPassword,
  getUsersService,
  deleteUserService,
  updateUserService,
  getCaptainsService,
  deleteCaptainService,
  updateCaptainService,
};
