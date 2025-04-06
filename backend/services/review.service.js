import Review from '../models/review.model.js';





// Service to register review
export async function registerReviewService ({title, description, rating, rideId}){
    
    if(!title || !description || !rating || !rideId ){
        throw new Error('All fields are required');
    }

    const review = await Review.create({title, description, rating, rideId});

    return review;
}