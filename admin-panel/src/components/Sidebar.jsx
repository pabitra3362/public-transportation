import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaCar, FaMoneyBill, FaChartLine, FaTag, FaRegFilePowerpoint, FaHeadset, FaDoorOpen } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { toast , ToastContainer } from 'react-toastify';
import { logoutAdminService } from '../services/admin.service';
import { logoutAdmin } from '../features/adminAuthSlice';


const Sidebar = () => {

    const dispatch = useDispatch()

    const handleLogout = async (params) => {
        try {
            const response = await logoutAdminService();
            if(response){
                dispatch(logoutAdmin())
                window.location.href = '/'
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    
    return (
        <div className="h-screen sticky top-0 w-64 bg-gray-800 text-white">
            <ToastContainer />
            <h2 className="text-2xl font-bold p-4">Admin Panel</h2>
            <ul className="mt-6">
                <li>
                    <Link to="/users" className="flex items-center p-4 hover:bg-gray-700">
                        <FaUser className="mr-2" /> User Management
                    </Link>
                </li>
                <li>
                    <Link to="/drivers" className="flex items-center p-4 hover:bg-gray-700">
                        <FaCar className="mr-2" /> Driver Management
                    </Link>
                </li>
                <li>
                    <Link to="/rides" className="flex items-center p-4 hover:bg-gray-700">
                        <FaMoneyBill className="mr-2" /> Ride Management
                    </Link>
                </li>
                <li>
                    <Link to="/earnings" className="flex items-center p-4 hover:bg-gray-700">
                        <FaChartLine className="mr-2" /> Earnings & Payments
                    </Link>
                </li>
                <li>
                    <Link to="/reports" className="flex items-center p-4 hover:bg-gray-700">
                        <FaRegFilePowerpoint className="mr-2" /> Reports & Analytics
                    </Link>
                </li>
                <li>
                    <Link to="/support" className="flex items-center p-4 hover:bg-gray-700">
                        <FaHeadset className="mr-2" /> Support & Complaints
                    </Link>
                </li>
                <li>
                    <button onClick={handleLogout} className="flex w-full items-center p-4 hover:bg-gray-700">
                        <FaDoorOpen className="mr-2" /> Logout
                    </button>
                </li>
                
            </ul>
        </div>
    );
};

export default Sidebar;
