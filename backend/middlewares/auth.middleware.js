import User from "../models/user.model.js";
import Captain from "../models/captain.model.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import BlacklistedToken from "../models/blacklistToken.model.js";

// auth middleware for user
async function authUser(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlacklistedToken.findOne({ token });
  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.decode(token, config.jwtSecret);
    const user = await User.findById(decode._id);

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

// auth middleware for captain/driver
async function authCaptain(req, res, next) {
  const token =
    (await req.cookies.token) ||
    (await req.headers.authorization?.split(" ")[1]);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlackListed = await BlacklistedToken.findOne({ token });

  if (isBlackListed) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decode = jwt.decode(token, config.jwtSecret);

    const captain = await Captain.findById(decode._id);

    req.captain = captain;

    return next();
    
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

export { authUser, authCaptain };
