/**
 * CreateTicketModal Component
 * Modal form for creating new tickets with validation
 */

import React, { useState } from 'react';
import { createTicket } from '../../services/ticketApi';

const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Backlog', 'En cours', 'Validation', 'Archivé'];

export default function CreateTicketModal({ onClose, onCreate }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Low');
    const [status, setStatus] = useState('Backlog');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const newTicket = await createTicket({ title, description, priority, status });
            onCreate(newTicket);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create ticket');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded p-6 w-full max-w-md shadow-lg"
            >
                <h2 className="text-xl font-bold mb-4">Create Ticket</h2>

                {error && <p className="text-red-600 mb-4">{error}</p>}

                <input
                    type="text"
                    placeholder="Title"
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <textarea
                    placeholder="Description"
                    className="w-full mb-3 p-2 border border-gray-300 rounded"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label className="block mb-2">
                    Priority:
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="ml-2 border border-gray-300 rounded p-1"
                    >
                        {PRIORITIES.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="block mb-4">
                    Status:
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="ml-2 border border-gray-300 rounded p-1"
                    >
                        {STATUSES.map((s) => (
                            <option key={s} value={s}>
                                {s}
                            </option>
                        ))}
                    </select>
                </label>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100"
                        disabled={loading}
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Creating...' : 'Create'}
                    </button>
                </div>
            </form>
        </div>
    );
}
