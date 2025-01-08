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

userSchema.methods.generateAuthToken = function() {
  return jwt.sign({ _id: this._id }, config.jwtSecret);
};

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = async function(password) {
  return await bcrypt.hash(password, 10);
};

const User = model("User", userSchema);

export default User;
