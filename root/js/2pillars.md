# The 2 Pillars: Closures and Prototypal Inheritance

These two pillars are what makes js so powerful. 

## Functions are Objects

This is called a function constructor. It's part of the built in js object.
```js
const returnNum = new Function('num', 'return num')
returnNum(4) 		// 4
```

Functions are objects, allowing us to do things like this:
```js
function woohoo() {
	console.log('hoo')
}

woohoo.yell = 'ahhhh'
```
Under the hood, js creates a special type of object called a *callable object*: 
```js
// psuedocode
const woohoo_callableObj = {
	yell: 'ahhhh',
	name: 'woohoo',
	(): console.log('hoo')
}
```

These objects come with some special properties:

- Code we can invoke
- Arguments
- Name property (optional)
- call(), apply(), bind() - allows us to act on this function

Because functions are just objects in js, that means we can pass them around like objects. So besides just performing actions in our code, we can also store them as data, move them around, and apply them in interesting ways. 

## First Class Citizens

Functions are a first class citizen. This means that:
1. Functions can be assigned to variables and properties of objects
```js
var stuff = function() {
	// ...
}

const obj = {
	someFunc() {
		// ...
	}
}
```
2. We can pass functions as arguments into another function
```js
function a(callback){
	// ...
	callback()
}
```
3. We can return functions as a value from other functions
```js
function b() {
	return function c() {
		// ...
	}
}
```

Functions are data - not only do they perform actions for us, but they're also pieces of data that can be passed around like first class citizens. Anything you can do with other types, you can do with functions.

This first class citizen property is js introduced js to a whole world called functional programming. 

### Extra Bits

Something we want to be careful about is initializing functions inside of loops:
```js
for (let i = 0; i < 5; i++){
	function a() {
		// ...
	}
	a()
}
```
Everytime we loop, we initialize function `a()` and then call it. Instead of initializing the function inside the loop, we should move it outside the loop so that we're only calling it five times rather than initializing it five times.

Another thing to be careful about is something like this:
```js
function a() {
	return parm
}
```
This will cause a ReferenceError because `param` doesn't exist, forcing us to do some check. What we could do is add `param` as a parameter of `a()` so that js automatically adds it to our variable environment as if we just declared it. But when we call the function with nothing, we get undefined. To fix that, we just add default parameters.

## Higher Order Functions

> Higher order functions are functions that can take a function as an argument or functions that returns another function

To see why they're useful, let's compare forms of functions. Imagine we have need a dummy function that allows employees to login:
```js
// function()

function adamLogin() {
	let array = []
	// just to simulate waiting on backend
	for (let i = 0; i < 1000000; i++) {
		array.push(i)
	}

	return 'Access Granted to Adam'
}

function evaLogin() {
	let array = []
	for (let i = 0; i < 1000000; i++) {
		array.push(i)
	}

	return 'Access Granted to Eva'
}

adamLogin()
evaLogin()
```

Problem with this is that it isn't DRY, isn't flexible, not scalable. How could we fix this? Let's move to the next level:
```js
// function(a, b)

function userLogin(user) {
	let array = []
	for (let i = 0; i < 1000000; i++) {
		array.push(i)
	}

	return 'Access Granted to ' + user
}

userLogin('Adam')
userLogin('Eva')
```
What's better about this approach? We're telling the function what data to use when we call it. We now have a more generic function thats a bit more flexible and takes up less space. 

However, another problem could be that we also have an admin role. We'd then have to create another function that only handles admin access, which has more security procedures that could take more time for authentication. What do we do then? This is where higher order functions come into play. With HOFs, we can give the function data and also tell the function what to do/give it extra abilities when we invoke it.
```js
//  HOF

function giveAccessTo(name) {
	return 'Access Granted to ' + name
}

function authenticate(timeToAuth) {
	let array = []
	for (let i = o; i < timeToAuth; i++) {
		array.push(i)
	}
	return giveAccessTo(employee.name)
}

function login(employee, fn) { 	// HOF
	if (employee.role === 'admin') {
		return fn(500000)
	} else if (employee.role === 'user') {
		return fn(100000)
	}
}

const adam = {
	name: 'Adam',
	role: 'user'
}
const eva = {
	name: 'Eva',
	role: 'admin'
}

login(adam, authenticate)
login(eva, authenticate)
```
With this, we not only can tell it what data to use, but also can tell it what to do with another function. By making things general, we've gained a lot more flexibility and can tell it what to do during invocation. 

Let's do one more example:
```js
const multipyBy = function(num1) {
	return function(num2) {
		return num1 * num2
	}
}

const multiplyByTwo = multiplyBy(2)
multiplyByTwo(4)	// 8
multiplyByTwo(10) 	// 20
```
`multiplyBy` is a HOF because it returns another function. 

Could clean it up even more:
```js
const multiplyBy = num1 => num2 => num1 * num2
const multiplyByTwo = multiplyBy(2)
multiplyByTwo(4)	// 8
multiplyByTwo(10) 	// 20
```

## Pillar: Closures

Closures are a product of two things:
1. Functions in js are a first class citizen
2. Through lexical scope, the engine knows what variables each function has access to

Closures allow a function to access variables from an enclosing environment even **after** it leaves the scope in which it was declared. 
```js
function a() {
	let granpa = 'grandpa'
	return function b() {
		let father = 'father'
		return function c() {
			let son = 'son'
			return `${grandpa} -> ${father} -> ${son}`
		}
	}
}

a()()()		// grandpa -> father -> son
```
Somehow son has access to both father and grandpa. This is closure.

With a closure, when we run `a()`, it gets pushed into the stack and creates a variable environment that contains `grandpa`. But once the function gets removed off the stack, `grandpa` isn't garbage collected, it remains. This is because `grandpa` is kept in memory because js recognizes that there is a closure and that something is referencing `grandpa` from inside.

`b()` gets called, gets added to the stack, a new variable environment created that contains `father`, `father` continues to be stored once again because of closure. 

Finally, `c()` gets called with the `son` variable. When we get to the point where the it returns the final output, `c()` looks in its variable environment for all the other variables but can't find them. So, it looks at the closure box and finds `father` and `grandpa`.

The js engine makes sure that the function has access to all of the variables outside of the function with closures - it keeps anything that's still being referenced by a child function. 

Remember lexical scoping, js already knows which functions have access to which variables through scope chains. This works because the values are not on the call stack, they're on the memory heap. Even during garbage collection, js makes sure to keep some variables depending on whether they're still being referenced or not. 

Another example:
```js
function boo(string) {
	return function(name) {
		return function(name2) {
			console.log(`${string} ${name} ${name2}`)
		}
	}
}

boo('hi')('Tim')('Becca')

const booString = boo('hi')
// even though `boo()` is off the stack, we'll still remember 'hi'
const booStringName = booString()
```
This is because parameters are treated just like local variables that get stored in variable environments.

### Closures and Memory

Closures have 2 main benefits:
1. Memory efficient
2. Encapsulation


