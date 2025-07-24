/**
 * Ticket API Service
 * Centralized ticket management API calls with authentication
 */

import axios from 'axios';

const API_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/tickets`;

/**
 * Get authentication headers with Bearer token
 */
const getAuthHeaders = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

/**
 * Fetch all tickets for current user
 */
export const fetchTickets = async () => {
    const res = await axios.get(API_URL, getAuthHeaders());
    return res.data;
};

/**
 * Create a new ticket
 */
export const createTicket = async (ticketData) => {
    const res = await axios.post(API_URL, ticketData, getAuthHeaders());
    return res.data;
};

/**
 * Update existing ticket (supports partial updates)
 */
export const updateTicket = async (ticketId, ticketData) => {
    const res = await axios.patch(`${API_URL}/${ticketId}`, ticketData, getAuthHeaders());
    return res.data;
};

/**
 * Delete a ticket
 */
export const deleteTicket = async (ticketId) => {
    const res = await axios.delete(`${API_URL}/${ticketId}`, getAuthHeaders());
    return res.data;
};

/**
 * Fetch filtered tickets by status/priority
 */
export const fetchFilteredTickets = async (filters) => {
    const params = new URLSearchParams(filters).toString();
    const res = await axios.get(`${API_URL}/filtered?${params}`, getAuthHeaders());
    return res.data;
};
