let todos = [
  { name: 'Go shopping', completed: false },
  { name: 'Read a book', completed: true },
];

const onAddTodo = (e) => {
  const newTodo = handleSubmit(e);

  if (newTodo) {
    todos = addTodo(todos, newTodo);
    renderTodos(todos);
  }

  return false;
};

const onMarkTodoAsComplete = (todoIdx) => {
  todos = markTodoAsComplete(todos, todoIdx);
  renderTodos(todos);
};

const onDeleteTodo = (todoIdx) => {
  todos = deleteTodo(todos, todoIdx);
  renderTodos(todos);
};

document.addEventListener('DOMContentLoaded', () => {
  renderTodos(todos);
});
