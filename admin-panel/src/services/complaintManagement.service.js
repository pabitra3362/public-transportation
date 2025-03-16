import config from "../config/config";
import axios from 'axios';



// Service to fetch pending compalaints
export async function getPendingComplaints () {
    
    try {
        
        const response = await axios.get(`${config.baseUrl}/api/complaint/pendingComplaints`,{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;

    } catch (error) {
        throw new Error( (error?.response?.data?.message) || (error.message))
    }
};


// Service to update complaint status
export async function updateComplaintStatus ({ complaintId, status}) {
    
    try {
        
        const response = await axios.put(`${config.baseUrl}/api/admin/updateComplaint`,{ complaintId, status },{
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;

    } catch (error) {
        throw new Error( (error?.response?.data?.message) || (error.message))
    }
};

