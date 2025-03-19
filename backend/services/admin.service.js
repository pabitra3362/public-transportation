import Admin from "../models/admin.model.js";
import User from "../models/user.model.js";
import Captain from '../models/captain.model.js';
import Ride from '../models/ride.model.js';

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



// Service to get single captain details
const getCaptainService = async ({ id }) => {
  if (!id) {
    throw new Error("All fields are required");
  }

  const captain = await Captain.findOne({ _id: id });
  if (!captain) {
    throw new Error("Driver with this id does not exist");
  }

  return captain;
}


// Service for getting all captains
const getCaptainsService = async () => {
  const captains = await Captain.find({});

  return captains;
};

// Service to delete captain
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

// Service to update captain details
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


// Serive to get rides based on status
const getRidesService = async({status}) => {
  if (!status) {
    throw new Error("Status is required");
  }

  if(status === 'all'){
    return await Ride.find({}).populate('captain').populate('user');
  }

  const rides = await Ride.find({ status }).populate('captain').populate('user');

  return rides;
}


// Servuce to cancel ride
const cancelRideService = async ({ rideId }) => {
  if (!rideId) {
    throw new Error("Rid id is required");
  }

  const detailedRide = await Ride.findOne({_id: rideId }).populate("user");
  

  if (!detailedRide) {
    throw new Error("Ride with this id does not exist");
  }

  if(detailedRide.status === 'cancelled'){
    throw new Error("Ride is already cancelled");
  }

  await Ride.findOneAndUpdate({_id: rideId},{status: 'cancelled'});
  return detailedRide;
}


// Service to get count of rides and active drivers
const activeDriverService = async () => {
  
  const rides = await Ride.find({ status: 'completed' })
  const activeDrivers = await Captain.find({ status: "active" })

  return {
    ridesCount: rides.length,
    activeDriversCount: activeDrivers.length
  }
}



export {
  createAdminService,
  loginAdminService,
  forgetPassword,
  getUsersService,
  deleteUserService,
  updateUserService,
  getCaptainService,
  getCaptainsService,
  deleteCaptainService,
  updateCaptainService,
  getRidesService,
  cancelRideService,
  activeDriverService
};
