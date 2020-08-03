# Foundation I

## Javascript Engine

By default, the computer doesn't really know what js is. By having a js engine, it allows us to give the machine a js file and the machine will understand what to do. In essence, the js engine is a translator. 

The V8 engine is written in C++. Here's how it goes down:

1. We give the engine a JS file
2. Engine **parses** code - performs 'Lexical Analysis', which breaks the code down by key words and forms the data into 'tokens' to identify their meaning (what the code is trying to do)
3. Tokens are formed into an '**Abstract Syntax Tree**' (AST)
    - [AST Explorer](https://astexplorer.net) 
4. AST goes through an **interpreter** which:
    - Gets interpreted as **bytecode**, or
    - Gets fed to a **profiler**, then **compiler**, and finally spit out as **optimized code**

So these engines should follow some guidelines, that's where ECMAScript comes in. ECMAScript tells the standard on how the language should do things and how it should work.

## Interpreters and Compilers

> An interpreter translates the code line by line on the fly

> A compiler takes the code as a whole and translates into a compiled version in another language (usually a lower level language) for the computer to understand

In some respect, all languages have to be interpreted and compiled. 

## Inside the V8 Engine

What are the pros and cons of each?

### Interpreters:
- Quick to get up and running
- We don't have to convert into another language, there's no compilation step beore running your code (so it's faster)
    + Because of this, interpreters are a natural fit for JS since we usually want our JS to be executed right away
- However, as you run more JS, it gets slower and slower
    + When you're running the same code more than once, it can get really slow

### Compiler:
- This takes a little more time to get set up but the compiler will be smart enough to recognize certain things and simplify it
- Since this doesn't need to repeat translations for each pass, the code generated from it is actually faster
    + These edits are called optimization

What if we want the best of both worlds? Some engineers actually came up with something in the late 2000s - 'Just In Time' (JIT) compiler. Browsers started doing this. 

So when our AST gets fed to the interpreter, instead of being fed to ignition to immediately be interpreted to bytecode, we bring the code to the profiler, which monitors/watches our code as it runs and makes notes on how we can optimize it. Using this profiler, as the code is running through the interpreter, we pass off some of the code to the compiler to optimize. The compiler then takes the code and modifies it so that it runs faster. Then, it replaces the sections that can be improved of the bytecode with optimized machine code. 

This means that the execution speed of the JS code gradually improves since the profiler and compiler are constantly making updates and changes to the bytecode in order to be as efficient as possible. 

## Writing Optimized Code
So why is this important? Because we want to write code in a way that helps the compiler make optimizations. Here are some basic things to watch out for when working with the JS engine. Keep in mind that most of these things seem like things we don't really use or see that much anymore. This is because most developers don't use them since they can be bad for optimizations but it doesn't hurt to know what they are. This doesn't mean that we should never use them but that the use cases are quite rare. 

In order to help the js engine, we want to be really careful with the following functions:

- eval()
- arguments
- for in
- with
- delete

The main reasons that these functions can make our code less optimized are:

#### Inline Caching
```js
function findUser(user) {
    return `found ${user.firstName} ${user.lastName}`
}

const userData = {
    firstName: 'Johnson',
    lastName: 'Junior'
}

findUser(userData)
```

So if a piece of code is executed repeatedly, inline caching remembers the output and and instead of looking up an object every time the code is executed it caches the output. So in our example, if we call `findUser` repeatedly, we would replace it with `found Johnson Junior`.

#### Hidden Classes
```js
function Animal(x, y) {
    this.x = x
    this.y = y
}

const obj1 = new Animal(1, 2)
const obj2 = new Animal(3, 4)

obj1.a = 30
obj1.b = 100

obj2.b = 30
obj2.a = 100
// the above is going to make our compiler run slower or deoptimize the code
```
We want to try and instantiate our object properties in the same order so that hidden classes, which is what the compiler uses under the hood to say `obj1` and `obj2` have the same hidden class `Animal` (that is, they have the same properties). But as soon as you start introducing things in different orders, it's going to get confused and think that they don't have a shared hidden class. What you usually want to do is assign all properties of an object in its constructor or making sure that we add things in the same order.

That's also why there's an issue with `delete`.

The key takeaway is that we should write code that is predictable, not only for humans but also for machines. The more predictable, the better.

## Memoization
Memoization is a way to cache a return value of a function based on its parameters. This makes the function that takes a long time run much faster after one execution. If the parameter changes, it will still have to reevaluate the function.

```js
// Bad Way
function addTo80(n) {
  console.log('long time...')
  return n + 80
}

addTo80(5)
addTo80(5)
addTo80(5)

// long time... 85
// long time... 85
// long time... 85

// Memoized Way
functions memoizedAddTo80() {
  let cache = {}
  return function(n) { // closure to access cache obj
    if (n in cache) {
      return cache[n]
    } else {
      console.log('long time...')
      cache[n] = n + 80
      return cache[n]
    }
  }
}
const memoized = memoizedAddTo80()

console.log('1.', memoized(5))
console.log('2.', memoized(5))
console.log('3.', memoized(5))
console.log('4.', memoized(10))

// long time...
// 1. 85
// 2. 85
// 3. 85
// long time...
// 4. 90
```

## WebAssembly
Why not just use machine code from the beginning? Why not just compile our js and then give websites our machine code so they don't have to worry about interpretation and so on?

If js was compiled, then either compilation would have to be super fast (because our js files get sent from the server to the browser so the compiling has to happen on the browser) **or** the competing browsers would have to agree on some binary exectuable format/standard that can understand this machine code since it's the browsers that are executing the code. 

When JS was created in 1995, it was the start of the browser war. Compiling the code ahead of time or even compiling the code on the browser was just not feasible since it was really slow back in the day. 

Having all the browsers agree on an executable format to run js didn't happen back then either. Even now, browsers have different ways of doing things so there's just no real standard. 

However, things might change in the future. We now have something called WebAssembly, which is a standard binary executable format. In 1995, we didn't have the competing browsers agreeing on this format where we can compile our code all the way down to WebAssembly so that it runs really fast on the browser instead of having to go through the entire js engine process.

Definitely something to keep an eye out for.

## Call Stack and Memory Heap
So the engine does a lot of work for us. The biggest thing it's responsible for is actually reading the code and executing it correctly. To do this, it needs:

1. A place to store and write information (to store our variables, objects, data, etc)
    + **Memory Heap**
2. A place to actually run and keep track of what's happening line by line on our code
    + **Call Stack**

Basically, with the memory heap, the js engine has a large region in memory for us to store any type of arbitrary data in an unordered fashion that allows us to use variables to point to different storage areas for later use. There's semantics to how memory is allocated (learned in Datastructures and Algos course). 

With the call stack, its a stack (First In Last Out). Keeps track of what to execute. This is where stack overflow happens. 

### Garbage Collection
JS is a garbage collected language. This means that when js allocates memory for something and when that something is no longer needed, js automatically frees up this memory and will collect our garbage so that only the data that's still useful to us remain. This ensures that we don't use up all the memory we have available since memory is limited. 

In garbage collected languages like js, the garbage collector frees memory on the heap and prevents memory leaks (when the memory gets too big that we reach our maximum size). However, this gives us a false sense of security. There are ways to make mistakes where the memory *doesn't* get freed up. In low level languages, you actually have to tell it to remove parts of the memory. This is why languages like C is very fast and memory efficient since you are in control of garbage collection. 

So how does it work in js? Through something called the 'Mark and Sweep' algorithm. Imagine our memory ias an array where each element in the array is a linked list of objects that points to different objects. Once we remove the link/reference to a certain object, that object should be deleted. So the algorithm goes through all the objects and marks whats referenced/linked and then sweeps the unreferenced/unlinked objects.

Now that we know how garbage collection works, we can understand why memory leaks happen.

## Memory Leaks

This is going to crash:
```js
let array = []
for (let i = 0; i >= 0; i++) {
    array.push(i)
}
```
It's an infinite loop that's constantly storing memory. 

Memory leaks are pieces of memory that the application has used and is not needed anymore but has not yet been returned back to us. 

There are three common memory leaks that happen:

1. Global variables
2. Event listeners
3. setInterval

## Single Threaded

> Single Threaded means that only one set of instructions is executed at a time. 

One thing that makes js a single threaded language is that it has only one call stack. This one call stack allows us to run code one at a time, we're never running functions in parallel. This makes js synchronous. 

### Issues with Single Threaded Synchronous Code?

It makes it difficult if we have long running tasks. So why use js? The thing is, when we talk about js, most of the time we're never just using the js engine. It's not just the js engine that's running our code, we have something called the js runtime. In order for us to write code that we can use in modern day, we need stuff beyond just the js engine. 

## Javascript Runtime

So the web browser is working in the background while the synchronous js code is running. It's using the web API to communicate and lets the js engine know when it comes back with data that it was told to do in the background. 

All browsers have their js engine implementation as well as a js runtime that provide a web api. These web apis are applications that can do a variety of things such as sending http requests, listen to DOM events, delay execution, caching or database storage on the browser, etc. Browsers are helping us create rich web apps so that users aren't just sitting around waiting for js to execute. Anything that can be offloaded can be taken care of in the background. 

Under the hood, browsers actually use low level programming languages to perform these operations in the background. 

These web apis are asynchronous, meaning we can instruct these apis to do something in the background and return data once it's done. Meanwhile, we can just continue working on our js callstack and execute functions. 

So what happens is:

- JS functions execute, gets put in the callstack
- When the callstack receives something that the web api is supposed to do, it hands it over
- Callstack pops off the functions while the web api is off doing its thing
- When the web api is done, it sends over stuff to the callback queue
- The callback queue will send stuff over to the callstack when the callstack is empty
- Callstack executes the thing its been sent
- Finish

## NodeJS

So the Node runtime looks pretty similar to the browser runtime. We have the v8 engine, the event loop, callback queue, etc. However, it does a little bit more. In the case of the browser, we're limited to what we can do in the background. The browser isn't going to allow us to do much on the person's computer (such as accessing the file system). Node uses the libuv that works along to extend what we can do in the background. 

Node doesn't have `window` like in the browser. Instead, node has `global` which is its global api. This is why node is set to be a server side platform based on asynchronous io that is non-blocking. This means that it uses js but outside of the browser and it creates this entire environment that allows us to have the same model as a single-threaded model with asynchronous tasks that can be non-blocking. 