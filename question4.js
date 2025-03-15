const express = require('express');
const app = express();
app.use(express.json()); 

// In-memory storage for tasks
let tasks = [];
let taskId = 1;

// GET: View all tasks
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//  POST: Add a new task
app.post('/tasks', (req, res) => {
    const { name, description } = req.body;
    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }
    const task = { id: taskId++, name, description };
    tasks.push(task);
    res.status(201).json({ message: 'Task added', task });
});

// PUT: Update a task by ID
app.put('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, description } = req.body;
    const task = tasks.find(t => t.id === id);
    
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.name = name || task.name;
    task.description = description || task.description;
    res.json({ message: 'Task updated', task });
});

//  DELETE: Remove a task by ID
app.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = tasks.findIndex(t => t.id === id);
    
    if (index === -1) return res.status(404).json({ error: 'Task not found' });

    const deletedTask = tasks.splice(index, 1);
    res.json({ message: 'Task deleted', deletedTask });
});

// Start the server on port 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
