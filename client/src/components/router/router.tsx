import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../signin_signup/signin_signup';
import Home from '../home/home';
import User from '../user/user';
import Admin from '../admin/admin';

const PrivateRoute = ({ children, role }: { children: JSX.Element, role: number }) => {
    const userRole = parseInt(localStorage.getItem('role') || '0', 10);

    if (userRole !== role) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const AppRouter: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={
                    <PrivateRoute role={0}>
                        <User />
                    </PrivateRoute>
                } />
                <Route path="/admin" element={
                    <PrivateRoute role={1}>
                        <Admin />
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
};

export default AppRouter;
