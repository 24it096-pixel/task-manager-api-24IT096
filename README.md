# Task Manager — Full Stack React + Node + MongoDB

## Running the App

### 1. Backend (Express + MongoDB) — Terminal 1

```bash
cd task-manager-api-24IT096
npm start
```

Runs on http://localhost:3000

### 2. Frontend (React + Vite) — Terminal 2

```bash
cd task-manager-api-24IT096/client
npm run dev
```

Runs on http://localhost:5173

## Architecture

```text
React Frontend (localhost:5173)
  |  fetch calls (api.js)
  v
Express Backend (localhost:3000)
  |  Mongoose
  v
MongoDB Atlas
```

## Features

### Authentication & Authorization
- User registration and login flow.
- Passwords securely hashed with `bcryptjs` before persisting to database.
- Stateless session management using JSON Web Tokens (`jsonwebtoken`) with 1-hour expiration.
- Custom authentication middleware verifying `Authorization: Bearer <token>` on protected routes.
- Protected `/me` endpoint to retrieve authenticated user profile.
- Client-side token storage in `localStorage` with automatic 401 token expiry detection and re-login prompt.
- Secure environment configuration: `.env` excluded via `.gitignore`.

### Task Management & UI
- Complete CRUD operations (Create, Read, Update, Delete) for tasks.
- Cloud database persistence using MongoDB Atlas & Mongoose schema models.
- Optimistic UI updates when creating and checking off tasks.
- Confirmation dialog before task deletion.
- Auto-dismissing Toast notification system for success and error states.
- Server-side request validation middleware to reject malformed requests with HTTP 400.
- CORS enabled for seamless local communication between Vite and Express servers.
