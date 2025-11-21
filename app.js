

// Get Elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
let taskList = [];
// capturo el submit
form.addEventListener('submit', function (event) {
    event.preventDefault();

    let task = input.value.trim();

    if (task !== '') {
        taskList.push(task);
        saveLocal();
        addTask(task);
    }

    input.value = '';
});

let addTask = (task) => {
    let li = document.createElement('li');
    let delBtn = document.createElement('button');

    li.textContent = task;
    delBtn.textContent = '🗑️';
    delBtn.classList.add('buttonDelete');

    delBtn.addEventListener('click', () => {
        li.remove();
        taskList = taskList.filter(t => t !== task);
        saveLocal();
    });

    li.addEventListener('click', () => {
        li.classList.toggle('done');

    });

    li.appendChild(delBtn);
    list.appendChild(li);
    saveLocal(task)
}

let saveLocal = (task) => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
}

let renderTasks = () => {
    let data = localStorage.getItem('taskList');
    if (data) {
        taskList = JSON.parse(data);
        list.innerHTML='';
        taskList.forEach(task => addTask(task));
    }
}
// Render local task list
renderTasks();