const todosState = useState([
  { name: 'Go shopping', completed: false },
  { name: 'Read a book', completed: true },
]);

todosState.onChange(todos => {
  renderTodos(todos);
});

const onAddTodo = (e) => {
  const newTodo = handleSubmit(e);

  if (newTodo) {
    todosState.set(addTodo(todosState.get(), newTodo));
  }

  return false;
};

const onMarkTodoAsComplete = (todoIdx) => {
  todosState.set(markTodoAsComplete(todosState.get(), todoIdx));
};

const onDeleteTodo = (todoIdx) => {
  todosState.set(deleteTodo(todosState.get(), todoIdx));
};

document.addEventListener('DOMContentLoaded', () => {
  renderTodos(todosState.get());
});
