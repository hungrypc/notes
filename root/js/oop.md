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

Because a function is called, a new execution context is created and we automatically get the `this` variable attached to it. The interesting thing though is that when we use the `new` keyword, instead of pointing to the window object like it usually does, the `new` keyword changes what `this` is pointing to - the object that we just created.

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

With constructor functions, the only way to add properties to the object it's creating is through the `this` keyword. We also talked about how constructor functions automatically create the prototype chain for the object. 

```js
peter.__proto__ // { attack: [Function] }
// points to:
Elf.prototype 	// { attack: [Function] }
```
Every function we create gets this prototype property, but only constructor functions actually have use for it.

So are we at OOP nirvana yet? Not really, it still looks pretty messy and we haven't seen classes yet.

## Quick Note

Before we move up the OOP ladder, just one quick thing to point out about constructor functions. 
```js
// when we do something like this
var a = new Number(5)
// this is not the same as  
var b = 5

typeof a 	// object
typeof b 	// number

a === b 	// false
a == b 		// true
```
`var a` is an object because we've used a constructor function. 

## ES6 Classes

With es6, js finally got classes. OOP was created with class in mind, a blueprint of what we want created.

```js
class Elf {
	constructor(name, weapon) {
		this.name = name
		this.weapon = weapon
	}

	attack() {
		return `attack with ${this.weapon}`
	}
}

const peter = new Elf('Peter', 'stones')
console.log(peter instanceof Elf) 	// true
```
We now have one location that holds this entire elf object. Any changes in the class will be reflected in all instances of elf. 

An instance is an object created from a class. Instantiating is when we're creating an object using a class.

This is syntactic sugar, under the hood we're still using prototype. This is the closest js is gonna get to classes. 

## 4 Ways to use `this`

```js
// new binding
function Person(name, age) {
	this.name = name
	this.age = age
}

const person1 = new Person('Bob', 55)

// implicit binding
const person2 = {
	name: 'Karen',
	age: 40,
	hi() {
		console.log('hi ' + this.name)
	}
}

// explicit binding
const person3 = {
	name: 'Sal',
	age: 35,
	hi() {
		console.log('hi ' + this.setTimeout).bind(window)
	}
}

// arrow functions
const person4 = {
	name: 'Jane',
	age: 23,
	hi: function() {
		var inner = () => {
			console.log('hi ' + this.name)
		}
		return inner()
	}
}
```

## Inheritance

A core aspect of OOP is inheritance. 
```js
class Character {
	constructor(name, weapon) {
		this.name = name
		this.weapon = weapon
	}
	attack() {
		return `attack with ${this.weapon}`
	}
}

class Elf extends Character {
	constructor(name, weapon, type) {
		super(name, weapon)
		this.type = type
	}
}

const dobby = new Elf('Dobby', 'sock', 'house')

class Ogre extends Character {
	constructor(name, weapon, color) {
		super(name, weapon, color)
		this.color = color
	}
	makeFort() {
		return 'for built'
	}
}
```

## 4 Pillars of OOP

1. Encapsulation
	+ OOP wraps code into boxes that are related to one another so that these boxes can interact with each other using methods and properties we make available
2. Abstraction
	+ Hiding the complexity from the user - creating simpler interfaces
3. Inheritance
	+ By inheriting, we avoid having to write the same code
4. Polymorphism
	+ The ability to call the same method on different objects and each object responds in a different way
	+ We can customize methods to their own objects or classes
