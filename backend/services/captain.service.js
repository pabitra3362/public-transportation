import Captain from "../models/captain.model.js";

async function createCaptain({ email, name, password, color, plate, vehicleType, capacity }) {

  if (!email || !name || !password || !color || !plate || !vehicleType || !capacity ) {
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
      color: color,
      plate: plate,
      vehicleType: vehicleType,
      capacity: capacity,
    },
  });

  return newCaptain;
  
}

export { createCaptain };
