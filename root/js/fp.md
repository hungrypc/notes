# Functional Programming

Functional programming is all about separation of concerns, packaging code into separate chunks so that everything is well organized and each part concerns itself with the one thing it's good at. This is similar to OOP but the difference is that FP also separates data and functions. 

Generally, functional languages have an emphasis on simplicity where data and functions are concerned. Functions operate on well-defined data structures rather than actually belonging to that data structure.

The goals of FP are the exact same as OOP, but instead of the 4 pillars, it comes down to **pure functions**. Once something is created, it cannot be changed (immutable). 

Let's start with an exercise to see why FP is good.

In this exercise, we've been hired by Amazon and they need us to implement a shopping feature.
```js
const user = {
	name: 'Kim',
	active: true,
	cart: [],
	purchases: []
}

// implement cart feature:
// 1. add items to cart
// 2. add 3% tax to item in cart
// 3. buy item: cart -> purchases
// 4. empty cart

// bonus
// accepts refunds
// track user history
```

Before we answer this question, we have a few concepts to learn.

## Pure Functions

Two main things that make pure functions:
1. The function has to always return the same output given the same input (each time it's run, we always get the same output)
2. The function cannot modify anything outside of itself (no side effects)

### Side Effects

```js
// side effects
const array = [1,2,3]
function a(arr) {
	arr.pop()
}
a(array)	// undefined
console.log(array)  // [1,2]
```
Side effects are when the function modifies what's outside of itself. `a()` mutates the array. Instead, we can change it so that it creates a new array.
```js
const array = [1,2,3]
function a(arr) {
	const newArray = [].concat(arr)
	newArray.pop()
	return newArray
}
console.log(a(array)) // [1,2]
console.log(array)	  // [1,2,3]
```
Here, we're not modifying anything outside of our scoped world. Because it doesn't affect the outside world, we know what to expect. 

### Same Output

```js
function a(num1, num2) {
	return num1 + num2
}

a(3, 4)		// 7
```

Everytime this is run, we always get 7. This is what we mean by 'always return the same output given the same input', and is what we call referential transparency. If we completely change the function to `7`, will it affect any part of the program?  

The idea with pure functions is that it makes functions very easy to test and very easy to compose, plus it avoids a lot of bugs.

## Can Everything Be Pure?

Technically, no. If, by strict definition, the function does something on the inside that the outside world knows nothing about, then it literally doesn't do anything. A program can't exist without side effects, we won't have websites with pure functions since there needs to be interaction. 

The goal of FP isn't to make everything pure, the goal is to minimize side-effects. It's to organize code where there is a specific part that has side effects so when you have a bug you'll know exactly where it's happening. Purity is more of a confidence level. We want to organize code in a way to isolate side effects to certain locations so that the code is predictable and easier to bug. 

How do we build the perfect function? We'll be exploring this soon but as a quick reference, the perfect function:
- Handles 1 task 
- Should return something
- Should be pure
- No shared state with other functions
- Immutable state, returns a copy
- Composable
- Predictable

## Idepotent

The idea of idepotence is a function that always returns or does what we expected to do. For example, when I do an API call, I can expect that the API call (given some sort of parameter) is always going to return the same results even though we are communicating with the outside world. 

 Why do we care about this term? This idea of being able to call something multiple times and always getting the same result is extremely valuable when it comes to things like parallel and distributed computation because it makes our code predictable. 

 Another interesting feature of idempotence is this idea of being able to call yourself, or inside of yourself, over and over and still get the same result. 

## Imperative vs Declarative

> Imperative code is code that tells the machine what to do and how to do it

> Declarative code tells it what to do and what should happen, nothing about how to do things

A computer is better at being imperative. We as humans are more declarative. Machine code is *very* imperative. As we go to higher level languages, it becomes more declarative.

Why is this important? Beacuse FP helps us be more declarative, but through using functions and composing functions, we tell our programs what to do instead of how to do it. 

## Immutability

> Immutability means not changing the data/state

This is an important aspect of FP. We don't change the state but instead make copies of it and return the copy because we don't want to affect the outside world.

Since we're making copies, isn't this inefficient for memory? There's something called structural sharing where the idea behind it is that when a new object/array/data structure is created, we don't actually copy everything. Instead of storing the entire copy, only the changes that were made to the state would be copied. Things that don't change will stay there. 

## Higher Order Functions and Closures

We know that in js functions are first class citizens, which means we can have higher order functions and closures. 

### HOF

> HOFs are functions that do one of two things: either take one or more functions as arguments **OR** returns a function as a result. 

```js
const hof = () => () => 5
hof()() // 5
```


### Closures

Closures are a mechanism for containing some sort of state. In js, we create a closure whenever a function accesses a  variable defined outside of the immediate function scope. Through this, we can create private data. 

## Currying

> Currying is the technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions (each with a single argument)

You take a function that can take mulitple parameters and instead use currying to modify it into a function that takes one parameter at a time. 

eg.
```js
const multiply = (a,b) => a*b
// using currying:
const curriedMultiply = (a) => (b) => a*b

curriedMultiply(5)(3)	// 15
```
Why is this useful? We can create multiple utility functions out of this.
```js
const curriedMultiplyBy5 = curriedMultiply(5)

curriedMultiplyBy5(4)	// 20
```

## Partial Application

Similar yet different to currying. 

> Partial application is a way to partially apply a function

It's the process of producing a function with a smaller number of parameters. This means taking a function, applying some of its arguments into the function (so it remembers those parameters), and then use closures to later on be called with all the rest of the arguments

```js
const multiply = (a, b, c) => a*b*c
const partialMultiplyBy5 = multiply.bind(null, 5)

partialMultiplyBy5(4, 10)	// 200
```

## Memoization

Memoization is a specific form of caching. 

```js
function addTo80(n) {
	return n + 80
}

addTo80(5)	// 85
```
But if we run this function again and again, the program will run the calculation again and again. We can optimize this with memoization.

```js
let cache = {}
function memoizedAddTo80(n) {
	if (!cache[n]) {
		cache[n] = n + 80
	}
	return cache[n]
}
```

Ideally, it's good practice to have the cache to live in the function so that the global scope isn't polluted.

```js
function memoizedAddTo80() {
	let cache = {}
	return function(n) {
		if (!cache[n]) {
			cache[n] = n + 80
		}
		return cache[n]	
	}
}
const memoized = memoizedAddTo80()
memoized(5) // 85
```

## Compose and Pipe

### Compose

> Composing/composition is the idea that any sort of data transformation that we do should be obvious

Like an conveyor belt that passes data from function to function, where each function transforms that data before passing it on to the next function. Composability is a system design principle that deals with this relationship of components, how we can compose different components of a factory. A highly composable system provides components that can be selected and assembled in various combinations. It's easy to move pieces around to get the desired output.

```js
const compose = (f, g) => (data) => f(g(data))

const multiplyBy3 = (n) => n*3
const makePositive = (n) => Math.abs(n)

const multiplyBy3AndAbsolute = compose(multiplyBy3, makePositive)

multiplyBy3AndAbsolute(-50)	// 150
```

Using compose, we've created an assembly line where we can compose different functions together.

### Pipe

Pipe is essentially the same thing, except it goes from right to left.

```js
const pipe(f, g) => (data) => g(f(data))
```

## Arity

> Arity means the number of arguments a function takes

In FP, it's usually good practice that the fewer parameters a function take, the easier it is to use that function. 

This makes functions more flexible. 

## Amazon Question Solution

```js
const user = {
	name: 'Kim',
	active: true,
	cart: [],
	purchases: []
}

// implement cart feature:
// 1. add items to cart
// 2. add 3% tax to item in cart
// 3. buy item: cart -> purchases
// 4. empty cart

const compose = (f, g) => (...args) => g(f(...args)) 

function purchaseItem(...fns) {
	fns.reduce(compose)
}

function addItemToCart(user, item) {
	const updatedCart = user.cart.concat(item)
	return Object.assign({}, user, { cart: updatedCart })
}

function addTax(user) {
	const { cart } = user
	const taxRate = 1.3
	const updatedCart = cart.map(item => {
		return {
			name: item.name,
			price: item.price*taxRate
		}
	})
	return Object.assign({}, user, { cart: updatedCart })
}

function buyItem(user) {
	return Object.assign({}, user, { purchases: user.cart })
}

function emptyCart(user) {
	return Object.assign({}, user, { cart: [] })
}

purchaseItem(
	addItemToCart,
	addTax,
	buyItem,
	emptyCart
)(user, { name: 'laptop', price: 200 })

// bonus
// accepts refunds
// track user history
```
