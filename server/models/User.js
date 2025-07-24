/**
 * User Model
 * Database operations for user management
 */

import pool from '../db/index.js';

/**
 * Create a new user account
 */
export const createUser = async (username, email, hashedPassword) => {
    const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [username, email, hashedPassword]
    );
    return result.rows[0];
};

/**
 * Retrieve user by email address
 */
export const getUserByEmail = async (email) => {
    const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
    );
    return result.rows[0];
};

