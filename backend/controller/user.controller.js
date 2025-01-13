import User from '../models/user.model.js';
import {validationResult} from 'express-validator';
import createUser from '../services/user.service.js';


export default async function userRegister (req,res,next) {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }

    const {email,username,password}=req.body;
    const tempuser=new User();
    const hashedPassword=await tempuser.hashPassword(password)

    try{
        const user=await createUser({email,username,password:hashedPassword});
        res.status(201).json({user});
    }catch(err){
        res.status(500).json({error:err.message});
        console.log("error while registering user: ",err.message);
    }
}


