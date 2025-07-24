/**
 * Login Page
 * User authentication form with email/password in Trello-inspired design
 */

import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};

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

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            await login({ email, password });
            navigate('/');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed';
            if (errorMessage.toLowerCase().includes('email')) {
                setErrors({ email: 'Invalid email address' });
            } else if (errorMessage.toLowerCase().includes('password')) {
                setErrors({ password: 'Incorrect password' });
            } else if (errorMessage.toLowerCase().includes('user not found') || errorMessage.toLowerCase().includes('not found')) {
                setErrors({ email: 'No account found with this email' });
            } else {
                setErrors({ general: errorMessage });
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-300/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-purple-300/20 rounded-full blur-xl animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-indigo-300/20 rounded-full blur-lg animate-bounce" style={{animationDelay: '3s'}}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 opacity-40" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>

            <div className="w-full max-w-6xl flex items-center justify-center relative z-10">
                {/* Left Side - Illustration */}
                <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
                    <div className="text-center text-white space-y-8">
                        {/* Main Illustration */}
                        <div className="relative">
                            <div className="w-96 h-96 mx-auto relative">
                                {/* Floating Cards Illustration */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        {/* Background Cards */}
                                        <div className="absolute -top-8 -left-8 w-32 h-20 bg-white/20 rounded-lg rotate-12 backdrop-blur-sm border border-white/30 animate-float"></div>
                                        <div className="absolute -top-4 -right-12 w-28 h-18 bg-white/15 rounded-lg -rotate-6 backdrop-blur-sm border border-white/30 animate-float" style={{animationDelay: '1s'}}></div>
                                        <div className="absolute -bottom-6 -left-12 w-30 h-20 bg-white/25 rounded-lg rotate-6 backdrop-blur-sm border border-white/30 animate-float" style={{animationDelay: '2s'}}></div>
                                        
                                        {/* Main Kanban Board */}
                                        <div className="w-80 h-60 bg-white/90 rounded-2xl shadow-2xl p-6 backdrop-blur-lg border border-white/50">
                                            <div className="grid grid-cols-3 gap-4 h-full">
                                                {/* Column 1 */}
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <div className="w-full h-2 bg-gray-200 rounded mb-3"></div>
                                                    <div className="space-y-2">
                                                        <div className="w-full h-8 bg-blue-100 rounded border-l-4 border-blue-500"></div>
                                                        <div className="w-3/4 h-8 bg-green-100 rounded border-l-4 border-green-500"></div>
                                                    </div>
                                                </div>
                                                
                                                {/* Column 2 */}
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <div className="w-full h-2 bg-gray-200 rounded mb-3"></div>
                                                    <div className="space-y-2">
                                                        <div className="w-full h-8 bg-yellow-100 rounded border-l-4 border-yellow-500"></div>
                                                        <div className="w-5/6 h-8 bg-purple-100 rounded border-l-4 border-purple-500"></div>
                                                        <div className="w-2/3 h-8 bg-red-100 rounded border-l-4 border-red-500"></div>
                                                    </div>
                                                </div>
                                                
                                                {/* Column 3 */}
                                                <div className="bg-gray-50 rounded-lg p-3">
                                                    <div className="w-full h-2 bg-gray-200 rounded mb-3"></div>
                                                    <div className="space-y-2">
                                                        <div className="w-full h-8 bg-indigo-100 rounded border-l-4 border-indigo-500"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Floating Elements */}
                                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                                            <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm animate-bounce">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
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
                                Organize your work<br />
                                <span className="text-blue-200">beautifully</span>
                            </h2>
                            <p className="text-xl text-blue-100 leading-relaxed max-w-md mx-auto">
                                Track, manage, and collaborate on projects with our intuitive Kanban-style workspace.
                            </p>
                        </div>

                        {/* Feature Points */}
                        <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                                    </svg>
                                </div>
                                <span className="text-white text-sm font-medium">Fast & Intuitive</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                                    </svg>
                                </div>
                                <span className="text-white text-sm font-medium">Team Collaboration</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 max-w-md lg:max-w-lg">
                    {/* Logo and Brand */}
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-2xl backdrop-blur-lg border border-white/20">
                                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                </svg>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">TracknFlow</h1>
                        <p className="text-blue-100">Sign in to your workspace</p>
                    </div>

                    {/* Login Form */}
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
                                            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
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
                                        placeholder="Enter your password"
                                        className={`w-full px-4 py-3 pr-12 rounded-lg border transition-colors ${
                                            errors.password
                                                ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500'
                                                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                                        } focus:outline-none focus:ring-2 focus:ring-opacity-50`}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            if (errors.password) setErrors(prev => ({ ...prev, password: null }));
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

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg"
                            >
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign in'
                                )}
                            </button>

                            {/* Register Link */}
                            <div className="text-center pt-4 border-t border-gray-200">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <Link to="/register" className="text-blue-600 hover:text-purple-600 font-medium hover:underline transition-colors">
                                        Create account
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
