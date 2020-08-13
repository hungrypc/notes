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
// 1. add items to card
// 2. add 3% tax to item in cart
// 3. buy item: cart -> purchases
// 4. empty cart

// bonus
// accepts refunds
// track user history
```

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

