/**
 * TicketColumn Component
 * Droppable column for ticket status categories with Trello-inspired design
 */

import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TicketCard from './TicketCard';

const columnStyles = {
    'todo': {
        bg: 'bg-gray-50',
        header: 'text-gray-700'
    },
    'in-progress': {
        bg: 'bg-blue-50', 
        header: 'text-blue-700'
    },
    'done': {
        bg: 'bg-green-50',
        header: 'text-green-700'
    }
};

const STATUS_LABELS = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'done': 'Done'
};

export default function TicketColumn({ status, tickets, onTicketClick, onAddCard, deletingTicketId, onDeletionComplete }) {
    const style = columnStyles[status] || columnStyles['todo'];
    
    return (
        <div className="bg-gray-100 rounded-lg p-3">
            {/* Column Header */}
            <div className="flex items-center justify-between mb-4 px-2">
                <h3 className={`font-medium text-sm ${style.header}`}>
                    {STATUS_LABELS[status]}
                </h3>
                <span className="bg-gray-200 text-gray-600 text-xs font-medium px-2 py-1 rounded-full">
                    {tickets.length}
                </span>
            </div>

            <Droppable droppableId={status}>
                {(provided, snapshot) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`min-h-[200px] transition-colors duration-200 rounded-lg ${
                            snapshot.isDraggingOver 
                                ? 'bg-blue-100 ring-2 ring-blue-300 ring-opacity-50' 
                                : style.bg
                        }`}
                    >
                        {tickets.length === 0 && (
                            <div className="flex items-center justify-center h-32 text-gray-400">
                                <div className="text-center">
                                    <svg className="w-8 h-8 mx-auto mb-2 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p className="text-xs">Drop tickets here</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-3 p-2">
                            {tickets.map((ticket, index) => (
                                <div
                                    key={ticket.id}
                                    className="animate-slideUp"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <TicketCard 
                                        ticket={ticket} 
                                        index={index} 
                                        onClick={onTicketClick}
                                        isDeleting={deletingTicketId === ticket.id}
                                        onAnimationComplete={() => onDeletionComplete && onDeletionComplete(ticket.id)}
                                    />
                                </div>
                            ))}
                        </div>

                        {provided.placeholder}
                    </div>
                )}
            </Droppable>

            {/* Add Card Button */}
            <button 
                onClick={() => onAddCard(status)}
                className="w-full mt-3 p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium flex items-center justify-center space-x-2"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                </svg>
                <span>Add a card</span>
            </button>
        </div>
    );
}
