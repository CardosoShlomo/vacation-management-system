# Vacation Management System

A web application for managing vacation requests built with Vue.js, Node.js, Express, and PostgreSQL.

## Features

- **Requester Interface**: Submit vacation requests and view their status
- **Validator Interface**: Review, approve, or reject vacation requests with comments

## Tech Stack

- **Frontend**: Vue 3 (Composition API), TypeScript, Axios
- **Backend**: Node.js, Express, Knex.js
- **Database**: PostgreSQL

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v18 or higher)
- npm

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/CardosoShlomo/vacation-management-system.git
cd vacation-management-system
```

### 2. Database Setup

Create the PostgreSQL database:
```bash
psql -U postgres
```

In psql:
```sql
CREATE DATABASE vacation_db;
\q
```

### 3. Backend Setup
```bash
cd backend
npm install
npm install express pg cors dotenv knex
npm install --save-dev nodemon
```

Create a `.env` file in the `backend` directory:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=vacation_db
PORT=3000
```

Run migrations:
```bash
npx knex migrate:latest
```

Insert initial users:
```bash
psql -U postgres -d vacation_db
```

In psql:
```sql
INSERT INTO users (name, role) VALUES ('John Doe', 'requester');
INSERT INTO users (name, role) VALUES ('Manager', 'validator');
\q
```

### 4. Frontend Setup
```bash
cd ../frontend
npm install
npm install axios
```

### 5. Run the Application

**Start Backend** (from `backend` folder):
```bash
node server.js
```

**Start Frontend** (from `frontend` folder, in a new terminal):
```bash
npm run dev
```

Open your browser to `http://localhost:5173`

## Usage

- **Requester View**: Navigate to `/requester` to submit vacation requests
- **Validator View**: Navigate to `/validator` to review and approve/reject requests

## API Endpoints

- `POST /api/requests` - Submit vacation request
- `GET /api/requests/my` - Get current user's requests
- `GET /api/requests` - Get all requests (for validators)
- `PUT /api/requests/:id/approve` - Approve a request
- `PUT /api/requests/:id/reject` - Reject a request with comments

## Database Schema

### Users Table
- `id` - Primary key
- `name` - User's name
- `role` - 'requester' or 'validator'

### Vacation Requests Table
- `id` - Primary key
- `user_id` - Foreign key to users
- `start_date` - Vacation start date
- `end_date` - Vacation end date
- `reason` - Optional reason
- `status` - 'pending', 'approved', or 'rejected'
- `comments` - Validator's comments (for rejections)
- `created_at` - Timestamp

## Notes

- This is a demo application with hardcoded user IDs (user_id: 1 for requester)
- No authentication/authorization implemented
- Designed to run locally

## Author

Shlomo Cardoso
