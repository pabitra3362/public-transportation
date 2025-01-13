import Captain from "../models/captain.model.js";

async function createCaptain({ email, name, password, vehicle }) {
  if (!email || !name || !password || !vehicle) {
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
    vehicle: {
      color: vehicle.color,
      plate: vehicle.plate,
      vehicleType: vehicle.vehicleType,
      capacity: vehicle.capacity,
    },
  });

  return newCaptain;
}

export { createCaptain };
