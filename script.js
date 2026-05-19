// Основные переменные
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Загрузка задач при запуске
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Введите текст задачи!');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTask(task);
    taskInput.value = '';
    taskInput.focus();
}

function renderTask(task) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button>Удалить</button>
    `;

    // Чекбокс
    li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
        toggleComplete(task.id);
    });

    // Кнопка удаления
    li.querySelector('button').addEventListener('click', () => {
        deleteTask(task.id);
    });

    taskList.appendChild(li);
}

function loadTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === id) task.completed = !task.completed;
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

function deleteTask(id) {
    if (!confirm('Удалить эту задачу?')) return;
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Добавление по Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
