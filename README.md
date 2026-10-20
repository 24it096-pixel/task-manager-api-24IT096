# Task Manager REST API (Backend)

Backend component for the Full Stack Task Management application built with **Node.js**, **Express**, and **MongoDB (Mongoose)**.

## Practical 7: Authentication and Middleware Pipeline

### Tech Stack & Libraries
- **Node.js & Express**: Web framework & routing.
- **MongoDB & Mongoose**: Database & Schema modeling (`User`, `Task`).
- **bcryptjs**: Secure one-way password hashing before saving to database (salt rounds = 10).
- **jsonwebtoken**: Signing and verifying JSON Web Tokens with 1-hour expiration.
- **cors**: Cross-Origin Resource Sharing.
- **dotenv**: Environment variable management.

### Middleware Pipeline
1. `express.json()`: JSON body parser.
2. `cors()`: Allows cross-origin requests from Vite dev server.
3. Global Request Logger: Logs HTTP method, URL, and timestamp.
4. `requireJsonContent`: Validates `Content-Type: application/json` on POST/PUT requests.
5. `auth`: Custom middleware in `middleware/auth.js` that extracts and verifies `Bearer <token>` from the `Authorization` header, attaching `req.user`. Returns 401 on missing, malformed, or expired tokens.
6. `validateTask`: Custom middleware in `middleware/validateTask.js` checking task input before reaching the controller.
7. Global Error Handler: Catches Mongoose `ValidationError`, `CastError`, duplicate key `11000`, and returns sanitized JSON error responses.

### API Endpoints

#### Authentication (Public)
- `POST /register`: Registers a user (`email`, `password`), hashes password with `bcrypt`, saves to MongoDB, returns JWT.
- `POST /login`: Validates credentials with `bcrypt.compare`, signs and returns JWT.

#### User Profile (Protected)
- `GET /me`: Decodes JWT, returns user details without password.

#### Task Routes (Protected with `auth` and `validateTask`)
- `GET /tasks`: Returns tasks for authenticated user.
- `GET /tasks/:id`: Returns specific task.
- `POST /tasks`: Validates body and creates a new task linked to user.
- `PUT /tasks/:id`: Validates body and updates task.
- `DELETE /tasks/:id`: Deletes task by ID.

### Environment Setup (`.env`)
```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_jwt_secret_key
```
*(Note: `.env` is ignored by git via `.gitignore` to prevent secret leaks)*
