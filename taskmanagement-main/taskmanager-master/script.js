document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('task-form');
    const taskTitle = document.getElementById('task-title');
    const taskDescription = document.getElementById('task-description');
    const taskDueDate = document.getElementById('task-due-date');
    const taskStatus = document.getElementById('task-status');
    const taskList = document.getElementById('task-list');
  
    fetchTasks();
  
    taskForm.addEventListener('submit', addTask);
    taskList.addEventListener('click', handleTask);
  
    async function fetchTasks() {
      const response = await fetch('http://localhost:5000/tasks');
      const tasks = await response.json();
      tasks.forEach(task => addTaskToDOM(task));
    }
  
    async function addTask(e) {
      e.preventDefault();
  
      if (taskTitle.value === '' || taskDueDate.value === '') return;
  
      const task = {
        title: taskTitle.value,
        description: taskDescription.value,
        dueDate: taskDueDate.value,
        status: taskStatus.value
      };
  
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      });
  
      const newTask = await response.json();
      addTaskToDOM(newTask);
  
      taskForm.reset();
    }
  
    function addTaskToDOM(task) {
      const li = document.createElement('li');
      li.innerHTML = `
        <div class="task-details">
          <span class="task-title"><strong>${task.title}</strong></span>
          <span class="task-description">${task.description}</span>
          <span class="task-due-date">Due: ${new Date(task.dueDate).toLocaleDateString()}</span>
          <span class="task-status">Status: ${task.status}</span>
          ${task.status === 'Completed' ? `<a href="#" class="completed-link">Completed</a>` : ''}
        </div>
        <div class="task-actions">
          <button class="edit" data-id="${task._id}">Edit</button>
          ${task.status !== 'Completed' ? `<button class="completed" data-id="${task._id}">Complete</button>` : ''}
          <button class="change-status" data-id="${task._id}">Change Status</button>
        </div>
      `;
      taskList.appendChild(li);
    }
  
    async function handleTask(e) {
      const id = e.target.getAttribute('data-id');
  
      if (e.target.classList.contains('completed')) {
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'Completed' })
        });
  
        const updatedTask = await response.json();
        const taskItem = e.target.closest('li');
        taskItem.querySelector('.task-status').textContent = `Status: ${updatedTask.status}`;
        taskItem.querySelector('.completed-link').style.display = 'inline';
        e.target.remove();
      } else if (e.target.classList.contains('change-status')) {
        const newStatus = prompt('Enter new status (Pending, In Progress, Completed):', e.target.closest('li').querySelector('.task-status').textContent.split(': ')[1]);
  
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: newStatus })
        });
  
        const updatedTask = await response.json();
        const taskItem = e.target.closest('li');
        taskItem.querySelector('.task-status').textContent = `Status: ${updatedTask.status}`;
  
        if (newStatus === 'Completed') {
          taskItem.querySelector('.completed-link').style.display = 'inline';
        } else {
          taskItem.querySelector('.completed-link').style.display = 'none';
        }
      } else if (e.target.classList.contains('edit')) {
        const taskItem = e.target.closest('li');
        const newTitle = prompt('Enter new title:', taskItem.querySelector('.task-title').textContent);
        const newDescription = prompt('Enter new description:', taskItem.querySelector('.task-description').textContent);
        const newDueDate = prompt('Enter new due date (yyyy-mm-dd):', new Date(taskItem.querySelector('.task-due-date').textContent.split('Due: ')[1]).toISOString().substring(0, 10));
  
        const updatedTaskData = {
          title: newTitle,
          description: newDescription,
          dueDate: newDueDate
        };
  
        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedTaskData)
        });
  
        const updatedTask = await response.json();
        taskItem.querySelector('.task-title').textContent = updatedTask.title;
        taskItem.querySelector('.task-description').textContent = updatedTask.description;
        taskItem.querySelector('.task-due-date').textContent = `Due: ${new Date(updatedTask.dueDate).toLocaleDateString()}`;
      }
    }
  });
  