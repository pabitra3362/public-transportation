import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  paymentMethod: { type: Array, required: true },
  paymentDate: { type: Date, required: true, default: Date.now() },
  amount: { type: Number, required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    required: true
  },
  currency: { type: String, required: true, default: "inr" },
  ride: { type: Object, required: true },
});


const Payment = mongoose.model("payment", paymentSchema);

export default Payment;
