import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const captainSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    minlength: [3, "Name must be atleast 3 charcters long"],
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

  role: {
    type: String,
    default: "captain",
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },

  file: {
    type: String,
    required: true,
  },

  earning: {
    type: Number,
    default: 0,
    expires: 30 * 24 * 60 * 60,
  },

  hoursOnline: {
    type: Number,
    default: 0,
    expires: 24 * 60 * 60,
  },

  totalDistance: {
    type: Number,
    default: 0,
    expires: 30 * 24 * 60 * 60,
  },

  totalJobs: {
    type: Number,
    default: 0,
    expires: 30 * 24 * 60 * 60,
  },


  vehicle: {
    plate: {
      type: String,
      required: true,
      minlength: [10, "Plate number must be 10 characters long"],
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "rickshaw"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "Capacity must be atleast 1"],
      maxlength: [8, "Capacity must be less than 9"],
    },
  },

  location: {
    ltd: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id, role: this.role }, config.jwtSecret, {
    expiresIn: "24h",
  });
};

captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

export default mongoose.model("Captain", captainSchema);
