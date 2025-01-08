import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from "../config/config.js";

async function authUser(req,res,next){
    const token= req.cookies.token || req.headers.authorization.split(' ')[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    try {
        const decode=jwt.decode(token, config.jwtSecret);
        const user = await User.findById(decode._id);

        req.user = user;

        return next();

    } catch (error) {
        return res.status(401).json({message:"Unauthorized"});
    }
}

export {authUser};