/**
 * Dashboard Component
 * Main ticket management interface with Kanban-style columns
 */

import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DragDropContext } from '@hello-pangea/dnd';
import TicketColumn from './TicketColumn';
import CreateTicketModal from './CreateTicketModal';
import TicketDetailsModal from './TicketDetailsModal';
import UserMenu from '../UserMenu';
import LoadingScreen from '../LoadingScreen';
import { AuthContext } from '../../contexts/AuthContext';
import { fetchTickets, updateTicket } from '../../services/ticketApi';

const STATUSES = ['Backlog', 'En cours', 'Validation', 'Archivé'];

export default function Dashboard() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [detailsModalOpen, setDetailsModalOpen] = useState(false);
    const [deletingTicketId, setDeletingTicketId] = useState(null);

    useEffect(() => {
        if (!user) return;

        setLoading(true);
        fetchTickets()
            .then((data) => setTickets(data))
            .catch((err) => {
                console.error('Failed to fetch tickets:', err);
            })
            .finally(() => setLoading(false));
    }, [user]);

    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        const ticketId = parseInt(draggableId, 10);

        setTickets((prevTickets) => {
            const updatedTickets = [...prevTickets];
            const ticketIndex = updatedTickets.findIndex((t) => t.id === ticketId);
            if (ticketIndex !== -1) {
                updatedTickets[ticketIndex] = {
                    ...updatedTickets[ticketIndex],
                    status: destination.droppableId,
                };
            }
            return updatedTickets;
        });

        updateTicket(ticketId, { status: destination.droppableId })
            .catch((err) => {
                console.error('Failed to update ticket status:', err);
            });
    };

    const addTicket = (ticket) => {
        setTickets((prev) => [...prev, ticket]);
    };

    const handleTicketClick = (ticket) => {
        setSelectedTicket(ticket);
        setDetailsModalOpen(true);
    };

    const handleTicketUpdate = (updatedTicket) => {
        setTickets((prev) =>
            prev.map((ticket) =>
                ticket.id === updatedTicket.id ? updatedTicket : ticket
            )
        );
    };

    const handleTicketDelete = (ticketId) => {
        // Start deletion animation
        setDeletingTicketId(ticketId);
        // Close modal immediately to prevent user interaction
        setDetailsModalOpen(false);
        setSelectedTicket(null);
    };

    const handleDeletionComplete = (ticketId) => {
        // Remove ticket from state after animation completes
        setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
        setDeletingTicketId(null);
    };

    const handleAddCard = (status) => {
        setModalOpen(true);
        // Pre-set the status for the new card
        // We'll pass this to CreateTicketModal
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Subtle geometric patterns */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-xl"></div>
                <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-indigo-100/40 to-blue-100/40 rounded-full blur-lg"></div>
                <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-20 right-20 w-28 h-28 bg-gradient-to-br from-blue-100/30 to-indigo-100/30 rounded-full blur-xl"></div>
                
                {/* Floating cards pattern */}
                <div className="absolute top-1/4 right-1/4 opacity-5">
                    <div className="grid grid-cols-3 gap-2 transform rotate-12">
                        {[...Array(9)].map((_, i) => (
                            <div key={i} className={`w-8 h-6 bg-gray-400 rounded ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-indigo-400'}`}></div>
                        ))}
                    </div>
                </div>
                
                {/* Subtle dot pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='10' cy='10' r='1'/%3E%3C/g%3E%3C/svg%3E")`
                }}>
                </div>
            </div>
            {/* Dark Sidebar */}
            <div className="w-64 bg-slate-900 text-white flex-shrink-0">
                <div className="p-6">
                    <div className="flex items-center space-x-3 mb-8">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">TracknFlow</h1>
                            <p className="text-slate-400 text-sm">Workspace</p>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="space-y-2">
                        <button className="flex items-center space-x-3 px-3 py-2 rounded-lg bg-slate-800 text-blue-300 w-full text-left">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0V17m0-10a2 2 0 012 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
                            </svg>
                            <span>Boards</span>
                        </button>
                        <button
                            onClick={() => navigate('/team')}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors w-full text-left"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                            </svg>
                            <span>Team</span>
                        </button>
                        <button
                            onClick={() => navigate('/settings')}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors w-full text-left"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span>Settings</span>
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col relative z-10">
                {/* Header */}
                                <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 px-6 py-4 shadow-sm relative">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Project Board</h1>
                            <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                                <span>Team workspace</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 relative z-[50]">
                            <UserMenu />
                        </div>
                    </div>
                </header>

                {/* Board Content */}
                <div className="flex-1 p-6 overflow-x-auto">
                    {/* Board background with subtle pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-50/20 to-purple-50/20 pointer-events-none"></div>
                    
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <div className="flex space-x-6 min-w-max">{/* Added relative z-10 for proper layering */}
                            {STATUSES.map((status, index) => (
                                <div 
                                    key={status} 
                                    className="w-80 animate-slideIn"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <TicketColumn
                                        status={status}
                                        tickets={tickets.filter((t) => t.status === status)}
                                        onTicketClick={handleTicketClick}
                                        onAddCard={handleAddCard}
                                        deletingTicketId={deletingTicketId}
                                        onDeletionComplete={handleDeletionComplete}
                                    />
                                </div>
                            ))}
                        </div>
                    </DragDropContext>
                </div>
            </div>

            {/* Floating Action Button */}
            <button
                onClick={() => setModalOpen(true)}
                className="fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50"
                aria-label="Add Ticket"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
            </button>

            {modalOpen && (
                <CreateTicketModal
                    onClose={() => setModalOpen(false)}
                    onCreate={(newTicket) => {
                        addTicket(newTicket);
                        setModalOpen(false);
                    }}
                />
            )}

            {detailsModalOpen && selectedTicket && (
                <TicketDetailsModal
                    ticket={selectedTicket}
                    onClose={() => {
                        setDetailsModalOpen(false);
                        setSelectedTicket(null);
                    }}
                    onUpdate={handleTicketUpdate}
                    onDelete={handleTicketDelete}
                />
            )}
        </div>
    );
}
