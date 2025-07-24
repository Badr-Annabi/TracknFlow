/**
 * TracknFlow Database Initialization Script
 * Creates tables, indexes, triggers, and demo data for the TracknFlow application
 */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'todo' CHECK (status IN ('todo', 'in-progress', 'done')),
    priority VARCHAR(20) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_tickets_user_id ON tickets(user_id);
CREATE INDEX IF NOT EXISTS idx_tickets_status ON tickets(status);
CREATE INDEX IF NOT EXISTS idx_tickets_priority ON tickets(priority);
CREATE INDEX IF NOT EXISTS idx_tickets_created_at ON tickets(created_at);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_tickets_updated_at ON tickets;
CREATE TRIGGER update_tickets_updated_at 
    BEFORE UPDATE ON tickets 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

INSERT INTO users (username, email, password) 
VALUES ('demo', 'demo@tracknflow.com', '$2b$10$6n8WGK3OZT6qOXKJ.qQl4.FjQM8y8K5K7kP2Y8R6P7wJ3vH4X9nGe')
ON CONFLICT (email) DO NOTHING;

INSERT INTO tickets (user_id, title, description, status, priority) 
SELECT 
    u.id,
    'Welcome to TracknFlow',
    'This is a demo ticket to help you get started with TracknFlow. You can edit or delete this ticket.',
    'todo',
    'medium'
FROM users u 
WHERE u.email = 'demo@tracknflow.com'
ON CONFLICT DO NOTHING;

INSERT INTO tickets (user_id, title, description, status, priority) 
SELECT 
    u.id,
    'Setup Development Environment',
    'Configure your local development environment with Docker and necessary tools.',
    'in-progress',
    'high'
FROM users u 
WHERE u.email = 'demo@tracknflow.com'
ON CONFLICT DO NOTHING;

INSERT INTO tickets (user_id, title, description, status, priority) 
SELECT 
    u.id,
    'Read Documentation',
    'Go through the project documentation to understand the codebase and architecture.',
    'done',
    'low'
FROM users u 
WHERE u.email = 'demo@tracknflow.com'
ON CONFLICT DO NOTHING;

DO $$
BEGIN
    RAISE NOTICE 'TracknFlow database initialized successfully!';
    RAISE NOTICE 'Demo user: demo@tracknflow.com (password: demo123)';
END $$;
