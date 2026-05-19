// Основные переменные
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const stats = document.getElementById('stats');

let currentFilter = 'all';

// Загрузка задач
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    updateStats();
});

// Добавление задачи
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

    renderTasks();           // Обновляем весь список
    taskInput.value = '';
    taskInput.focus();
    updateStats();
}

// Рендер всех задач с учётом фильтра
function renderTasks() {
    taskList.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    const filteredTasks = tasks.filter(task => {
        if (currentFilter === 'active') return !task.completed;
        if (currentFilter === 'completed') return task.completed;
        return true; // 'all'
    });

    filteredTasks.forEach(task => renderTask(task));
}

// Рендер одной задачи
function renderTask(task) {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    
    li.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span>${task.text}</span>
        <button>Удалить</button>
    `;

    li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
        toggleComplete(task.id);
    });

    li.querySelector('button').addEventListener('click', () => {
        deleteTask(task.id);
    });

    taskList.appendChild(li);
}

// Обновление счётчика
function updateStats() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const completed = tasks.filter(t => t.completed).length;
    stats.textContent = `${completed} из ${tasks.length} выполнено`;
}

// Переключение выполнения
function toggleComplete(id) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.map(task => {
        if (task.id === id) task.completed = !task.completed;
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

// Удаление задачи
function deleteTask(id) {
    if (!confirm('Удалить эту задачу?')) return;
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

// Очистка выполненных
function clearCompleted() {
    if (!confirm('Удалить все выполненные задачи?')) return;
    
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

// Установка фильтра
function setFilter(filter) {
    currentFilter = filter;
    
    // Убираем active у всех кнопок
    document.querySelectorAll('.filters button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Добавляем active нужной
    document.getElementById(`filter-${filter}`).classList.add('active');
    
    renderTasks();
}

// Добавление по Enter
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
