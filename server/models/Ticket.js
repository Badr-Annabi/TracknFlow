import pool from '../db/index.js';


export const createTicket = async (userId, title, description, status, priority) => {
    const result = await pool.query(
        'INSERT INTO tickets (user_id, title, description, status, priority) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [userId, title, description, status, priority]
    );
    return result.rows[0];
};

export const getTicketsByUser = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM tickets WHERE user_id = $1',
        [userId]
    );
    return result.rows;
}

export const updateTicket = async (ticketId, title, description, status, priority) => {
    const result = await pool.query(
        `UPDATE tickets 
     SET title = $1, description = $2, status = $3, priority = $4
     WHERE id = $5
     RETURNING *`,
        [title, description, status, priority, ticketId]
    );
    return result.rows[0]; // undefined if no ticket found
};

export const deleteTicket = async (ticketId) => {
    const result = await pool.query(
        `DELETE FROM tickets WHERE id = $1 RETURNING *`,
        [ticketId]
    );
    return result.rows[0]; // undefined if no ticket found
};

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

