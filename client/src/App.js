/**
 * Main App Component
 * Root component with routing and authentication setup
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Tickets/Dashboard';
import ComingSoon from './pages/ComingSoon';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
              path="/"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
          />
          <Route
              path="/settings"
              element={
                <PrivateRoute>
                  <ComingSoon feature="Settings" />
                </PrivateRoute>
              }
          />
          <Route
              path="/team"
              element={
                <PrivateRoute>
                  <ComingSoon feature="Team" />
                </PrivateRoute>
              }
          />

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
  );
}

export default App;
