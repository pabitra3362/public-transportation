import Ride from "../models/ride.model.js";
import { sendMessageToSocketId } from "../socket.js";
import { fetchDistanceTime } from "./map.service.js";
import crypto from "crypto";

// function for getfare
const getFareService = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await fetchDistanceTime(pickup, destination);

  const baseFare = {
    auto: 20,
    car: 30,
    moto: 10,
  };

  const perKmRate = {
    auto: 10,
    car: 15,
    moto: 8,
  };

  const perMinuteRate = {
    auto: 2,
    car: 3,
    moto: 1.5,
  };

  const fare = {
    auto: Math.floor(
      baseFare.auto +
        (distanceTime.distance.value / 1000) * perKmRate.auto +
        (distanceTime.duration.value / 60) * perMinuteRate.auto
    ),
    car: Math.floor(
      baseFare.car +
        (distanceTime.distance.value / 1000) * perKmRate.car +
        (distanceTime.duration.value / 60) * perMinuteRate.car
    ),
    moto: Math.floor(
      baseFare.moto +
        (distanceTime.distance.value / 1000) * perKmRate.moto +
        (distanceTime.duration.value / 60) * perMinuteRate.moto
    ),
  };

  return fare;
};

// function for OTP
const getOTP = (num) => {
  const otp = Array.from({ length: num }, () => crypto.randomInt(0, 10)).join(
    ""
  );
  return otp;
};

// Service to create Ride
const createRideService = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const fare = await getFareService(pickup, destination);

  const ride = await Ride.create({
    user,
    pickup,
    destination,
    otp: getOTP(6),
    fare: fare[vehicleType],
  });

  return ride;
};

// Service to confirm ride
const confirmRideService = async ({ rideId, captain }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

// Service to start ride
const startRideService = async ({ rideId, otp, captain }) => {
  if (!rideId || !otp || !captain) {
    throw new Error("Ride id, otp and captain are required");
  }

  const ride = await Ride.findOne({ _id: rideId })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.otp !== otp) {
    throw new Error("Invalid otp");
  }

  if (ride.status !== "accepted") {
    throw new Error("Ride is not accepted");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "ongoing",
    }
  );

  return ride;
};


// Service to end ride
const endRideService = async ({ rideId, captain }) => {
  if (!rideId || !captain) {
    throw new Error("Ride id and captain are required");
  }

  const ride = await Ride.findOne({ _id: rideId, captain: captain._id })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  if (ride.status !== "ongoing") {
    throw new Error("Ride is not ongoing");
  }

  await Ride.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "completed",
    }
  );

  return ride;
};

export {
  createRideService,
  getFareService,
  getOTP,
  confirmRideService,
  startRideService,
  endRideService
};
