/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import DriverProfile from "./DriverProfile";
import DriverEarnings from "./DriverEarnings";
import ActiveTrip from "./ActiveTrip";
import RideRequest from "./RideRequest";
import DriverRideHistory from "./DriverRideHistory";
import SidebarForDriver from "./SidebarForDriver";

const DriverDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1020);
  const [dashboardHeight, setDashboardHeight] = useState("100vh");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1020);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const updateHeight = () => {
      const dashboard = document.getElementById("dashboard");
      if (dashboard) {
        setDashboardHeight(`${dashboard.clientHeight}px`);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSidebarItemClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div id="dashboard" className="flex h-[145vh]">
      {/* Sidebar (Desktop) */}
      {!isMobile && (
        <div
          className="w-64 bg-gray-800 text-white"
          style={{ height: dashboardHeight }}
        >
          <SidebarForDriver onSidebarItemClick={handleSidebarItemClick} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 transition-all duration-300 ease-in-out">
        {/* Mobile Toggle Button */}
        {isMobile && (
          <div className="mb-4">
            <button
              onClick={toggleSidebar}
              className="text-gray-800 text-3xl focus:outline-none"
            >
              &#9776;
            </button>
          </div>
        )}

        {/* Sidebar (Mobile) */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-gray-800 text-white w-64 z-40 pt-10"
            style={{ height: "100vh", overflowY: "auto" }}
          >
            <SidebarForDriver onSidebarItemClick={handleSidebarItemClick} />
          </div>
        )}

        {/* Routes */}
        <Routes>
          <Route path="/" element={<DriverProfile />} />
          <Route path="profile" element={<DriverProfile />} />
          <Route path="earnings" element={<DriverEarnings />} />
          <Route path="active-trip" element={<ActiveTrip />} />
          <Route path="ride-request" element={<RideRequest />} />
          <Route path="driver-ride-history" element={<DriverRideHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default DriverDashboard;
