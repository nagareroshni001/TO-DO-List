const API_URL = "http://localhost:3000/tasks";

// Fetch tasks from backend
async function fetchTasks() {
    const response = await fetch(API_URL);
    const tasks = await response.json();
    displayTasks(tasks);
}
function searchTasks() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let tasks = document.querySelectorAll("#taskList li");

    tasks.forEach(task => {
        let taskText = task.textContent.toLowerCase();
        if (taskText.includes(input)) {
            task.style.display = "block";  // Show matching tasks
        } else {
            task.style.display = "none";   // Hide non-matching tasks
        }
    });
}

// Display tasks in UI
function displayTasks(tasks) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${task.id})">
                ${task.title}
            </span>
            <button onclick="deleteTask(${task.id})">❌</button>
        `;
        taskList.appendChild(li);
    });
}

// Add a new task
async function addTask() {
    const taskInput = document.getElementById("taskInput");
    const title = taskInput.value.trim();
    if (!title) return alert("Task cannot be empty!");

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
    });

    taskInput.value = "";
    fetchTasks();
}

// Toggle task completion
async function toggleTask(id) {
    const response = await fetch(`${API_URL}`);
    const tasks = await response.json();
    const task = tasks.find(t => t.id == id);
    if (!task) return;

    await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !task.completed }),
    });

    fetchTasks();
}

// Delete a task
async function deleteTask(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
}

// Initial fetch
fetchTasks();
