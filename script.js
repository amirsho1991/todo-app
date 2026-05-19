// Основные переменные
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Загрузка задач при открытии
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
    taskInput.focus();
}

// Рендер одной задачи
function renderTask(task) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.dataset.id = task.id;

    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button class="delete-btn">Удалить</button>
    `;

    // Чекбокс
    li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
        toggleComplete(task.id);
    });

    // Кнопка удаления
    li.querySelector('.delete-btn').addEventListener('click', () => {
        deleteTask(task.id);
    });

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
    if (!confirm('Удалить эту задачу?')) return;
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    loadTasks();
}

// Enter для добавления
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
