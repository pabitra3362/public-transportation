import mongoose,{model} from 'mongoose';

const {Schema}=mongoose;

const blacklistedTokenSchema = new Schema({
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

const BlacklistedToken = model('BlacklistedToken', blacklistedTokenSchema);

export default BlacklistedToken;