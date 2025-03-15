import mongoose from 'mongoose';


const complaintSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    subject: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    status: {
        type: String,
        enum: ['pending','resolved','rejected'],
        default: 'pending'
    },
    CreatedAt: {
        type: Date,
        default: Date.now,
        expires: 30 * 24 * 60 * 60
      }
})


const Complaint = mongoose.model('complaint', complaintSchema);

export default Complaint;