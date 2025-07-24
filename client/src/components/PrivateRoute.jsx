/**
 * PrivateRoute Component
 * Protects routes that require authentication
 */

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        // You can replace this with a spinner or skeleton loader if you want
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (!user) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render children if authenticated
    return children;
}
