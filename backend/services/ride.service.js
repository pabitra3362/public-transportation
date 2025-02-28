import Ride from "../models/ride.model.js";
import { fetchDistanceTime } from "./map.service.js";
import crypto from "crypto";

// function for getfare
const getFareService = async (pickup, destination) => {
  if (!pickup || !destination) {
    throw new Error("Pickup and Destination are required");
  }

  const distanceTime = await fetchDistanceTime(pickup, destination);

  const baseFare = {
    auto: 30,
    car: 50,
    moto: 20,
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
const confirmRideService = async ({rideId, captain}) => {
  if(!rideId){
    throw new Error("Ride id is required");
  }

  await Ride.findOneAndUpdate({
    _id: rideId,
  },{
    status: 'accepted',
    captain: captain._id
  })

  const ride = await Ride.findOne({_id: rideId}).populate('user')

  if(!ride){
    throw new Error('Ride not found');
  }

  return ride;

}


export { createRideService, getFareService, getOTP, confirmRideService };
