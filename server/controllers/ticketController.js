import {
    createTicket,
    getTicketsByUser,
    updateTicket,
    deleteTicket,
    getTickets
} from '../models/Ticket.js';

export const create = async (req, res) => {
    const { title, description, status, priority } = req.body;
    const ticket = await createTicket(req.user.id, title, description, status, priority);
    res.status(201).json(ticket);
};

export const list = async (req, res) => {
    const tickets = await getTicketsByUser(req.user.id);
    res.status(200).json(tickets);
};

export const update = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    // Optionally, fetch the ticket first to check ownership
    const ticket = await updateTicket(id, title, description, status, priority);
    if (!ticket || ticket.user_id !== req.user.id) {
        return res.status(404).json({ message: 'Ticket not found or unauthorized' });
    }
    res.status(200).json(ticket);
};

export const remove = async (req, res) => {
    const { id } = req.params;
    const ticket = await deleteTicket(id);
    if (!ticket || ticket.user_id !== req.user.id) {
        return res.status(404).json({ message: 'Ticket not found or unauthorized' });
    }
    res.status(200).json({ message: 'Ticket deleted', ticket });
};

export const listFiltered = async (req, res) => {
    const { status, priority } = req.query;
    const userId = req.user.id;
    const tickets = await getTickets({ userId, status, priority });
    res.status(200).json(tickets);
};
