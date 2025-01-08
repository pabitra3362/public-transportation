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
async function loginUser({email,password}){
  if(!email || !password){
    throw new Error ("All fields are required")
  }

  const user = await User.findOne({email})
  if(user){
    if(bcrypt.compareSync(user.password,password)){
      return user;
    }else{
      throw new Error("Invalid password")
    }
  }else{
    throw new Error("User doesn't exist")
  }
}

export {createUser}