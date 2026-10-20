module.exports = function validateTask(req, res, next) {
  if (req.method === 'POST') {
    const { title, priority } = req.body;

    if (!title || typeof title !== 'string' || !title.trim()) {
      return res.status(400).json({ error: 'Validation failed: Task title is required and cannot be empty.' });
    }

    if (priority && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: `Validation failed: '${priority}' is not a valid priority. Must be low, medium, or high.` });
    }
  }

  if (req.method === 'PUT') {
    const { title, priority, completed } = req.body;

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
      return res.status(400).json({ error: 'Validation failed: Task title cannot be empty.' });
    }

    if (priority !== undefined && !['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: `Validation failed: '${priority}' is not a valid priority. Must be low, medium, or high.` });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
      return res.status(400).json({ error: 'Validation failed: completed must be a boolean.' });
    }
  }

  next();
};
