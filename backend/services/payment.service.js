import Payment from "../models/payment.model.js";


// Service to save payment information
export const savePayment = async ({paymentId, paymentMethod, amount, status, ride}) => {
    if(!paymentId || !paymentMethod || !amount || !status || !ride){
        throw new Error("Missing required fields");
    }

    const newPayment = Payment.create({paymentId, paymentMethod, amount, status, ride})
    
    return newPayment;
}


// Service to update payment status
export const updatePaymentStatusService = async ({paymentId, status}) => {
    if(!paymentId ||!status){
        throw new Error("Missing required fields");
    }

    const updatedPayment = await Payment.findOne({paymentId}, {status});

    return updatedPayment;
}