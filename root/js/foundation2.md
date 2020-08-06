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

## Hoisting

> Hoisting is the behavior of moving the variables or function declarations to the top of their respective environments during compilation phase. Variables are partially hoisted and function declarations are hoisted. 

What hoisting does during the creation phase of our global execution context is allocate memory for the variables and functions that it sees in the code before it executes it. What happens under the hood is that the js engine looks through the code and as soon as it sees `var` or `function`, it allocates memory so you can do something like this:
```js
console.log(teddy) // returns undefined because js knows that there's 
// a variable that's declared but it has not been assigned a value yet until...
var teddy = 'bear'

sing() // executing before declaration still works
function sing() {
    console.log('oh lala')
}
```

There's a difference in hoisting with functions:
```js
// function expression
var sing2 = function() {
    console.log('test')
}

// function declaration
function sing() {
    console.long('test')
}
```

With a function expression, the variable gets hoisted but is assigned undefined. This means that you won't be able to call the function before it's defined like you can with function declarations. 

Hoisting happens on every execution context. Any time we run a function, a new execution context gets created and we have to go through the creation phase and execution phase again:
```js
var fave = 'grapes'

var foodThoughts = function() {
    console.log('original fav: ' + fave)

    var fave = 'sushi'  // this gets hoisted within the execution context of this function

    console.log('new fave: ' + fave)
}

foodThoughts()

// output: 
// original fave : undefined
// new fave : sushi
```

The reason we get `undefined` for the first `console.log` is because a new execution context was created when we ran the function `foodThoughts()`. The engine sees that `var fave` within the function and hoists it, assigning the variable `undefined`. 

Hoisting makes code very unpredictable, so we should avoid this when possible. It's why we use `const` and `let`.

## Function Invocation

We've already touched on function expressions and function declarations. 

Function expressions are defined at run time, when we call/run/invoke the function. Function declarations get defined at parse time.

When a function is invoked, we create a new execution context on top of our global execution context, giving us a few things:
- `this`
- `arguments` 
    + Object that contains the arguments passed to the function 

### arguments

There are many things that you can do with the `arguments` keyword.

```js
function marry(person1, person2) {
    console.log(Array.from(arguments))
    // ...
}

function marry2(...args){
    // args[0], args[1]...
    // ...
}
```

## Variable Environment 

We learned that there can be many execution contexts. Variables that are created inside these individual contexts are put in a space that's reserved for them called the **variable environment**. They all technically live in our js engine memory, but they need to know how they relate to one another. Some functions have access to certain variables and some don't. 

## Scope Chain

Each context has a link to its outside/parent context/environment. This outer environment depends on where it sits lexically (where it is written). Everything has access to the global scope. The scope chain links and gives each environment access to variables in its parent/outer environment, going up until the global environment. 

Remember:
> ...our **lexical scope** (available data + variables where the function was defined) determines our available variables. Not where the function is called (**dynamic scope**) 

Lexical scope (also known as static scope) means that by looking at the source code, we can determine which environment the variables are available in. This is what the compiler does, it looks through the code and attaches all these scope chains before it even runs the code. 

When defining functions within functions, we get something called the function lexical environment. This works as you expect in terms of scoping, pretty simple.

`[[Scopes]]` points to the scopes that a variable or function has access to. 

This is an example of leakage of global variables:
```js
function a() {
    height = 50
    return height
}

a()  // returns 50
```

`height` isn't defined/initialized anywhere, but because of what js does under the hood. 

Js will see that height is being set in `a()` and goes up the scope chain to ask the global env if height exists. Global env doesn't have it but it doesn't throw an error because the global env will see that `height` doesn't exist and will create it for you as it's looking up the scope chain. 

This is something that caused a lot of problems, which is why people add `'use strict'` at the top of the page (to avoid these unpredictable problems).

## Function Scope and Block Scope

















