/**
 * Ticket Controller
 * Handles CRUD operations for tickets with user authorization
 */

import {
    createTicket,
    getTicketsByUser,
    updateTicket,
    deleteTicket,
    getTickets
} from '../models/Ticket.js';

/**
 * Create a new ticket
 */
export const create = async (req, res) => {
    try {
        const { title, description, status, priority } = req.body;
        
        if (!title || !description) {
            return res.status(400).json({ message: 'Title and description are required' });
        }
        
        const ticket = await createTicket(
            req.user.id, 
            title, 
            description, 
            status || 'todo', 
            priority || 'low'
        );
        res.status(201).json(ticket);
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Get all tickets for the authenticated user
 */
export const list = async (req, res) => {
    try {
        const tickets = await getTicketsByUser(req.user.id);
        res.status(200).json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Update an existing ticket (supports partial updates)
 */
export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, priority } = req.body;
        
        const existingTickets = await getTicketsByUser(req.user.id);
        const userTicket = existingTickets.find(ticket => ticket.id == id);
        
        if (!userTicket) {
            return res.status(404).json({ message: 'Ticket not found or unauthorized' });
        }
        
        const ticket = await updateTicket(id, title, description, status, priority);
        res.status(200).json(ticket);
    } catch (error) {
        console.error('Error updating ticket:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Delete a ticket
 */
export const remove = async (req, res) => {
    try {
        const { id } = req.params;
        
        const existingTickets = await getTicketsByUser(req.user.id);
        const userTicket = existingTickets.find(ticket => ticket.id == id);
        
        if (!userTicket) {
            return res.status(404).json({ message: 'Ticket not found or unauthorized' });
        }
        
        const ticket = await deleteTicket(id);
        res.status(200).json({ message: 'Ticket deleted', ticket });
    } catch (error) {
        console.error('Error deleting ticket:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/**
 * Get filtered tickets by status and/or priority
 */
export const listFiltered = async (req, res) => {
    const { status, priority } = req.query;
    const userId = req.user.id;
    const tickets = await getTickets({ userId, status, priority });
    res.status(200).json(tickets);
};
