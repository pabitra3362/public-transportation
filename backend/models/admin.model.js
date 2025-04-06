import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import bcrypt from 'bcrypt';


const adminSchema = new mongoose.Schema({
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
        default: "admin"
      }
      
})

adminSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id, role:this.role}, config.adminJwtSecret, { expiresIn: '24h'})
}

adminSchema.methods.comparePassword = async function ( password ) {
    return await bcrypt.compare(password, this.password)
}

adminSchema.statics.hashPassword = async function( password ){
    return await bcrypt.hash(password, 10)
}


const Admin = mongoose.model('admin',adminSchema);


export default Admin;