import { validationResult } from "express-validator";
import stripe from "stripe";
import config from "../config/config.js";
import Payment from "../models/payment.model.js";

const stripeInstance = new stripe(config.stripeSecret);

// Controller for make payment
const makePayment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fare, ride, pickup, destination } = req.body;

  const session = await stripeInstance.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "inr",
          unit_amount: fare * 100,
          product_data: {
            name: "Safar Taxi Fare",
            description: `Trip from ${pickup} to ${destination}`,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    // success_url: 'https://public-transportation.vercel.app/payment/success',
    // cancel_url:'https://public-transportation.vercel.app/payment/cancel'
    success_url: "http://localhost:5173/payment/success",
    cancel_url: "http://localhost:5173/payment/cancel",
  });

  await Payment.create({
    paymentId: session.id,
    paymentMethod: session.payment_method_types,
    amount: fare,
    status: session.status,
    ride: ride
  });

  return res.json({ id: session.id, url: session.url });
};

// Controller to fetch session info
const fetchPaymentInfo = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { sessionId } = req.query;

  try {
    const session = await stripeInstance.checkout.sessions.retrieve(sessionId);

    return res.status(200).json({ session });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { makePayment, fetchPaymentInfo };
