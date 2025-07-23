# TracknFlow Server

A Node.js Express REST API for ticket management with authentication and filtering.

## Features

- User authentication (JWT)
- Create, list, update, delete tickets
- Filter tickets by status and priority
- PostgreSQL database integration

## Setup

1. **Clone the repository:**
2. **Install dependencies:**
3. **Configure environment:**
Create a `.env` file with:
4. **Start the server:**

## API Endpoints

All endpoints require JWT authentication (`Authorization: Bearer <token>`).

### Auth

- `POST /auth/login` — User login

### Tickets

- `POST /tickets/create` — Create a ticket  
- `GET /tickets/list` — List all tickets  
- `GET /tickets/filtered?status=<status>&priority=<priority>` — Filtered ticket list  
- `PATCH /tickets/:id` — Update a ticket  
- `DELETE /tickets/:id` — Delete a ticket

## Example Request (using Postman)

1. Login to get JWT token.
2. Set `Authorization` header for all ticket requests.
3. Use query parameters for filtering.

## Project Structure

- `controllers/` — Route handlers  
- `models/` — Mongoose models  
- `routes/` — API routes  
- `middleware/` — Auth middleware  
- `db/` — Database connection