import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { createUser, getUserByEmail } from '../models/User.js';

dotenv.config();

export const register = async (req, res) => {
    if (!req.body) return res.status(400).json({ message: 'Missing request body' });
    const { username, email, password } = req.body;
    console.log('Registering user:', { username, email });
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(username, email, hashedPassword);

    res.status(201).json({ message: 'User registered', user: { id: user.id, email: user.email } });
};

export const login = async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Login user:', { username, email });
    const user = await getUserByEmail(email);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.status(200).json({ token });
};

export const getMe = async (req, res) => {
    try {
        const { email } = req.user; // From decoded token in middleware

        const user = await getUserByEmail(email);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return res.status(500).json({ message: 'Server error' });
    }
};
