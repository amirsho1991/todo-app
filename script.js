// Получаем элементы
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Загружаем задачи из localStorage при запуске
document.addEventListener('DOMContentLoaded', loadTasks);

// Добавление задачи
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Напиши задачу!');
        return;
    }

    const li = document.createElement('li');
    
    li.innerHTML = 
        <span onclick="toggleComplete(this)">${taskText}</span>
        <button onclick="deleteTask(this)">Удалить</button>
    ;
    
    taskList.appendChild(li);
    saveTasks();
    
    taskInput.value = ''; // очищаем поле
}

// Отметить задачу как выполненную
function toggleComplete(element) {
    const li = element.parentElement;
    li.classList.toggle('completed');
    saveTasks();
}

// Удаление задачи
function deleteTask(button) {
    const li = button.parentElement;
    li.remove();
    saveTasks();
}

// Сохранение задач в localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.querySelector('span').textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Загрузка задач из localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (!savedTasks) return;
    
    const tasks = JSON.parse(savedTasks);
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        if (task.completed) li.classList.add('completed');
        
        li.innerHTML = 
            <span onclick="toggleComplete(this)">${task.text}</span>
            <button onclick="deleteTask(this)">Удалить</button>
        ;
        taskList.appendChild(li);
    });
}

// Добавление задачи по нажатию Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
