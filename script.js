// Step 1: Setup Event Listener for Page Load:
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements:
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Function to save tasks to Local Storage
    function saveTasks(tasksArray) {
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
    }

    // Function to retrieve tasks from Local Storage
    function getStoredTasks() {
        return JSON.parse(localStorage.getItem('tasks') || '[]');
    }

    // Function to add a task to the DOM and optionally save to Local Storage
    // The 'save' parameter is added as per instructions to avoid re-saving when loading.
    function addTask(taskText, save = true) {
        // Check if taskText is empty (only relevant when adding via user input)
        if (taskText.trim() === "" && save === true) { // Added `save === true` to prevent alert on initial load
            alert("Please enter a task.");
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        // Implement Task Removal with Local Storage Update:
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove from DOM

            // Remove from tasks array in Local Storage
            let storedTasks = getStoredTasks();
            const index = storedTasks.indexOf(taskText); // Find the index of the task to remove
            if (index > -1) {
                storedTasks.splice(index, 1); // Remove it from the array
                saveTasks(storedTasks); // Save the updated array back to Local Storage
            }
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        // Clear the task input field only if added via user input
        if (save) {
            taskInput.value = '';
            // Update Task Addition Functionality:
            // Also save tasks to Local Storage whenever a new task is added.
            let storedTasks = getStoredTasks();
            storedTasks.push(taskText); // Add the new task to the array
            saveTasks(storedTasks); // Save the updated array back to Local Storage
        }
    }

    // Code for Loading Tasks from Local Storage:
    // Write a function that loads tasks from Local Storage when the page loads.
    function loadTasks() {
        const storedTasks = getStoredTasks();
        // This function should create task elements in the DOM for each task found in Local Storage,
        // ensuring the list reflects saved data.
        storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' indicates not to save again to Local Storage
    }

    // Attach Event Listeners:
    // Add an event listener to addButton that calls addTask when the button is clicked.
    addButton.addEventListener('click', function() {
        addTask(taskInput.value); // Pass the current input value
    });

    // Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask(taskInput.value); // Pass the current input value
        }
    });

    // Invoke Load Function:
    // Call loadTasks when the DOM is fully loaded to display any saved tasks.
    loadTasks();
});