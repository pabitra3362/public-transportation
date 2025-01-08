import User from "../models/user.model.js";
import bcrypt from 'bcrypt';

// service for createUser
async function createUser({ email, username, password }) {
  if (!email || !username || !password) {
    throw new Error("All fields are required");

  }
  const existUser= await User.findOne({email})
  if(existUser){
    throw new Error("Email is already exist")
  }
  const user = await User.create({ email, username, password });
  return user;
};


//service for loginUser
async function loginUser({email}){
  if(!email){
    throw new Error ("All fields are required")
  }

  const user = await User.findOne({email}).select('+password');
  return user;
  
}

export {createUser, loginUser}