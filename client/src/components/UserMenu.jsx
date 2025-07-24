/**
 * UserMenu Component
 * Compact user menu with logout functionality for inline use
 */

import React, { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function UserMenu() {
    const { user, logout } = useContext(AuthContext);
    const [showUserMenu, setShowUserMenu] = useState(false);

    const handleLogout = () => {
        console.log('Logout button clicked');
        logout();
        setShowUserMenu(false);
    };

    return (
        <div className="relative">
            {/* User Menu Button */}
            <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">
                        {user?.username?.charAt(0).toUpperCase() || 'U'}
                    </span>
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">{user?.username}</span>
                <svg 
                    className={`w-4 h-4 text-gray-500 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-slideIn">
                    <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">
                                    {user?.username?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            </div>
                            <div>
                                <div className="text-sm font-semibold text-gray-900">{user?.username}</div>
                                <div className="text-xs text-gray-500">{user?.email}</div>
                            </div>
                        </div>
                    </div>
                    
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-3 group"
                    >
                        <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            )}

            {/* Click outside to close menu */}
            {showUserMenu && (
                <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowUserMenu(false)}
                ></div>
            )}
        </div>
    );
}
