import mongoose from 'mongoose';


const blacklistedTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // 24 hours in seconds
  }
});

const BlacklistedToken = mongoose.model('BlacklistedToken', blacklistedTokenSchema);

export default BlacklistedToken;