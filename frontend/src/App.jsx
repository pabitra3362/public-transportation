/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
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
import Riding from "./pages/Riding";
import DriverHome from "./pages/DriverHome";
import DriverRiding from "./pages/DriverRiding";
import DriverWrapper from "./components/DriverWrapper";
import getProfileData from "./utils/getProfileData";
import { getDriverToken, getUserToken } from "./utils/token";
import { useDispatch } from "react-redux";
import { saveUser } from "./features/auth/userAuthSlice";
import { saveDriver } from "./features/auth/driverAuthSlice";
import PaymentResult from './pages/PaymentResult';



const App = () => {

  const dispatch = useDispatch()
  const userToken = getUserToken();
  const driverToken = getDriverToken();
  useEffect(()=>{
    const fetchUserData = async () =>{
      if(userToken) {
        const {user, token} = await getProfileData({token:userToken})
         dispatch(saveUser({user, token}))
       }else{
         const {driver, token} = await getProfileData({token:driverToken})
         dispatch(saveDriver({driver,token}))
       }
    }

    fetchUserData();
  },[dispatch])

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/drive" element={<Drive />} />
          <Route path="/driver-home" element={<DriverWrapper><DriverHome /></DriverWrapper>} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/team" element={<Team />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contacts />} />
          <Route path="/riding" element={<Riding />} />
          <Route path="/driver-riding" element={<DriverWrapper><DriverRiding /></DriverWrapper>} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/driver-signup" element={<DriverSignUp />} />
          <Route path="/driver-login" element={<DriverLogin />} />
          <Route path="/forgotpassword/:role" element={<ForgotPassword />} />
          <Route path="/login/setNewPassword/:role/:id?" element={<ResetPassword />} />
          <Route path="/payment/:paymentResult" element={<PaymentResult />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;