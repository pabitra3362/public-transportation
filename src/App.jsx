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

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/service" element={<Service />} />
          <Route path="/team" element={<Team />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contacts />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
