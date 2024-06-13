// src/router/index.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/signin_signup/signin_signup';
import Home from './components/home/home';

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" />

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                
                <Route path="/" element={<Home/>} />
                
                <Route path="/login" element={<Login/>} />
                
            </Routes>
        </Router>
    );
};

export default AppRouter;