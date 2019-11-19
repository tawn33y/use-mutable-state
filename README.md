# mutablestate.js

mutablestate.js is a _browser/node_ util that provides an environment for safely mutating JS/TS variables. It allows you to define all your variables as constants, i.e. `const` instead of `let`, hence highly encouraging immutability.

It is similar to React's `useState`, and can be used to achieve a uni-directional data flow in an application.

It is inspired by Haskell's `IORef` and `Vault`.

## Install

```bash
npm install mutablestate.js
```

## Example usage (JS)

```js
import { createMutableState } from 'mutablestate.js';

const todosMutable = createMutableState([]);

todosMutable.onChange(newTodos => {
  // custom method
  // e.g. persist to database, log, etc.
  console.log(newTodos);
});

// methods which can be attached to html
// events such as onClick
const methods = todosMutable => ({
  onGetTodos: () => todosMutable.get(),
  onAddTodo: newTodo => {
    const newTodos = [
      ...todosMutable.get(),
      newTodo,
    ];

    todosMutable.set(newTodos);
  },
  onDeleteTodo: newTodo => {
    const newTodos = todosMutable
      .get()
      .filter(t => t !== newTodo);

    todosMutable.set(newTodos);
  },
});

// NOTE: notice how we do not have to persist
// our todos to the database after every
// add/delete; in fact, you can save the
// methods to a different file, import them
// to the main file here, and the database
// will still be updated from the onChange
// handler above
```

## Example usage (with TS types)

```ts
const todosMutable = createMutableState<string[]>([]);

// ...
```

## API

### **```createMutableState<T>(initialValue?: T) => MutableState<T>```**

#### Arguments

- ```initialValue``` (any, optional)
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
