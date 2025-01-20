import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const captainSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: [5, "Name must be atleast 5 charcters long"],
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
  
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Vehicle color must be atleast 3 characters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "Plate number must be atleast 3 characters long"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "bike"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "Capacity must be atleast 1"],
    },
  },

  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
  
});

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, config.jwtSecret, { expiresIn: '24h' });
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export default mongoose.model("Captain", captainSchema);
