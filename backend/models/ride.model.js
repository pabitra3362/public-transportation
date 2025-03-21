import mongoose from 'mongoose';
import moment from 'moment';

const rideSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    captain:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Captain",
    },
    pickup:{
        type: String,
        required: true
    },
    destination:{
        type: String,
        required: true
    },
    fare:{
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status:{
        type: String,
        enum: ["pending", "accepted", "ongoing", "cancelled", "completed"],
        default: "pending"
    },
    duration:{
        type: Number,
    },
    distance:{
        type: Number,
    },
    paymentId:{
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp:{
        type: String,
        select: false,
        require: true
    }
})

const Ride = mongoose.model("ride",rideSchema);

const deleteRides = async () => {
    const date = moment();
    if (date.date() === 1) {
        await Ride.deleteMany({});
    }
}

deleteRides();

export default Ride;