import Captain from "../models/captain.model.js";


// service for create captain
async function createCaptain({ email, name, password, plate, vehicleType, capacity, file }) {

  if (!email || !name || !password || !color || !plate || !vehicleType || !capacity || !file) {
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
      color: color,
      plate: plate,
      vehicleType: vehicleType,
      capacity: capacity,
    },
  });

  return newCaptain;
  
}


// service for login captian
async function loginCaptain({ email }){

  if( !email ){
    throw new Error("All fields are required.")
  }

  const captain =  await Captain.findOne({ email }).select('+password');

  if(!captain){
    throw new Error("Driver with this email does not exist")
  }

  return captain;

}



// service for forget password
async function forgetPassword({ email }) {

  if(!email){
    throw new Error("All fields are required");
  }

  const captain = await Captain.findOne({ email });

  if(!captain){
    throw new Error("Driver with this email does not exist");
  }

  return captain;

}

export { createCaptain, loginCaptain, forgetPassword };
