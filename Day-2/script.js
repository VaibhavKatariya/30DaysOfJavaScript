const addBtn = document.querySelector('#add-btn');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');

function createTodoElement(id, task) {
    const todo = document.createElement('li');
    todo.setAttribute('data-id', id);

    const span = document.createElement('span');
    span.textContent = task;

    const button = document.createElement('button');
    button.classList.add('delete-btn');
    button.textContent = 'Delete';
    button.addEventListener('click', () => {
        deleteTodo(todo, id);
    });

    todo.appendChild(span);
    todo.appendChild(button);

    return todo;
}

function addTodo() {
    if (input.value === '') {
        alert('Please enter a todo');
        return;
    }

    const id = Date.now();
    const todoElement = createTodoElement(id, input.value);

    hideNoTodosMessage();
    list.appendChild(todoElement);

    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push({ id, todo: input.value });
    localStorage.setItem('todos', JSON.stringify(todos));

    input.value = ''; 
}

function deleteTodo(todoElement, id) {
    list.removeChild(todoElement);
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    const newTodos = todos.filter(todo => todo.id !== id);
    if(newTodos.length === 0) showNoTodosMessage();
    localStorage.setItem('todos', JSON.stringify(newTodos));
}

function showNoTodosMessage(){
    const message = document.createElement('p');
    message.id = 'no-todos-message';
    message.textContent = 'No todos to show';
    list.appendChild(message);
}

function hideNoTodosMessage(){
    const message = document.querySelector('#no-todos-message');
    if (message) {
        list.removeChild(message);
    }
}

function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');

    if (todos.length === 0) {
        showNoTodosMessage();
        return;
    }
    
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo.id, todo.todo);
        list.appendChild(todoElement);
    });
}

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addTodo();
});

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        addTodo();
    }
});

document.addEventListener('DOMContentLoaded', loadTodos);
