# Object Oriented Programming

By using these paradigms: 
- We can make code clearer and more understandable 
- It's easier to extend
- Easy to maintain
- Memory efficient
- DRY

Initially, it was binary that programmers used. As time passed, we went into something called prodedural style of programming. We would store data and then manipulate that data using functions, but there was no structure or organization. We just had step by step instructions of what to do. Throughout the 60s and 70s, we started establishing fundamental paradigms. This is when OOP and FP started to take effect. Finally, in the 80s, as more best practices started to happen, some consolidation started happening where people agreed on what best practices are. OOP took off and kept up with the trends through into the 90s. However, now we see a trend toward FP becoming more and more popular. 

As programmers work more and more with code, we develop better and better practices. By learning these things, we stand on the shoulders of giants. 

## OOP and FP

In all programs, there are two primary components:
1. Data - stuff we keep in memory
2. Behavior - the things that the programs can do (functions)

OOP says that bringing together the data and its behavior in a single location called an object and containing all of that in a box makes it easier to understand how our programs work.

FP says that data and behavior are distinctly different things and should be kept separate for clarity. So instead of having one giant box to describe everything, we have multiple boxes. 

Keep in mind, it's not one over the other, we can aim to use them in unison. JS is multiparadigm, we can use both of these techniques based on our problems. 

## OOP

When it comes to OOP, there's two main types:
1. Class based programming languages
2. Prototype based programming languages

To really get into OOP, we'll start from procedural code (code we repeat ourselves in and isn't organized) to code that goes all the way to OOP. As example, we'll make a game.

Let's start by creating an elf objects.

```js
const elf = {
	name: 'Orwell',
	weapon: 'bow',
	attack() {
		return 'attack with' + elf.weapon
	}
}

elf.name	// Orwell
elf.attack() // attack with bow
```
But, this game is going to have multiple elves with different names, weapons, etc. How can we add another elf? We could copy the code and create another object.
```js
const elf2 = {
	name: 'Sally',
	weapon: 'bow',
	attack() {
		return 'attack with' + elf.weapon
	}
}
```
So what do we have here? We have encapsulation. We have state (data within the object) and methods acting on that state. BUT, the clear problem is that when we need more elves, we gotta copy and paste multiple times even though they all have the same attack method. Most likely, we'll have way more properties and methods, and we're not keeping it DRY. What could we do to solve this?

### Factory Functions

Factory functions are functions that act like factories, they create objects for us.

Let's programmatically create elves:
```js
function createElf(name, weapon) {
	return {
		name,
		weapon,
		attack() {
			return 'attack with ' + weapon
		}
	}
}

const peter = createElf('Peter', 'stones')
peter.attack() // attack with stones
```
We've created a factory function, a function that creates objects for us. The beauty of this is that when we want to create another elf, the function helps us do that without us having to copy and paste. 

This is a level up by a step towards OOP but there's still a problem here. What if we had a thousand elves, that requires space in our memory to store the same data. Things like `name` and `weapon` are going to be different so we need to store them in memory for each elf. But methods like `attack()` that is pretty generic is always going to be the same thing that's copied onto memory in a different location for each elf. 

Lucky for us, we can use prototype inheritance to improve this and share different functionality across different objects. 

### Object.create()

JS gives us a tool to share functionality: `Object.create()`.
```js
const elfFunctions = {
	attack() {
		return 'attack with ' + this.weapon
	}
}

function createElf(name, weapon) {
	let newElf = Object.create(elfFunctions)
	newElf.name = name
	newElf.weapon = weapon

	return newElf
}
```

Now, all new elves that are created will have unique names and weapons, and shared functionality `attack()` in the prototype. 

What we're doing is true prototypal inheritance. However, we won't see this out in most code bases. Before this, we had something else (which actually is closer to OOP):

### Constructor Functions

Instead of `Object.create()`, we have constructor functions. To use a constructor function, we use the `new` keyword. 
```js
function elf(name, weapon) {
	this.name = name
	this.weapon = weapon
}

const peter = new elf('Peter', 'stones')
```
The `new` keyword automatically returns the object for us that we have in `elf` and creates the `elf` constructor - it runs the code, constructs the `elf` for us, and gives us access to `peter`. Any function that is invoked using `new` is called a constructor function. This is why constructor functions start with a capital letter, to let developers know to call the function with the `new` keyword. 

Because a function is called, a new execution context is created. As a result of this, that means we automatically get the `this` variable attached to it. The interesting thing though is that when we use the `new` keyword, instead of pointing to the window object like it usually does, the `new` keyword changes what `this` is pointing to - the object that we just created.

Because functions have a prototype, we can modify it too.
```js
function Elf(name, weapon) {
	this.name = name
	this.weapon = weapon
}

Elf.prototype.attack = function() {
	return 'attack with ' this.weapon
}

const peter = new Elf('Peter', 'stones')
peter.attack() // attack with stones
```
