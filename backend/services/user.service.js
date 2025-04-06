import User from "../models/user.model.js";
import Payment from '../models/payment.model.js';
import Ride from '../models/ride.model.js';

// service for createUser
async function createUser({ email, name, password }) {
  if (!email || !name || !password) {
    throw new Error("All fields are required");

  }
  const existUser= await User.findOne({email})
  if(existUser){
    throw new Error("Account with this email already exist")
  }
  const user = await User.create({ email, name, password });
  return user;
};


// service for loginUser
async function loginUser({email}){
  if(!email){
    throw new Error ("All fields are required")
  }

  const user = await User.findOne({email}).select('+password');
  return user;
  
}

// service for forget user password
async function forgetPassword({email}){
  if(!email){
    throw new Error ("All fields are required")
  }
  const user = await User.findOne({email})
  if(!user){
    throw new Error("User with this email does not exist")
  }
  
  return user;
}

// Service to update user details
async function updateUserService ({ id, name, email, file }) {
  if (!id || !name || !email) {
    throw new Error("All fields are required");
  }
  const user = await User.findByIdAndUpdate(id, file ? {name, email,file} : {name, email}, { new: true });

  if (!user) {
    throw new Error("User with this id does not exist");
  }

  return user;
};

// Service to get all payments
async function getPaymentService ({id}) {
  if (!id) {
    throw new Error("All fields are required");
  }
  const payment = await Payment.find({user: id, status: "complete"});

  return payment;
}

// Service to get all rides
async function getRidesService ({id}) {
  if (!id) {
    throw new Error("All fields are required");
  }

  const rides = await Ride.find({user: id, status:"completed"}).populate('captain');

  return rides;
}


// Service to get current ride
async function getCurrentRideService ({id}) {
  if (!id) {
    throw new Error("All fields are required");
  }

  const rides = await Ride.findOne({user: id, status:"ongoing"}).sort({_id:-1}).populate('captain');

  return rides;
}


// Service to cancel ride
const cancelRideService = async ({ rideId }) => {
  if (!rideId) {
    throw new Error("Rid id is required");
  }

  const detailedRide = await Ride.findOne({_id: rideId }).populate('captain');
  

  if (!detailedRide) {
    throw new Error("Ride with this id does not exist");
  }

  if(detailedRide.status === 'cancelled'){
    throw new Error("Ride is already cancelled");
  }

  await Ride.findOneAndUpdate({_id: rideId},{status: 'cancelled'});
  return detailedRide;
}





export {createUser, loginUser, forgetPassword, updateUserService, getPaymentService, getRidesService, getCurrentRideService, cancelRideService }