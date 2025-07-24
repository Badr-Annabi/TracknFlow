/**
 * ComingSoon Component
 * Generic coming soon page for features under development
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ComingSoon({ feature = "This feature" }) {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex">
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

                    <nav className="space-y-2">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors w-full text-left"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0V17m0-10a2 2 0 012 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/>
                            </svg>
                            <span>Boards</span>
                        </button>
                        <button className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                            feature === "Team" ? "bg-slate-800 text-blue-300" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                            </svg>
                            <span>Team</span>
                        </button>
                        <button className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                            feature === "Settings" ? "bg-slate-800 text-blue-300" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            <span>Settings</span>
                        </button>
                    </nav>
                </div>
            </div>

            <div className="flex-1 flex flex-col">
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xl font-semibold text-gray-900">{feature}</h1>
                    </div>
                </header>

                <div className="flex-1 flex items-center justify-center bg-gray-50">
                    <div className="text-center max-w-md">
                        <div className="mb-8">
                            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
                            <p className="text-gray-600 text-lg mb-8">
                                {feature} is currently under development. We're working hard to bring you this feature soon!
                            </p>
                            <div className="space-y-4">
                                <div className="flex justify-center">
                                    <div className="animate-pulse flex space-x-1">
                                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                        <div className="w-3 h-3 bg-blue-600 rounded-full" style={{ animationDelay: '0.2s' }}></div>
                                        <div className="w-3 h-3 bg-blue-600 rounded-full" style={{ animationDelay: '0.4s' }}></div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => navigate('/')}
                                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Back to Dashboard
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
