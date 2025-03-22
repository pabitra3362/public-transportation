/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Profile from "./Profile";
import Payment from "./Payment";
import RideHistory from "./RideHistory";
import RideTracking from "./Ridetracking";
import Sidebar from "./Sidebar"; // Import Sidebar for Dashboard

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Default sidebar is closed on mobile
  const navigate = useNavigate(); // Use navigate to change routes after selecting a sidebar item

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  const handleSidebarItemClick = () => {
    setIsSidebarOpen(false); // Close the sidebar when a menu item is clicked
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`w-64 bg-gray-800 text-white h-full pt-10 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "block" : "hidden sm:block"
        } sm:block`}
      >
        <Sidebar onSidebarItemClick={handleSidebarItemClick} />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-6 bg-gray-100 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* Mobile Hamburger Icon */}
        <div className="sm:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="text-gray-800 text-3xl focus:outline-none"
          >
            &#9776; {/* Hamburger Icon */}
          </button>
        </div>

        <Routes>
        <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="payment" element={<Payment />} />
          <Route path="ride-history" element={<RideHistory />} />
          <Route path="ride-tracking" element={<RideTracking />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
