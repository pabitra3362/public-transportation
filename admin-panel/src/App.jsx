import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserManagement from './pages/UserManagement';
import RideManagement from './pages/RideManagement';
import EarningsPayments from './pages/EarningsPayments';
import ReportsAnalytics from './pages/ReportsAnalytics';
import SupportComplaints from './pages/SupportComplaints';
import DriverManagement from './pages/DriverManagement';
import Login from './pages/Login';
import ForgetPassword from './components/ForgetPassword';
import TokenWrapper from './components/TokenWrapper';
import ResetPassword from './components/ResetPassword';
import LiveDirection from './components/LiveDirection';
import SignUp from './pages/SignUp';



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
            <Route path='/register' element={<SignUp />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/login/setNewPassword/admin/:id?" element={<ResetPassword />} />
            <Route path="/users" element={<TokenWrapper><UserManagement /></TokenWrapper>} />
            <Route path="/drivers" element={ <TokenWrapper><DriverManagement /></TokenWrapper>} />
            <Route path="/rides" element={ <TokenWrapper><RideManagement /></TokenWrapper>} />
            <Route path="/earnings" element={ <TokenWrapper><EarningsPayments /></TokenWrapper>} />
            <Route path="/reports" element={ <TokenWrapper><ReportsAnalytics /></TokenWrapper>} />
            <Route path="/support" element={ <TokenWrapper><SupportComplaints /></TokenWrapper>} />
            <Route path="/live-direction/:id" element={ <TokenWrapper><LiveDirection /></TokenWrapper>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;