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

JS has a function scope - every time we create a function, we create a new execution context which has its own variable environment. However, most other programming languages have something called block scope.

With a function scope, we can do something like this:
```js
function test() {
    if (true) {
        var secret = 12345
    }

    return secret // returns 12345
} 
```

The variable `secret` is functionally scoped, meaning we only create a new scope when there is a function. 

Block scope is where anytime there is an enclosure `{}`, a new environment is created. With ES6, let and const allow us to use block scope.

## Global Variables

So why don't we just put all our variables in the global environment? Remember, we have limited space, limited memory. Memory leaks can happen where we just have too much stored and it overflows, making things slower. One of the main ways we do that is with global variables. The issue with global variables is that we can have variable collisions. The variables can get overwritten.

## IIFE

To avoid this global variable issue, we have something called Immediately Invoked Function Expression (IIFE). 
```js
(function() {
    // ...
})()
// or
(function() {

}())
```

IIFEs are a common js design pattern used by a lot of popular libraries. The idea was that using this pattern allows us to place all library code inside of the local scope to avoid namespace collisions. 

What's the benefit? Since it's a function expression not assigned to any global variable, no global property is really being created. All the properties inside are going to be scoped inside. 

An IIFE simply allows us define what it is and call it immediately after. It'll create a new execution context with its own variable scope, which allows us to attach private data that can be accessed by the global execution context. 

```js
var script1 = (function() {
    function a() {
        return 5
    }
    return {
        a: a
    }
})()

function a() {
    return 'hahaha'
}

a() // 'hahaha'
script1.a() // 5
```

With this, we still have a global namespace `script1`, but the good thing is that we can have just one variable that can be an object that contains many properties that we might want to use - it only pollutes the global namespace once.

Libraries like jquery used to do this a lot. 

## this

> `this` is the object that the function is a property of

That means that we have an object that has some function and when we do something inside of the function, we have access to the `this` keyword as a reference to the object that the function is a property of. 

However, most of the time we don't really want `this` to refer to the global object. One of the pitfalls of `this` is that it refers to the global object when we think it refers to something else. 

If we add `'use strict'`, it allows us to work with `this` more predictably.   

What is `this` useful for?

```js
// Gives methods access to their object
const person1 = {
    name: 'Billy',
    sing() {
        return 'lalala ' + this.name
    }
}
person1.sing() // 'lalala Billy'


// Execute same code for multiple objects
function importantPerson() {
    console.log(this.name)
}
const name = 'Sunny'
const obj1 = {
    name: 'Cassy',
    importantPerson
}
const obj2 = {
    name: 'Jacob',
    importantPerson
}

importantPerson()       // Sunny
obj1.importantPerson()  // Cassy
obj2.importantPerson()  // Jacob
```

Essentially, `this` asks *'Who called me?'*

### this: Dynamic Scope vs Lexical Scope

```js
const a = function() {
    console.log('a', this)

    const b = function() {
        console.log('b', this)

        const c = {
            hi: function() {
                console.log('c', this)
            }
        }

        c.hi()
    }

    b()
}

a()

// a - window
// b - window
// c { hi: f }
```

`a()` refers to the window object, as expected, but `b()` also refers to the window object. This is because, even though `b()` is defined in `a()`, the syntax looks like this: `window.a(b())`, which means `window` is still to the left of the dot, hence `this` still refers to the window object. When we get to `c`, we have an object, so `this` refers to `c` (`c.hi()`). 

Looking at this, it looks like lexical scope doesn't really work with this. It doesn't really matter where we write our code, all that matters is how it gets called (who calls it). 

```js
const obj = {
    name: 'Billy',
    sing() {
        console.log('a', this)
        var anotherFn = function() {
            console.log('b', this)
        }

        anotherFn()
    }
}

obj.sing()

// a - { name: 'Billy', sing: f }
// b - window
```

Why is b refering to the window? This is a gotcha when it comes to the `this` keyword. Because `this` is not lexically scoped, it doesn't matter where it is written, only how the function was called. What happened under the hood is that `obj.sing()` ran and inside of the `sing()` function `anotherFn()` got executed - `obj` didn't call `anotherFn()`, the `sing()` function did. In js, `this` defaults to the window object. 

This gotcha created a lot of problems for people. Everything in js is **lexically scoped** *except* the `this` keyword, it's actually **dynamically scoped**.

So how do we avoid this pitfall? Three ways:

```js
// 1. arrow functions, because they are lexically bound
const obj = {
    name: 'Billy',
    sing() {
        console.log('a', this)
        var anotherFn = () => {
            console.log('b', this)
        }

        anotherFn()
    }
}

obj.sing()
// a - { name: 'Billy', sing: f }
// b - { name: 'Billy', sing: f }


// 2. binding this
const obj = {
    name: 'Billy',
    sing() {
        console.log('a', this)
        var anotherFn = () => {
            console.log('b', this)
        }

        return anotherFn().bind(this)
    }
}

obj.sing()() // double call since we return anotherFn
// a - { name: 'Billy', sing: f }
// b - { name: 'Billy', sing: f }


// 3. referencing this with a variable
const obj = {
    name: 'Billy',
    sing() {
        console.log('a', this)
        var self = this
        var anotherFn = () => {
            console.log('b', self)
        }

        return anotherFn
    }
}

obj.sing()()
// a - { name: 'Billy', sing: f }
// b - { name: 'Billy', sing: f }
```

## call(), apply(), bind()

### call()

Under the hood, all functions use `call()`.
```js
function a() {
    console.log('hi')
}

a.call()    // hi
```

We can even use `call()` to call methods from one object on another.
```js
const wizard = {
    name: 'Merlin', 
    health: 100,
    heal() {
        this.health = 100
    }
}

const archer = {
    name: 'Robin Hood',
    health: 30,
    // how can we borrow the heal() method from wizard and use it on archer?
}
console.log(archer.health) // 30
wizard.heal.call(archer)
console.log(archer.health) // 100
```

So `call()` can take an object as an argument and call the method on that object.
We can also do things like this:
```js
const wizard = {
    name: 'Merlin', 
    health: 100,
    heal(hp) {
        this.health += hp
    }
}

const archer = {
    name: 'Robin Hood',
    health: 30,
}

console.log(archer.health)  // 30
wizard.heal.call(archer, 100)
console.log(archer.health)  // 130
```

### apply()

So `apply()` kind of does the same thing as `call()`, but instead of just taking parameters it takes an array of parameters
```js
const wizard = {
    name: 'Merlin', 
    health: 100,
    heal(hp, crit) {
        this.health += hp + crit
    }
}

const archer = {
    name: 'Robin Hood',
    health: 30,
}

console.log(archer.health)  // 30
wizard.heal.call(archer, [30, 70])
console.log(archer.health)  // 130
```

Choosing which to use depends on what's easier to use for the situation.

### bind()


Unlike `call()` and `apply()` that immediately runs a function, `bind()` returns a new function with a certain context and parameters. It's usually used when we want a function to be called later on with a certain type of context. 

```js
const wizard = {
    name: 'Merlin', 
    health: 100,
    heal(hp, crit) {
        this.health += hp + crit
    }
}

const archer = {
    name: 'Robin Hood',
    health: 30,
}

console.log(archer.health)  // 30
const healArcher = wizard.heal.bind(archer, [30, 70])
healArcher()
console.log(archer.health)  // 130
```

So `bind()` allows us to store the `this` keyword or this function borrowing for later use. `bind()` is like a bandaid to fix this idea of a dynamically scoped `this` keyword that ruins our entire lexical scoping. 