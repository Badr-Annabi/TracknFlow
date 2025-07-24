/**
 * LoadingScreen Component
 * Full-screen loading animation with TracknFlow branding
 */

import React from 'react';

export default function LoadingScreen({ message = "Loading..." }) {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 flex items-center justify-center z-50">
            <div className="text-center animate-bounceIn">
                {/* Animated Logo */}
                <div className="relative mb-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/30 animate-glow">
                        <svg className="w-10 h-10 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                        </svg>
                    </div>
                    
                    {/* Orbiting elements */}
                    <div className="absolute inset-0 animate-spin" style={{ animationDuration: '3s' }}>
                        <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 -translate-y-4"></div>
                        <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 translate-y-4"></div>
                        <div className="absolute left-0 top-1/2 w-2 h-2 bg-indigo-400 rounded-full transform -translate-y-1/2 -translate-x-4"></div>
                        <div className="absolute right-0 top-1/2 w-2 h-2 bg-cyan-400 rounded-full transform -translate-y-1/2 translate-x-4"></div>
                    </div>
                </div>

                {/* Brand name */}
                <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    TracknFlow
                </h1>
                <p className="text-gray-600 text-lg mb-8">Project Management Made Simple</p>

                {/* Enhanced loading animation */}
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                
                <p className="text-gray-500 text-sm animate-pulse">{message}</p>

                {/* Progress bar */}
                <div className="mt-6 w-64 mx-auto bg-gray-200 rounded-full h-1 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full animate-pulse" style={{ 
                        width: '100%',
                        animation: 'slideInLeft 2s ease-in-out infinite'
                    }}></div>
                </div>
            </div>
        </div>
    );
}
