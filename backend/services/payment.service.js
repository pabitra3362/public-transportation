import Payment from "../models/payment.model.js";


// Service to save payment information
export const savePayment = async ({paymentId, paymentMethod, amount, status, ride, user, captain }) => {
    if(!paymentId || !paymentMethod || !amount || !status || !ride || !user || !captain) {
        throw new Error("Missing required fields");
    }

    const newPayment = Payment.create({paymentId, paymentMethod, amount, status, ride, user, captain })
    
    return newPayment;
}


// Service to update payment status
export const updatePaymentStatusService = async ({paymentId, status}) => {
    if(!paymentId ||!status){
        throw new Error("Missing required fields");
    }

    const updatedPayment = await Payment.updateOne({paymentId}, {status});

    return updatedPayment;
}