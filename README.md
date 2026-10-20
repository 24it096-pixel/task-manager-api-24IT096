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

### Practical 6: Full Stack Integration
- End-to-end task management CRUD (Create, Read, Update, Delete).
- Data persisted in MongoDB Atlas cloud database.
- Optimistic UI updates on task creation.
- Confirmation dialog before task deletion.
- Auto-dismissing Toast notification system.

### Practical 7: Authentication & Middleware Pipeline
- User registration and login with secure password hashing via `bcryptjs`.
- JWT token generation (`jsonwebtoken`) with 1-hour expiration.
- Custom authentication middleware (`middleware/auth.js`) protecting all task routes with `Bearer <token>`.
- Server-side request validation middleware (`middleware/validateTask.js`) rejecting malformed requests with HTTP 400.
- Protected `/me` endpoint to fetch currently logged-in user profile.
- Client-side token storage in `localStorage` with automatic 401 token expiry logout and re-login prompt.
- Secure configuration: `.env` excluded via `.gitignore` with `JWT_SECRET`.
