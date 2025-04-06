import { validationResult } from "express-validator";
import { registerReviewService } from "../services/review.service.js";




// Controller to register review
export async function registerReview(req, res) {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, rating, rideId } = req.body;

    try {
        const review = await registerReviewService({ title, description, rating, rideId });

        res.status(201).json({ message: "Review registered successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}