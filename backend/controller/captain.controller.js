import Captain from "../models/captain.model.js";
import BlacklistedToken from "../models/blacklistToken.model.js";
import { validationResult } from "express-validator";
import { createCaptain, loginCaptain, forgetPassword, updateCaptainService, getPaymentService, getCurrentRideService, cancelRideService } from "../services/captain.service.js";
import { RES, FPES } from '../utils/emailSender.js';
import emailVerify from "../utils/emailVerify.js";
import { cloudinaryUpload } from '../utils/cloudinary.js'
import { sendMessageToSocketId } from "../socket.js";

// controller for captain registration
const captainRegister = async (req, res) => {
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, name, password, plate, vehicleType, capacity } = req.body;
  

  const file = req.file;

  const uploadedUrl = await cloudinaryUpload(file);

  const hashedPassword = await Captain.hashPassword(password);

  try {

    // const isReal = await emailVerify({email})

    // if(!isReal){
    //   return res.status(400).json({error:"Invalid email address"})
    // }
    
    const captain = await createCaptain({
      email,
      name,
      password: hashedPassword,
      file: uploadedUrl,
      plate,
      vehicleType,
      capacity,
    });

    const emailService = await RES({email, name});

    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller for captain login
const captainLogin = async (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  try {

    const captain = await loginCaptain({ email });

    const isMatch = await captain.comparePassword(password);

    if (!isMatch) {
     return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = captain.generateAuthToken();

    res.status(200).json({ token, captain });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// controller for getCaptainProfile
async function getCaptainProfile( req , res ) {

  return res.status(200).json(req.captain);

}

// controller for logout captain
async function logoutCaptain(req,res) {

  const token =  await req.cookies.token || await req.headers.authorization?.split(" ")[1];

  try {
    
    await BlacklistedToken.create({ token })
    
    res.status(200).json({message:"Logged out successfully"})
    
  } catch (error) {
    res.status(500).json({error})
  }

}


// controller for forget captain password
async function forgetCaptainPassword( req, res ){

  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }

  const {email} = req.body;

  try{
    const captain =  await forgetPassword({email});

    const emailService = await FPES({email,name:captain.name,id:captain._id, role:captain.role})

    res.status(200).json({message:"Email sent successfully"});

  }catch(err){
    res.status(500).json({error:err.message})
  }

}


// controller for set password
async function setPassword( req, res ){
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }

  const {id, password} = req.body;

  try{
    const hashedPassword = await Captain.hashPassword(password);

    const captain = await Captain.findByIdAndUpdate(id, {password:hashedPassword}, {new:true});

    res.status(200).json({message:"Password updated successfully"});

  }catch(err){

    res.status(500).json({error:"Internal server error"});

    console.log("errror in set Password controller: ",err.message);
    
  }
}

// controller for update captain details
async function updateCaptain(req, res) {
  const error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(400).json({error:error.array()});
  }

  const {id, name, email, plate, phone, vehicleType } = req.body;

  const file = req.files?.length > 0 ? req.files[0] : null;

  let uploadedUrl;

  if(file){
    uploadedUrl = await cloudinaryUpload(file);
  }

  try {
    const captain = await updateCaptainService({ id, name, email, plate, phone, vehicleType, file: uploadedUrl });
    
    res.status(200).json({message: 'Driver details updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// controller for fetch all payment history
async function getPayments(req,res){
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.query;

  try {
    
    const payments = await getPaymentService({id})
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// controller to get current ride
async function getCurrentRide (req, res) {
  const errors = validationResult(req);

  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }


  const {id} = req.query;

  try {
    const currentRide = await getCurrentRideService({id})

    res.status(200).json(currentRide)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// controller to cancel ride
async function cancelRide (req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { rideId } = req.body;

  try {
    const ride = await cancelRideService({ rideId });


    sendMessageToSocketId(ride?.user?.socketId, {
      event: "ride-cancelled",
      data: ride,
    });


    res.status(200).json({ message: `Ride cancelled successfully` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { captainRegister , captainLogin , getCaptainProfile , logoutCaptain , forgetCaptainPassword , setPassword, updateCaptain, getPayments, getCurrentRide, cancelRide };
