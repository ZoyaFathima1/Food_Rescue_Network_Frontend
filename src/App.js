import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import RestaurantPage from './components/RestaurantPage';
import AvailableFoodsPage from './components/AvailableFoodsPage';
import NGOPage from './components/NGOPage';
import AddFoodPage from './components/AddFoodPage';
import NGOHomePage from './components/NGOHomePage';
import ForgotPasswordPage from './components/ForgotPasswordPage'; // Import ForgotPasswordPage
import ResetPasswordPage from './components/ResetPasswordPage';
import EventsPage from './components/EventsPage';
import Leaderboard from './components/Leaderboard';
import VerifyReceipt from './components/VerifyReceipt';
import NGODonations from './components/NGODonations';

import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/restaurant" element={<RestaurantPage />} />
                <Route path="/available-foods" element={<AvailableFoodsPage />} />
                <Route path="/ngo-dashboard" element={<NGOPage />} />
                <Route path="/add-food" element={<AddFoodPage />} />
                <Route path="/ngo-home" element={<NGOHomePage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* Add route for ForgotPasswordPage */}
                {/* Add routes for user-specific pages here */}
                <Route path="/signup" element={<RegisterPage />} />
                <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
                <Route path="/events" element={<EventsPage />} />   
                <Route path="/leaderboard" element={<Leaderboard />} /> {/* Ensure this route is defined */}
                <Route path="/verify-receipt" element={<VerifyReceipt />} />
                <Route path="/ngo-donations/:ngoName" element={<NGODonations />} />
            </Routes>
        </Router>
    );
}

export default App;
