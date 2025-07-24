/**
 * Ticket Model
 * Database operations for ticket management with flexible querying
 */

import pool from '../db/index.js';

/**
 * Create a new ticket
 */
export const createTicket = async (userId, title, description, status, priority) => {
    const result = await pool.query(
        'INSERT INTO tickets (user_id, title, description, status, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, title, description, status, priority]
    );
    return result.rows[0];
};

/**
 * Get all tickets for a specific user
 */
export const getTicketsByUser = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM tickets WHERE user_id = $1',
        [userId]
    );
    return result.rows;
};

/**
 * Update ticket with partial field support
 */
export const updateTicket = async (ticketId, title, description, status, priority) => {
    const fieldsToUpdate = [];
    const values = [];
    let paramCounter = 1;

    if (title !== undefined) {
        fieldsToUpdate.push(`title = $${paramCounter}`);
        values.push(title);
        paramCounter++;
    }
    if (description !== undefined) {
        fieldsToUpdate.push(`description = $${paramCounter}`);
        values.push(description);
        paramCounter++;
    }
    if (status !== undefined) {
        fieldsToUpdate.push(`status = $${paramCounter}`);
        values.push(status);
        paramCounter++;
    }
    if (priority !== undefined) {
        fieldsToUpdate.push(`priority = $${paramCounter}`);
        values.push(priority);
        paramCounter++;
    }

    if (fieldsToUpdate.length === 0) {
        throw new Error('No fields to update');
    }

    values.push(ticketId);
    const query = `UPDATE tickets SET ${fieldsToUpdate.join(', ')} WHERE id = $${paramCounter} RETURNING *`;
    
    const result = await pool.query(query, values);
    return result.rows[0];
};

/**
 * Delete a ticket
 */
export const deleteTicket = async (ticketId) => {
    const result = await pool.query(
        'DELETE FROM tickets WHERE id = $1 RETURNING *',
        [ticketId]
    );
    return result.rows[0];
};

/**
 * Get tickets with optional filtering
 */
export const getTickets = async ({ userId, status, priority }) => {
    let baseQuery = 'SELECT * FROM tickets';
    const conditions = [];
    const values = [];

    if (userId) {
        values.push(userId);
        conditions.push(`user_id = $${values.length}`);
    }
    if (status) {
        values.push(status);
        conditions.push(`status = $${values.length}`);
    }
    if (priority) {
        values.push(priority);
        conditions.push(`priority = $${values.length}`);
    }

    if (conditions.length > 0) {
        baseQuery += ' WHERE ' + conditions.join(' AND ');
    }

    const result = await pool.query(baseQuery, values);
    return result.rows;
};

