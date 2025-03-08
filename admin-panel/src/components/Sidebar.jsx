import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCar, FaMoneyBill, FaChartLine, FaTag, FaRegFilePowerpoint, FaHeadset } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="h-screen sticky top-0 w-64 bg-gray-800 text-white">
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
                    <Link to="/promotions" className="flex items-center p-4 hover:bg-gray-700">
                        <FaTag className="mr-2" /> Promotions & Discounts
                    </Link>
                </li>
                <li>
                    <Link to="/support" className="flex items-center p-4 hover:bg-gray-700">
                        <FaHeadset className="mr-2" /> Support & Complaints
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
