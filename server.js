const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// 1. Global Logging Middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

// 2. Content-Type Validation Middleware for POST/PUT
const requireJsonContent = (req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    const contentType = req.headers['content-type'];
    if (!contentType || !contentType.includes('application/json')) {
      return res.status(400).json({ error: 'Content-Type must be application/json' });
    }
  }
  next();
};

app.use(requireJsonContent);

// 3. ID Validation Middleware (route-specific)
const validateId = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format. ID must be an integer.' });
  }
  req.validatedId = id; // attach validated id to request object
  next();
};

// In-memory data store
let tasks = [];
let nextId = 1;

// CRUD Routes

// GET /tasks - Retrieve all tasks
app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// POST /tasks - Create a new task
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Task title is required' });
  }
  
  const newTask = {
    id: nextId++,
    title,
    description: description || '',
    completed: false
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /tasks/:id - Update an existing task
app.put('/tasks/:id', validateId, (req, res) => {
  const id = req.validatedId;
  const { title, description, completed } = req.body;
  
  const taskIndex = tasks.findIndex(t => t.id === id);
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  // Update task
  const updatedTask = {
    ...tasks[taskIndex],
    title: title !== undefined ? title : tasks[taskIndex].title,
    description: description !== undefined ? description : tasks[taskIndex].description,
    completed: completed !== undefined ? completed : tasks[taskIndex].completed
  };
  
  tasks[taskIndex] = updatedTask;
  res.status(200).json(updatedTask);
});

// DELETE /tasks/:id - Delete a task
app.delete('/tasks/:id', validateId, (req, res) => {
  const id = req.validatedId;
  const taskIndex = tasks.findIndex(t => t.id === id);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  res.status(200).json({ message: 'Task deleted successfully' });
});

// 4. 404 Handler for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// 5. Global Error Handler (must be the last middleware)
app.use((err, req, res, next) => {
  console.error('An error occurred:', err.message); // Log error internally
  // Do not expose err.stack to the client
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
