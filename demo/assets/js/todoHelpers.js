const addTodo = (todos, newTodo) => [
  { name: newTodo, completed: false },
  ...todos.filter((t) => t.name !== newTodo),
];

const markTodoAsComplete = (todos, todoIdx) => todos.map((todo, idx) => {
  if (idx === todoIdx) {
    return { ...todo, completed: !todo.completed };
  }

  return todo;
});

const deleteTodo = (todos, todoIdx) => todos.filter((_todo, idx) => idx !== todoIdx);
