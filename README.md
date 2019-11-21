# mutable-state

mutable-state is a _browser/node_ util for safely mutating the state of values or objects.

In the Functional Programming world, we create values or objects by initializing them. Then we use them, but we do not change their values or their state. If we need, we create a new one, but we do not modify the existing object's state.

It goes without saying, however, that in a real world application, one needs to change the state. But how do we achieve this whilst maintaining immutability? In Haskell, one can achieve something this by using `IORef`, `Vault`, or even an `Atom`. In React, one can use `useState`. But how about in pure Javascript? All we have is `const` and `let`.

`mutable-state` is a module aimed at addressing this by providing an environment to safely mutate the state of values. It allows you to define all your values as constants, i.e. `const` instead of `let`, hence highly encouraging immutability.

At its core, the package is `less than 20 lines of code`. Based on your application design, you can use it to easily create a uni-directional or bi-directional data flow. You can also achieve `time travel`, where you are able to follow a value as it changes over time.

## Install

```bash
npm install mutable-state
```

## Example usage (JS)

```js
// Method A: the normal way of doing things
let todos = [];

const onAddTodo = newTodo => {
  onDeleteTodo(newTodo);

  todos = [
    ...todos,
    newTodo,
  ];
  
  // next: re-render UI, or save new value to db, log, etc.
};

const onDeleteTodo = todo => {
  todos = todos.filter(t => t !== todo);

  // again: re-render UI, or save new value to db, log, etc.
};


// Method B: using mutable-state
import { createMutableState } from 'mutable-state';

const todosMutable = createMutableState([]);

todosMutable.onChange(newTodos => {
  // re-render UI, or save new value to db, log, etc.
  console.log(newTodos);
});

const onGetTodos = todosMutable.get();

const onAddTodo = newTodo => {
  onDeleteTodo(newTodo);

  todosMutable.set([
    ...todosMutable.get(),
    newTodo,
  ]);
};

const onDeleteTodo = todo => {
  const newTodos = todosMutable
    .get()
    .filter(t => t !== todo);

  todosMutable.set(newTodos);
};

// NOTE: notice how we do not have to persist
// our todos to the database after every
// add/delete; in fact, you can save the
// methods to a different file, import them
// to the main file here, and the onChange
// hook above will still be called

// NOTE: also note how easy it is to achieve
// time travel using the onChange hook above
```

## Example usage (with TS types)

```ts
const todosMutable = createMutableState<string[]>([]);

// ...
```

## API

### **```createMutableState<T>(initialValue?: T) => MutableState<T>```**

#### Arguments

- ```initialValue``` (T, optional)
  The initial value for the mutable state.

#### Return value

The method returns an object with the following methods:

- ```get``` () => T
- ```set``` (data: T) => void

## Dev

```bash
# install dependencies
npm i

# start
npm start

# eslint
npm run eslint

# test
npm test
```
