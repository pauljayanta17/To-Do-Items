import "./App.css";
import NavBar from "./components/NavBar";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import UserAccount from "./components/UserAccount";
import AboutUs from './components/AboutUs'
import ContactUs from "./components/ContactUs";
function App() {
  
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/userpage" element={<UserAccount />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LoginPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contactus" element={<ContactUs />} />
      </Routes>
    </Router>
   
  );
}

export default App;
