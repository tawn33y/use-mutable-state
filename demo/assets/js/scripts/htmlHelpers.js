const renderTodos = (todos) => {
  const el = document.getElementById('todos');

  el.innerHTML = todos.map((todo, idx) => `
      <li onclick="onMarkTodoAsComplete(${idx})">
        <span class=${todo.completed ? 'completed' : ''}>${todo.name}</span>
        <button onclick="onDeleteTodo(${idx})">Delete</button>
      </li>
    `).join('');

  const countTodosElement = document.getElementById('count-todos');
  const completedTodos = todos.filter((t) => t.completed).length;

  countTodosElement.innerHTML = `${completedTodos}/${todos.length}`;
};

const handleSubmit = (e) => {
  e.preventDefault();

  const newTodoElement = document.getElementById('new-todo');
  const newTodo = newTodoElement.value.trim();

  newTodoElement.value = '';

  return newTodo;
};
