import Captain from "../models/captain.model.js";
import Payment from "../models/payment.model.js";
import Ride from "../models/ride.model.js";


// service for create captain
async function createCaptain({
  email,
  name,
  password,
  plate,
  vehicleType,
  capacity,
  file,
}) {
  if (
    !email ||
    !name ||
    !password ||
    !plate ||
    !vehicleType ||
    !capacity ||
    !file
  ) {
    throw new Error("All fields are required");
  }

  const existingCaptain = await Captain.findOne({ email });

  if (existingCaptain) {
    throw new Error("Driver with this email already exists");
  }

  const newCaptain = await Captain.create({
    email,
    name,
    password,
    file,
    vehicle: {
      plate: plate,
      vehicleType: vehicleType,
      capacity: capacity,
    },
  });

  return newCaptain;
};

// service for login captian
async function loginCaptain({ email }) {
  if (!email) {
    throw new Error("All fields are required.");
  }

  const captain = await Captain.findOne({ email }).select("+password");

  if (!captain) {
    throw new Error("Driver with this email does not exist");
  }

  return captain;
};

// service for forget password
async function forgetPassword({ email }) {
  if (!email) {
    throw new Error("All fields are required");
  }

  const captain = await Captain.findOne({ email });

  if (!captain) {
    throw new Error("Driver with this email does not exist");
  }

  return captain;
};

// Service to update captain details
async function updateCaptainService({
  id,
  name,
  email,
  file,
  vehicleType,
  plate,
  phone,
}) {
  if (!id || !name || !email || !vehicleType || !plate || !phone) {
    throw new Error("All fields are required");
  }

  const captain = await Captain.updateOne(
    { _id: id },
    file
      ? {
          $set: {
            name,
            email,
            userProfile: file,
            "vehicle.vehicleType": vehicleType,
            "vehicle.plate": plate, 
            phone,
          },
        }
      : {
          $set: {
            name,
            email,
            "vehicle.vehicleType": vehicleType, 
            "vehicle.plate": plate, 
            phone,
          },
        }
  );

  if (!captain.matchedCount) {
    throw new Error("Driver with this id does not exist");
  }

  return captain;
};

// Service to get all payments
async function getPaymentService ({id}) {
  if (!id) {
    throw new Error("All fields are required");
  }
  const payment = await Payment.find({user: id, status: "complete"});

  return payment;
}

// Service to get current ride
async function getCurrentRideService ({id}) {
  if (!id) {
    throw new Error("All fields are required");
  }

  const rides = await Ride.findOne({captain: id, status:"ongoing"}).sort({_id:-1}).populate('user');

  return rides;
}

// Service to cancel ride
const cancelRideService = async ({ rideId }) => {
  if (!rideId) {
    throw new Error("Rid id is required");
  }

  const detailedRide = await Ride.findOne({_id: rideId }).populate('user');
  

  if (!detailedRide) {
    throw new Error("Ride with this id does not exist");
  }

  if(detailedRide.status === 'cancelled'){
    throw new Error("Ride is already cancelled");
  }

  await Ride.findOneAndUpdate({_id: rideId},{status: 'cancelled'});
  return detailedRide;
}



export { createCaptain, loginCaptain, forgetPassword, updateCaptainService, getPaymentService, getCurrentRideService, cancelRideService };
