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

So when our AST gets fed to the interpreter, instead of being fed to ignition to immediately be interpreted to bytecode, we bring the code to the profiler, which monitors/watches our code as it runs and makes notes on how we can optimize it. Using this profiler, as the code is running through the interpreter, we pass off some of the code to the compiler to optimize. The compiler then takes the code and modifies it so that it runs faster. Then, it replaces the sections that can be imporoved of the bytecode with optimized machine code. 

This means that the execution speed of the JS code gradually improves since the profiler and compiler are constantly making updates and changes to the bytecode in order to be as efficient as possible. 

## Comparing Other Languages





