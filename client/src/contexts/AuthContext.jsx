/**
 * Authentication Context
 * Global state management for user authentication
 */

import React, { createContext, useState, useEffect } from 'react';
import { loginUser, registerUser, fetchUserProfile } from '../services/authApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserProfile(token)
                .then((data) => setUser(data.user || data))
                .catch((err) => {
                    console.error('Failed to fetch user profile:', err);
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (credentials) => {
        const data = await loginUser(credentials);
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    const register = async (credentials) => {
        const data = await registerUser(credentials);
        localStorage.setItem('token', data.token);
        setUser(data.user);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
