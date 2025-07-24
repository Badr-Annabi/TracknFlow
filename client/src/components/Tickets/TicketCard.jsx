/**
 * TicketCard Component
 * Trello-inspired ticket card with priority indicators and interactive elements
 */

import React, { useState, useEffect } from 'react';
import { Draggable } from '@hello-pangea/dnd';

const priorityColors = {
    urgent: 'bg-red-500 border-red-500',
    high: 'bg-red-400 border-red-400',
    medium: 'bg-orange-400 border-orange-400', 
    low: 'bg-green-400 border-green-400',
};

const tagColors = {
    'Brief': 'bg-orange-100 text-orange-800 border-orange-200',
    'Projet Produit SAS': 'bg-pink-100 text-pink-800 border-pink-200',
    'Design': 'bg-blue-100 text-blue-800 border-blue-200',
    'Development': 'bg-purple-100 text-purple-800 border-purple-200',
    'Marketing': 'bg-green-100 text-green-800 border-green-200',
};

export default function TicketCard({ ticket, index, onClick, isDeleting, onAnimationComplete }) {
    const [shouldRender, setShouldRender] = useState(true);
    
    useEffect(() => {
        if (isDeleting) {
            // Start deletion animation
            const timer = setTimeout(() => {
                setShouldRender(false);
                if (onAnimationComplete) {
                    onAnimationComplete();
                }
            }, 500); // Match animation duration
            
            return () => clearTimeout(timer);
        }
    }, [isDeleting, onAnimationComplete]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    // Mock tags and team members for demo
    const mockTags = ['Brief', 'Projet Produit SAS'];

    if (!shouldRender) return null;

    return (
        <Draggable draggableId={ticket.id.toString()} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => onClick(ticket)}
                    className={`
                        bg-white rounded-lg border border-gray-200 p-3 shadow-sm
                        cursor-pointer hover:shadow-md transition-all duration-500
                        ${snapshot.isDragging ? 'rotate-2 shadow-lg ring-2 ring-blue-300 ring-opacity-50' : ''}
                        ${isDeleting ? 'animate-[fadeOutScale_0.5s_ease-in-out_forwards]' : ''}
                    `}
                    style={{
                        ...provided.draggableProps.style,
                        ...(isDeleting && {
                            pointerEvents: 'none',
                        }),
                    }}
                >
                    {/* Priority Indicator */}
                    {ticket.priority && ticket.priority !== 'low' && (
                        <div className={`w-full h-1 ${priorityColors[ticket.priority]} rounded-t-lg mb-3 -mt-3 -mx-3`}></div>
                    )}

                    {/* Tags */}
                    {mockTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                            {mockTags.map((tag, idx) => (
                                <span
                                    key={idx}
                                    className={`px-2 py-1 text-xs font-medium rounded border ${
                                        tagColors[tag] || 'bg-gray-100 text-gray-800 border-gray-200'
                                    }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {/* Title */}
                    <h4 className="text-sm font-medium text-gray-900 mb-2 leading-tight">
                        {ticket.title}
                    </h4>

                    {/* Description (if exists) */}
                    {ticket.description && (
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                            {ticket.description}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-3">
                        {/* Date */}
                        <span className="text-xs text-gray-500">
                            {formatDate(ticket.created_at)}
                        </span>
                    </div>

                    {/* Additional indicators */}
                    <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
                        <div className="flex items-center space-x-2">
                            {/* Comments indicator */}
                            <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                </svg>
                                <span>3</span>
                            </div>
                            
                            {/* Attachments indicator */}
                            <div className="flex items-center space-x-1">
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
                                </svg>
                                <span>2</span>
                            </div>
                        </div>

                        {/* ID */}
                        <span>#{ticket.id}</span>
                    </div>
                </div>
            )}
        </Draggable>
    );
}
