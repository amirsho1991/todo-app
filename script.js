// Основные переменные
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Загрузка задач при открытии страницы
document.addEventListener('DOMContentLoaded', loadTasks);

// Добавление задачи
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Пожалуйста, введите текст задачи!');
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
}

// Отображение одной задачи
function renderTask(task) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
        <span onclick="toggleComplete(${task.id})">${task.text}</span>
        <button onclick="deleteTask(${task.id})">Удалить</button>
    `;
    taskList.appendChild(li);
}

// Загрузка всех задач
function loadTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => renderTask(task));
}

// Переключение выполнения
function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === id) task.completed = !task.completed;
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Удаление задачи
function deleteTask(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Enter для добавления
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
