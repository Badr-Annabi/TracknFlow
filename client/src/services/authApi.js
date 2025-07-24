/**
 * Authentication API Service
 * Handles all authentication-related API calls
 */

import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/auth`;

/**
 * Login user with email and password
 */
export const loginUser = async ({ username, email, password }) => {
    const res = await axios.post(`${API_URL}/login`, { username, email, password });
    return res.data;
};

/**
 * Register new user account
 */
export const registerUser = async ({ username, email, password }) => {
    const res = await axios.post(`${API_URL}/register`, { username, email, password });
    return res.data;
};

/**
 * Fetch current user profile
 */
export const fetchUserProfile = async (token) => {
    const res = await axios.get(`${API_URL}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};
