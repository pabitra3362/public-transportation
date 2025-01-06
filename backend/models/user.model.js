import mongoose, { model } from "mongoose";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import bcrypt from "bcrypt";

const {Schema} = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
    minlength: [5, "Username must be atleast 5 charcters long"],
    maxlength: [11, "Username must be less than 11 characters long"],
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: [7, "Password must be atleast 7 characters long"],
    select: false,
  },
  socketId: {
    type: String,
  },
});

userSchema.methods.generateAuthToken = () => {
  return jwt.sign({ _id: this._id }, config.jwtSecret);
};

userSchema.methods.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};

userSchema.statics.comparePassword = async function (hashPassword) {
  return await bcrypt.compare(hashPassword, this.password);
};

export default model("User", userSchema);
