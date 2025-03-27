// select Elements
const taskInput = document.getElementById("task");
const taskList = document.getElementById("task-list");

// Load tasks from Local Storage on Page Load
document.addEventListener("DOMContentLoaded", loadTasks);

// Add Tasks function
function addTask(){
    const taskText = taskInput.value.trim();

    if(taskText === ''){
      alert("Please enter a task!");
      return;  
    }

    // create task object
    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    addTaskToDOM(task);
    saveTaskToLocalStorage(task);

    // clear Input Field
    taskInput.value = '';
}

// Add Task to DOM
function addTaskToDOM(task){
    const li = document.createElement('li');
    li.setAttribute('data-id', task.id);

    li.innerHTML = `<span class="${task.completed ? 'completed': ''}" onclick= "toggleTask(${task.id})">
    ${task.text}
    </span> 
    <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
    <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>`;

    taskList.appendChild(li);
}

// Save Task to Local Storage
function saveTaskToLocalStorage(task){
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));  
}

// Get Tasks from Local Storage
function getTasksFromLocalStorage(){
   return localStorage.getItem('tasks')
   ? JSON.parse(localStorage.getItem('tasks'))
   : [];
}

// Load Tasks from Local Storage
function loadTasks(){
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(addTaskToDOM);
}

// Toggle task completion
function toggleTask(id){
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.map((task) => {
       if(task.id === id){
         task.completed =! task.completed;
       }  
       return task;
    });

    // update local Storage
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    reloadTasks();
}

// Edit task function
function editTask(id){
   const tasks = getTasksFromLocalStorage();
   const tasktoEdit = tasks.find((task) => task.id === id);

   if(tasktoEdit){
      const newTaskText = prompt("Edit your task", tasktoEdit.text);

      if(newTaskText !== null && newTaskText.trim() !== ""){
         tasktoEdit.text = newTaskText.trim();

        // update your local storage with edited task
        localStorage.setItem('tasks', JSON.stringify(tasks));
        reloadTasks(); 
      }
   }
   
}

// Delete task function
function deleteTask(id){
   const tasks = getTasksFromLocalStorage();
   const updatedTasks = tasks.filter((task) => task.id !== id);
   
  // update local Stroage
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  reloadTasks();  
}

// Reload Tasks
function reloadTasks(){
    taskList.innerHTML = '';
    loadTasks();
}

