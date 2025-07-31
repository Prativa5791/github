document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage when page loads
    loadTasks();

    taskForm.addEventListener('submit', function(e) {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = ''; // Clear input field
        taskInput.focus(); // Return focus to input
    });

    function addTask(taskText) {
        if (taskText.trim() === '') return;

        // Create new task item
        const taskItem = document.createElement('li');
        taskItem.className = 'task-item';
        
        // Create task text span
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        
        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            taskItem.remove();
            saveTasksToLocalStorage();
        });
        
        // Append elements to task item
        taskItem.appendChild(taskSpan);
        taskItem.appendChild(deleteBtn);
        
        // Add task to the list
        taskList.appendChild(taskItem);
        
        // Save to localStorage
        saveTasksToLocalStorage();
    }

    function saveTasksToLocalStorage() {
        const tasks = [];
        document.querySelectorAll('.task-item span').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => {
            addTask(task);
        });
    }
});