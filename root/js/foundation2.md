# Foundation II

## Execution Context

The base execution context is called the global execution context. Initially, our js engine creates a global execution context. It's under the hood, but on top of that is where we execute functions that we've defined and called. When our final line of code finishes, the js engine pops off the global execution context from the stack. 

The first thing that js does is create the global execution context which gives us two things:

1. Global Object
2. `this`

In the browser, the global object refers to `window`. In node, it's `global`.

Once we've done this (creation phase), the next phase is the execution phase (where you actually run your code).

tldr: When code is run on the js engine, a global execution context is created. When you run a function, a new execution context is added (function execution context) and we start running our code until everything gets popped off the stack. 

## Lexical Environment

We can think of lexical environments as little universes that we've created everytime we create an execution context. Doing a lexical analysis means that it's checking to see where the words were written and their location (aka what universe they're part of). Where is the code written? 

This way, the compiler, knowing where certain things are written, can decide and make decisions as to where to put things and what actions to take. 

The execution context tells you which lexical environment is currently running. That's how things work in js. 

> In js, our **lexical scope** (available data & variables where the function was defined) determines our available variables. Not where the function is called (**dynamic scope**)














