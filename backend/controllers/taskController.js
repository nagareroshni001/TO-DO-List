let tasks = []; // In-memory storage

// Get all tasks
const getTasks = (req, res) => {
    res.json(tasks);
};

// Add a new task
const addTask = (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Task title is required" });

    const newTask = { id: Date.now(), title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

// Update a task
const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    const task = tasks.find(t => t.id == id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    if (title !== undefined) task.title = title;
    if (completed !== undefined) task.completed = completed;

    res.json(task);
};

// Delete a task
const deleteTask = (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(t => t.id != id);
    res.json({ message: "Task deleted successfully" });
};

module.exports = { getTasks, addTask, updateTask, deleteTask };
