import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserManagement from './pages/UserManagement';
import RideManagement from './pages/RideManagement';
import EarningsPayments from './pages/EarningsPayments';
import ReportsAnalytics from './pages/ReportsAnalytics';
import PromotionsDiscounts from './pages/PromotionsDiscounts';
import SupportComplaints from './pages/SupportComplaints';
import DriverManagement from './pages/DriverManagement';

function App() {
  return (
    <Router>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/drivers" element={<DriverManagement />} />
            <Route path="/rides" element={<RideManagement />} />
            <Route path="/earnings" element={<EarningsPayments />} />
            <Route path="/reports" element={<ReportsAnalytics />} />
            <Route path="/promotions" element={<PromotionsDiscounts />} />
            <Route path="/support" element={<SupportComplaints />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
