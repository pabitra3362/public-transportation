import { validationResult } from "express-validator";
import stripe from 'stripe';
import config from "../config/config.js";


const stripeInstance = new stripe(config.stripeSecret);


// Controller for make payment
const makePayment = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    const { fare, pickup, destination } = req.body;

    const session = await stripeInstance.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    unit_amount: fare * 100,
                    product_data: {
                        name: 'Safar Taxi Fare',
                        description: `Trip from ${pickup} to ${destination}`
                    }
                },
                quantity: 1
            }
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url:'http://localhost:5173/cancel'
    })


    return res.json({id: session.id})

}


export {makePayment};