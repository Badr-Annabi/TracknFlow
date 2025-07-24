# TracknFlow Documentation

## Project Overview
TracknFlow is a full-stack ticket management system built with React frontend and Express.js backend. It features user authentication, ticket creation, and a vibrant Kanban-style drag-and-drop interface with Trello-inspired design.

## Architecture
- **Frontend**: React with Context API for state management
- **Backend**: Express.js with PostgreSQL database
- **Authentication**: JWT-based authentication
- **UI**: Tailwind CSS with vibrant gradient themes and smooth animations
- **Features**: Drag-and-drop, ticket editing, delete functionality, responsive design

## Quick Start
1. Start backend: `cd server && node server.js`
2. Start frontend: `cd client && npm start`
3. Visit: `http://localhost:3000`

---

## Backend Documentation

### Core Files

#### `server/server.js`
Main Express application entry point.
- Configures CORS for frontend communication
- Sets up middleware for JSON parsing and authentication
- Defines API routes and error handling
- Includes health check endpoint at `/health`

#### `server/routes/authRoutes.js`
Authentication route definitions following REST conventions.
- `POST /register` - User registration
- `POST /login` - User login  
- `GET /me` - Get current user profile

#### `server/routes/ticketRoutes.js`
Ticket management routes with authentication middleware.
- `GET /` - List user's tickets
- `POST /` - Create new ticket
- `PATCH /:id` - Update ticket (supports partial updates)
- `DELETE /:id` - Delete ticket
- `GET /filtered` - Get filtered tickets by status/priority

#### `server/controllers/authController.js`
Authentication business logic.
- Password hashing with bcrypt
- JWT token generation and validation
- User registration and login handling
- Profile retrieval with authentication

#### `server/controllers/ticketController.js`
Ticket management business logic.
- CRUD operations for tickets
- User authorization checks
- Error handling and validation
- Supports partial updates for drag-and-drop

#### `server/models/User.js`
User database operations using PostgreSQL.
- `createUser()` - Create new user account
- `getUserByEmail()` - Retrieve user by email

#### `server/models/Ticket.js`
Ticket database operations with dynamic query building.
- `createTicket()` - Create new ticket
- `getTicketsByUser()` - Get user's tickets
- `updateTicket()` - Flexible update supporting partial changes
- `deleteTicket()` - Remove ticket
- `getTickets()` - Advanced filtering by user/status/priority

#### `server/middleware/authMiddleware.js`
JWT authentication middleware.
- Validates Bearer tokens
- Attaches user info to request object
- Handles authentication errors

#### `server/db/index.js`
PostgreSQL connection pool configuration.
- Uses environment variables for database credentials
- Exports configured connection pool

---

## Frontend Documentation

### Core Components

#### `client/src/App.js`
Main application component with routing.
- Sets up React Router for navigation
- Wraps app with AuthProvider for global state
- Defines protected and public routes

#### `client/src/contexts/AuthContext.jsx`
Global authentication state management.
- Manages user login/logout state
- Handles token storage in localStorage
- Provides authentication methods to components
- Includes token validation and error handling

#### `client/src/components/PrivateRoute.jsx`
Route protection component.
- Redirects unauthenticated users to login
- Shows loading state during authentication check

### Authentication Pages

#### `client/src/pages/Login.jsx`
User login form component.
- Email/password form with validation
- Integration with AuthContext for login
- Navigation to registration page

#### `client/src/pages/Register.jsx`
User registration form component.
- Username/email/password form
- Account creation with immediate login
- Navigation to login page

### Ticket Management

#### `client/src/components/Header.jsx`
Navigation header with vibrant gradient design.
- User profile dropdown with avatar
- Logout functionality with smooth animations
- Sticky positioning with backdrop blur effects
- Modern glass-morphism design

#### `client/src/components/LoadingScreen.jsx`
Enhanced loading screen with vibrant animations.
- Gradient backgrounds and glow effects
- Orbiting elements and progress indicators
- Brand-consistent design with smooth transitions

#### `client/src/components/Tickets/Dashboard.jsx`
Main ticket management interface with Trello-inspired design.
- Vibrant gradient backgrounds and animated elements
- Real-time ticket counters with status indicators
- Enhanced floating action button with ripple effects
- Responsive grid layout with smooth animations

#### `client/src/components/Tickets/TicketColumn.jsx`
Individual column component with vibrant status-based theming.
- Color-coded columns (Orange/Pink, Blue/Cyan, Yellow/Orange, Green/Emerald)
- Animated drag-and-drop areas with visual feedback
- Empty state illustrations and smooth transitions
- Status-specific gradient headers

#### `client/src/components/Tickets/TicketCard.jsx`
Individual ticket display with enhanced interactivity.
- Gradient priority badges with pulse animations
- Hover effects with lift animations and glow
- Click-to-expand functionality with visual indicators
- Dragging state with rotation and shadow effects

#### `client/src/components/Tickets/TicketDetailsModal.jsx`
Expanded ticket view modal (Trello-like experience).
- Large modal with full ticket editing capabilities
- Gradient priority and status badges
- Delete functionality with confirmation dialogs
- Form validation and smooth state transitions

#### `client/src/components/Tickets/CreateTicketModal.jsx`
Modal for creating new tickets.
- Form with title, description, priority, and status
- Integration with ticket creation API
- Form validation and error handling

### API Services

#### `client/src/services/authApi.js`
Authentication API service functions.
- `loginUser()` - User login with credentials
- `registerUser()` - User registration
- `fetchUserProfile()` - Get current user info
- Uses environment variables for API URL

#### `client/src/services/ticketApi.js`
Ticket management API service functions.
- `fetchTickets()` - Get user's tickets
- `createTicket()` - Create new ticket
- `updateTicket()` - Update existing ticket
- `deleteTicket()` - Remove ticket
- `fetchFilteredTickets()` - Get filtered tickets
- Centralized authentication headers

---

## Enhanced UI Features

### Design System
- **Color Palette**: Purple, Blue, Indigo gradients with vibrant accents
- **Animations**: Smooth transitions, hover effects, loading states
- **Layout**: Responsive design with modern card-based interface
- **Typography**: Gradient text effects and consistent hierarchy

### User Experience Enhancements
- **Interactive Elements**: Hover animations, click feedback, visual states
- **Accessibility**: Proper ARIA labels, keyboard navigation support
- **Performance**: Optimized animations and efficient state management
- **Mobile-First**: Responsive design patterns throughout

### Visual Improvements
- **Gradient Backgrounds**: Dynamic color schemes for different sections
- **Glass Morphism**: Backdrop blur effects on overlays and modals
- **Micro-Animations**: Subtle transitions that enhance user feedback
- **Status Indicators**: Color-coded elements for quick visual recognition

---

## Configuration Files

#### `server/.env`
Backend environment variables.
- Database connection settings
- JWT secret key
- Server port configuration

#### `client/.env`
Frontend environment variables.
- API base URL configuration
- Development/production settings

#### `server/package.json`
Backend dependencies and scripts.
- Express 4.x (stable version)
- PostgreSQL, bcrypt, JWT, CORS
- Development script with nodemon

#### `client/package.json`
Frontend dependencies and scripts.
- React, React Router, Axios
- Tailwind CSS for styling
- Drag-and-drop library (@hello-pangea/dnd)

---

## Database Schema

### Users Table
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Tickets Table
```sql
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'Backlog',
    priority VARCHAR(50) DEFAULT 'Low',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (protected)

### Tickets
- `GET /api/tickets` - List user tickets (protected)
- `POST /api/tickets` - Create ticket (protected)
- `PATCH /api/tickets/:id` - Update ticket (protected)
- `DELETE /api/tickets/:id` - Delete ticket (protected)
- `GET /api/tickets/filtered` - Filtered tickets (protected)

### System
- `GET /health` - Server health check

All protected endpoints require `Authorization: Bearer <token>` header.
