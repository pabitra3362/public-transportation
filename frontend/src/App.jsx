/* eslint-disable no-unused-vars */
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Service from "./pages/Service";
import Team from "./pages/Team";
import News from "./pages/News";
import Contacts from "./pages/Contacts";
import Footer from "./components/Footer";
import UserSignUp from "./pages/UserSignUp";
import UserLogin from "./pages/UserLogin";
import ForgotPassword from "./pages/ForgotPassword";
import DriverSignUp from "./pages/DriverSignUp";
import DriverLogin from "./pages/DriverLogin";
import ResetPassword from "./pages/ResetPassword";
import Drive from "./pages/Drive";

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drive" element={<Drive />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/team" element={<Team />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/driver-signup" element={<DriverSignUp />} />
          <Route path="/driver-login" element={<DriverLogin />} />
          <Route path="/forgotpassword/:role" element={<ForgotPassword />} />
          <Route path="/login/setNewPassword/:role/:id?" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
