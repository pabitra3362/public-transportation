import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending','resolved','rejected'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

complaintSchema.index({ createdAt: 1 }, {
    expireAfterSeconds: 30 * 24 * 60 * 60,
    partialFilterExpression: { status: { $ne: 'pending' } }
})

const Complaint = mongoose.model('complaint', complaintSchema);

export default Complaint;