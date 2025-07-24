/**
 * TicketDetailsModal Component
 * Expanded view of ticket with edit and delete functionality
 */

import React, { useState } from 'react';
import { updateTicket, deleteTicket } from '../../services/ticketApi';

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Backlog', 'En cours', 'Validation', 'Archivé'];

export default function TicketDetailsModal({ ticket, onClose, onUpdate, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const [title, setTitle] = useState(ticket.title);
    const [description, setDescription] = useState(ticket.description);
    const [priority, setPriority] = useState(ticket.priority);
    const [status, setStatus] = useState(ticket.status);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const updatedTicket = await updateTicket(ticket.id, {
                title,
                description,
                priority,
                status
            });
            onUpdate(updatedTicket);
            setIsEditing(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update ticket');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        setLoading(true);
        try {
            await deleteTicket(ticket.id);
            onDelete(ticket.id);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to delete ticket');
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const priorityColors = {
        High: 'bg-red-100 text-red-800 border-red-300',
        Medium: 'bg-orange-100 text-orange-800 border-orange-300',
        Low: 'bg-green-100 text-green-800 border-green-300'
    };

    const statusColors = {
        'Backlog': 'bg-gray-100 text-gray-800 border-gray-300',
        'En cours': 'bg-blue-100 text-blue-800 border-blue-300',
        'Validation': 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'Archivé': 'bg-green-100 text-green-800 border-green-300'
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto animate-slideIn">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditing ? 'Edit Ticket' : 'Ticket Details'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded animate-shake">
                            {error}
                        </div>
                    )}

                    {isEditing ? (
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="4"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                                    <select
                                        value={priority}
                                        onChange={(e) => setPriority(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        {PRIORITIES.map((p) => (
                                            <option key={p} value={p}>{p}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                                    <select
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    >
                                        {STATUSES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{ticket.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{ticket.description}</p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Priority</span>
                                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mt-1 ${priorityColors[ticket.priority]}`}>
                                        {ticket.priority}
                                    </div>
                                </div>

                                <div>
                                    <span className="text-sm font-medium text-gray-500">Status</span>
                                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border mt-1 ${statusColors[ticket.status]}`}>
                                        {ticket.status}
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-gray-500">
                                <div>
                                    <span className="font-medium">Created:</span>
                                    <div>{formatDate(ticket.created_at)}</div>
                                </div>
                                <div>
                                    <span className="font-medium">Updated:</span>
                                    <div>{formatDate(ticket.updated_at)}</div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-4 border-t border-gray-200">
                                <button
                                    onClick={handleDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? 'Deleting...' : 'Delete Ticket'}
                                </button>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Edit Ticket
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
