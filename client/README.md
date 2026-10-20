# Task Manager Full Stack (UI)

Frontend component for the Full Stack Task Management application built with **React** and **Vite**, connecting to an Express + MongoDB backend.

## Practical 6 Features
- Optimistic UI updates when creating tasks.
- Confirmation dialog before deleting tasks.
- Toast notifications for success and error states.
- End-to-end integration with the backend.

## Practical 7: Authentication & Middleware Pipeline
- **User Authentication Flow**: Sign in and registration with email & password.
- **JWT Storage**: JWT token safely managed in `localStorage` and passed as `Authorization: Bearer <token>`.
- **Protected Views**: Dashboard and task management only accessible to authenticated users.
- **Token Expiry & 401 Handling**: Automatically logs out and prompts re-login when token expires or request is unauthorized.
- **Client-Side Logout**: Clears client token and resets app state.
- **User Info Bar**: Displays current user's profile verified via `/me` endpoint.

## Getting Started

### 1. Start the Backend
```bash
cd ../task-manager-api
npm install
node server.js
```
*Ensure it is running on port 3000.*

### 2. Start the Frontend
```bash
cd task-manager-ui
npm install
npm run dev
```

### 3. Open in Browser
Open `http://localhost:5173` to register a new user, log in, and manage protected tasks!
