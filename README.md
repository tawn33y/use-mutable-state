# use-mutable-state

[![build, run linter & tests](https://github.com/tawn33y/use-mutable-state/actions/workflows/main.yml/badge.svg)](https://github.com/tawn33y/use-mutable-state/actions/workflows/main.yml)
![npm](https://img.shields.io/npm/v/use-mutable-state)
![NPM](https://img.shields.io/npm/l/use-mutable-state)
![npm bundle size](https://img.shields.io/bundlephobia/min/use-mutable-state)
![npm](https://img.shields.io/npm/dw/use-mutable-state)

`use-mutable-state` is a _browser/node_ util for safely mutating the state of values or objects.

In the Functional Programming world, we create values or objects by initializing them. Then we use them, but we do not change their values or their state. If we need, we create a new one, but we do not modify the existing object's state.

It goes without saying, however, that in a real world application, one needs to change the state. But how do we achieve this whilst maintaining immutability? In Haskell, one can achieve something this by using `IORef`, `Vault`, or even an `Atom`. In React, one can use `useState`. But how about in pure Javascript? All we have is `const` and `let`.

`use-mutable-state` is a module aimed at addressing this by providing an environment to safely mutate the state of values. It allows you to define all your values as constants, i.e. `const` instead of `let`, hence highly encouraging immutability.

At its core, the package is `less than 20 lines of code`. Based on your application design, you can use it to easily create a uni-directional or bi-directional data flow. You can also achieve `time travel`, where you are able to follow a value as it changes over time.

## Install

```bash
npm i use-mutable-state
```

## Example usage (simple)

```js
import { useMutableState } from 'use-mutable-state';

const ageMutable = useMutableState();

// set the age
ageMutable.set(2);

// get the age
const age = ageMutable.get();
console.log(age); // returns 2;

// add event listener for changes
ageMutable.onChange((val) => {
  console.log(val);
});
```

## Example usage (with TS)

```ts
const todosMutable = useMutableState<string[]>([]);

// ...
```

## Example usage (case study)

Assume we are building a TODOs app, where a user can create a new TODO, as well as delete and update an existing one.

> To view the full example, [see code](https://github.com/tawn33y/use-mutable-state/tree/feature/ISSUE-15/demo) in the demo folder.

Here's how we would do it the usual way:

```js
let todos = [];

const onGetTodos = todos;

const onDeleteTodo = (todo) => {
  todos = todos.filter(t => t !== todo);

  // next: re-render UI, or save new value to db, log, etc.
};

const onAddTodo = (newTodo) => {
  onDeleteTodo(newTodo);
  todos = [...todos, newTodo];
  
  // next: re-render UI, or save new value to db, log, etc.
};
```

Here is how we would do it using `use-mutable-state`:

```js
import { useMutableState } from 'use-mutable-state';

const todosMutable = useMutableState([]);

todosMutable.onChange((newTodos) => {
  // re-render UI, or save new value to db, log, etc.
});

const onGetTodos = todosMutable.get();

const onDeleteTodo = todo => {
  const oldTodos = todosMutable.get();
  const newTodos = oldTodos.filter(t => t !== todo);

  todosMutable.set(newTodos);
};

const onAddTodo = newTodo => {
  const oldTodos = todosMutable.get();
  onDeleteTodo(newTodo);

  todosMutable.set([oldTodos, newTodo]);
};
```

### A few highlights when using `use-mutable-state`

1) Notice how we do not have to repeat an action after every add/delete/update, but have a central place for handling updates:

```js
todosMutable.onChange((newTodos) => {
  // re-render UI, or save new value to db, log, etc.
});
```

2) Also notice how we did not use `let` to store the mutable todos, and instead used `const`.

```js
const todosMutable = useMutableState([]);
```

### Why do this at all?

At first glance, there is no much functional difference between the two methods; only the writing style is different. The gain, however, comes when you want to do complex stuff, e.g.:

#### 1) When using cross-file variables

Without `use-mutable-state`, it's hard to get the latest value of a variable across multiple files:

```js
// file1.js
let todos = ['read', 'walk'];
export { todos };

// file2.js
import { todos } from './file1.js';

export const addTodo = (newTodo) => {
  todos = [...todos, newTodo]
};

// index.js
import { todos } from './file1.js';
import { addTodo } from './file2.js';

addTodo('sing');
console.log(todos); // => ['read', 'walk']
```

With `use-mutable-state` however:

```js
// file1.js
import { useMutableState } from 'use-mutable-state';

let todosMutable = useMutableState(['read', 'walk']);
export { todosMutable };

// file2.js
import { todosMutable } from './file1.js';

export const addTodo = (newTodo) => {
  todosMutable.set([
    ...todosMutable.get(),
    newTodo,
  ]);
};

// index.js
import { todosMutable } from './file1.js';
import { addTodo } from './file2.js';

addTodo('sing');
console.log(todosMutable.get); // => ['read', 'walk', 'sing']
```

#### 2) A central place for updates == time travel 🚀

```js
import { useMutableState, createTimeMachine } from 'use-mutable-state';

const ageMutable = useMutableState<number>();
let ageHistory: number[] = [];

ageMutable.onChange(() => {
  ageHistory = [...ageHistory, ageMutable,.get() as number];
});

// do some updates
ageMutable.set(1);
ageMutable.set(2);
ageMutable.set(3);
ageMutable.set(4);
ageMutable.set(5);
ageMutable.set(6);

// next, time travel 🚀
const timeMachine = createTimeMachine(ageMutable, ageHistory);

timeMachine.travel('backward');
console.log(ageMutable.get()); // => 5

timeMachine.travel('backward', 4);
console.log(ageMutable.get()); // => 1

timeMachine.travel('forward');
console.log(ageMutable.get()); // => 2

timeMachine.travel('forward', 3);
console.log(ageMutable.get()); // => 5


```

## API

### **```useMutableState<T>(initialValue?: T) => UseMutableState<T>```**

#### Arguments

- ```initialValue``` (T, optional)
  The initial value for the mutable state.

#### Return value

The method returns an object with the following methods:

- ```get``` () => T | undefined
- ```set``` (newValue: T) => void
- ```onChange``` (cb: CallbackFunction<T>) => void

### **```createTimeMachine<T>(mutableState: MutableState<T>, stateHistory: T[]) => TimeMachine<T>```**

#### Arguments

- ```mutableState``` (MutableState<T>, required)
  The mutable state for the values.

- ```stateHistory``` (T[], required)
  An array of the historical values.

#### Return value

The method returns an object with the following methods:

- ```travel``` (direction: 'forward' | 'backward', steps?: number) => void

## Dev

```bash
# install dependencies
npm i

# build
npm run build

# lint
npm run lint

# test
npm t
```
