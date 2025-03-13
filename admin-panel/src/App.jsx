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
import Login from './pages/Login';
// import ForgetPassword from './components/ForgetPassword';
import TokenWrapper from './components/TokenWrapper';



function App() {

  const token = localStorage.getItem('token');
  return (
    <Router>
      <div className="flex flex-col md:flex-row">
        {
          token && <Sidebar />
        }
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<Login />} />
            {/* <Route path="/forgetPassword" element={<ForgetPassword />} /> */}
            <Route path="/users" element={<TokenWrapper><UserManagement /></TokenWrapper>} />
            <Route path="/drivers" element={ <TokenWrapper><DriverManagement /></TokenWrapper>} />
            <Route path="/rides" element={ <TokenWrapper><RideManagement /></TokenWrapper>} />
            <Route path="/earnings" element={ <TokenWrapper><EarningsPayments /></TokenWrapper>} />
            <Route path="/reports" element={ <TokenWrapper><ReportsAnalytics /></TokenWrapper>} />
            <Route path="/promotions" element={ <TokenWrapper><PromotionsDiscounts /></TokenWrapper>} />
            <Route path="/support" element={ <TokenWrapper><SupportComplaints /></TokenWrapper>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;