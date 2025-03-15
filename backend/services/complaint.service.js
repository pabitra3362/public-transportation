import Complaint from '../models/complaint.model.js';



// Serive to register a complaint
export const registerComplaintService = async ({
    name,
    email,
    subject,
    message
}) => {

    if (!name || !email || !subject || !message) {
        throw new Error("All fields are required");
    }

    const existedComplaint = await Complaint.findOne({email, subject})

    if (existedComplaint && existedComplaint.status === "pending") {
        throw new Error("You have already submitted a complaint with the same email and subject");
    }

    const complaint = Complaint.create({ name, email, subject, message })

    return complaint;
};



// Service to update the complaint
export const updateComplaintService = async ({complaintId,status}) => {

    if(!complaintId || !status){
        throw new Error('All fields are required');
    }

    const complaint = await Complaint.findByIdAndUpdate(complaintId, { status: status }, {new: true});

    return complaint;
};


// Service to get all pending complaints
export const getPendingComplaintService = async () => {
    const complaints = await Complaint.find({ status: 'pending' });

    return complaints;
}


