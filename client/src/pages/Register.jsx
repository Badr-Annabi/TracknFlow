/**
 * Register Page
 * User registration form with username/email/password in Trello-inspired design
 */

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        if (!username) {
            newErrors.username = 'Username is required';
        } else if (username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters';
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            newErrors.username = 'Username can only contain letters, numbers, and underscores';
        }

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!password2) {
            newErrors.password2 = 'Please confirm your password';
        } else if (password !== password2) {
            newErrors.password2 = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await register({ username, email, password });
            navigate('/login');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed';
            if (errorMessage.toLowerCase().includes('username')) {
                setErrors({ username: 'Username is already taken' });
            } else if (errorMessage.toLowerCase().includes('email')) {
                setErrors({ email: 'Email is already registered' });
            } else {
                setErrors({ general: errorMessage });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-500 via-teal-600 to-blue-700 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-teal-300/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '3s'}}></div>
                <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-green-300/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '2s'}}></div>
                <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-blue-300/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Geometric Pattern Overlay */}
            <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M20 20L0 0h40L20 20zm0 0L0 40h40L20 20z'/%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="w-full max-w-6xl flex items-center justify-center relative z-10">
                {/* Left Side - Team Collaboration Illustration */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
                    <div className="text-center text-white space-y-8">
                        {/* Main Illustration */}
                        <div className="relative">
                            <div className="w-96 h-96 mx-auto relative">
                                {/* Team Dashboard with Projects */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Background Chat Bubbles */}
                                        <div className="absolute -top-12 -left-16 w-24 h-16 bg-white/20 rounded-2xl rotate-12 backdrop-blur-sm border border-white/30 animate-float flex items-center justify-center">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
                                                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                                <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                                            </div>
                                        </div>
                                        <div className="absolute -top-8 -right-20 w-28 h-12 bg-white/15 rounded-xl -rotate-6 backdrop-blur-sm border border-white/30 animate-float" style={{animationDelay: '1.5s'}}></div>
                                        <div className="absolute -bottom-10 -left-20 w-32 h-14 bg-white/25 rounded-2xl rotate-6 backdrop-blur-sm border border-white/30 animate-float" style={{animationDelay: '2.5s'}}></div>
                                        
                                        {/* Main Team Dashboard */}
                                        <div className="w-80 h-64 bg-white/90 rounded-3xl shadow-2xl p-6 backdrop-blur-lg border border-white/50">
                                            {/* Header with Team Members */}
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <div className="w-20 h-2 bg-gray-300 rounded"></div>
                                                        <div className="w-16 h-1.5 bg-gray-200 rounded mt-1"></div>
                                                    </div>
                                                </div>
                                                <div className="flex -space-x-2">
                                                    <div className="w-7 h-7 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border-2 border-white animate-pulse">
                                                        <div className="w-full h-full rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">A</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-7 h-7 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full border-2 border-white animate-pulse" style={{animationDelay: '0.5s'}}>
                                                        <div className="w-full h-full rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">M</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full border-2 border-white animate-pulse" style={{animationDelay: '1s'}}>
                                                        <div className="w-full h-full rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs font-bold">S</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-7 h-7 bg-gray-200 rounded-full border-2 border-white flex items-center justify-center">
                                                        <span className="text-gray-600 text-xs font-bold">+</span>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Collaborative Project Cards */}
                                            <div className="space-y-3">
                                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-3 border-l-4 border-purple-400 animate-float">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="w-28 h-2 bg-purple-300 rounded mb-2"></div>
                                                            <div className="w-20 h-1.5 bg-purple-200 rounded"></div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="flex -space-x-1">
                                                                <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border border-white"></div>
                                                                <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full border border-white"></div>
                                                            </div>
                                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl p-3 border-l-4 border-green-400 animate-float" style={{animationDelay: '1s'}}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="w-24 h-2 bg-green-300 rounded mb-2"></div>
                                                            <div className="w-18 h-1.5 bg-green-200 rounded"></div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="flex -space-x-1">
                                                                <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full border border-white"></div>
                                                            </div>
                                                            <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-xl p-3 border-l-4 border-blue-400 animate-float" style={{animationDelay: '2s'}}>
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex-1">
                                                            <div className="w-32 h-2 bg-blue-300 rounded mb-2"></div>
                                                            <div className="w-22 h-1.5 bg-blue-200 rounded"></div>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <div className="flex -space-x-1">
                                                                <div className="w-5 h-5 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full border border-white"></div>
                                                                <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full border border-white"></div>
                                                                <div className="w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full border border-white"></div>
                                                            </div>
                                                            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Team Icons */}
                                        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
                                            <div className="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm animate-bounce border border-white/40">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="absolute -bottom-16 right-1/4">
                                            <div className="w-10 h-10 bg-white/25 rounded-xl flex items-center justify-center backdrop-blur-sm animate-bounce border border-white/40" style={{animationDelay: '1s'}}>
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                                </svg>
                                            </div>
                                        </div>

                                        <div className="absolute -left-16 bottom-1/4">
                                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm animate-bounce border border-white/40" style={{animationDelay: '2s'}}>
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Text Content */}
                        <div className="space-y-4">
                            <h2 className="text-4xl font-bold leading-tight">
                                Join your team's<br />
                                <span className="text-green-200">collaborative workspace</span>
                            </h2>
                            <p className="text-xl text-teal-100 leading-relaxed max-w-md mx-auto">
                                Create an account and start collaborating with your team on projects, tasks, and ideas in real-time.
                            </p>
                        </div>

                        {/* Feature Points */}
                        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                    </svg>
                                </div>
                                <span className="text-white text-sm font-medium">Real-time Chat</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                </div>
                                <span className="text-white text-sm font-medium">Project Tracking</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                                    </svg>
                                </div>
                                <span className="text-white text-sm font-medium">Secure & Private</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <span className="text-white text-sm font-medium">Lightning Fast</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Register Form */}
                <div className="w-full lg:w-1/2 max-w-md lg:max-w-lg">
                    {/* Logo and Brand */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-lg border border-white/20">
                                <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 515.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">TracknFlow</h1>
                        <p className="text-teal-100">Create your workspace account</p>
                    </div>

                    {/* Register Form */}
                    <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
                        <form onSubmit={handleSubmit} className="space-y-6">
                        {/* General Error */}
                        {errors.general && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <p className="text-red-800 text-sm">{errors.general}</p>
                                </div>
                            </div>
                        )}

                        {/* Username Field */}
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                placeholder="Choose a username"
                                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                    errors.username
                                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    if (errors.username) setErrors(prev => ({ ...prev, username: null }));
                                }}
                                disabled={isLoading}
                            />
                            {errors.username && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.username}
                                </p>
                            )}
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                                    errors.email
                                        ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                        : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                                } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (errors.email) setErrors(prev => ({ ...prev, email: null }));
                                }}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Create a password"
                                    className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors ${
                                        errors.password
                                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        if (errors.password) setErrors(prev => ({ ...prev, password: null }));
                                        if (errors.password2 && e.target.value === password2) {
                                            setErrors(prev => ({ ...prev, password2: null }));
                                        }
                                    }}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.password}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    id="password2"
                                    type={showPassword2 ? 'text' : 'password'}
                                    placeholder="Confirm your password"
                                    className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors ${
                                        errors.password2
                                            ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                            : 'border-gray-300 focus:border-teal-500 focus:ring-teal-500'
                                    } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                    value={password2}
                                    onChange={(e) => {
                                        setPassword2(e.target.value);
                                        if (errors.password2) setErrors(prev => ({ ...prev, password2: null }));
                                    }}
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword2(!showPassword2)}
                                    disabled={isLoading}
                                >
                                    {showPassword2 ? (
                                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"/>
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            {errors.password2 && (
                                <p className="mt-2 text-sm text-red-600 flex items-center">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    {errors.password2}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-teal-600 to-green-600 text-white py-3 px-4 rounded-lg font-medium hover:from-teal-700 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                    Creating account...
                                </>
                            ) : (
                                'Create account'
                            )}
                        </button>

                        {/* Login Link */}
                        <div className="text-center pt-4 border-t border-gray-200">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-teal-600 hover:text-green-600 font-medium hover:underline transition-colors">
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
