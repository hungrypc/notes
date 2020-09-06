# Types in JS

## Javascript Types

We know the basics:
```js
// primitive
5					// number
true				// boolean
'string'			// string
undefined			// undefined
null				// object (should be null but this is a mistake with typeof)
Symbol('symbol')	// symbol

// non-primitive
{}					// object
[]					// object
function(){}		// function
```

Symbols are new in ES6 and are useful for identifying an object, so they're usually used for object properties so that the object's property is unique.

Undefined is the absence of a definition. 

Null is the absence of value.

Arrays and Functions are objects.

Primitive types is data that only represents a single value

Non-primitive types is data

JS has [built in objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects) that come with the language. 

## Array.isArray()

We've seen that arrays are actually objects. If this is the case, how do we ever test to see if somethign we create is an array? We use `Array.isArray()`. 

## Pass by value vs Pass by Reference

So, primitive types are immutable. This means that we can't really change them, and in order ot change them we have to complete remove the primitive type from memory and create something new. We don't really modify it, we create something new. 

When we assign a variable `a` to 5, variable `a` is going to contain and reference the value 5 somewhere in memory. If we do `var b = 10`, same thing happens. They don't really know of each others existence. This is what we call pass by value objects. 

On the other hand we have something called pass by reference. 
```js
var a = 5
// somewhere in memory, `a` now has an address of where the primitive value 5 sits
var b = 10
// same thing here

// what if we do
var c = b

// remember, primitive types are pass by value, meaning that the engine copied the primitive type value to the new variable
```

Pass by value simply means we copied the value and create that value somewhere else in memory.

Objects are different. 
```js
let obj1 = {
	name: 'Yao',
	password: '12345'
}

let obj2 = ob1

obj2.password = 'easy'

console.log(obj1.password)	// 'easy' 
console.log(obj2.password)	// 'easy'
```

Both `obj1` and `obj2` have the same password. This is passed by reference. Objects are stored in memory and are passed by reference. We don't copy the values, we assign the same object data stored in memory.

Why is this a good idea? To save space in memory. We're not copying and cloning the object creating multiple versions. We save memory by just referencing one location in memory instead of bloating up the memory heap. 

However, this can also be bad. We can change a property on that referenced object by mistake. This is something to be careful of. 

So because arrays are objects and are passed by reference, the same thing happens here. 
```js
var a = [1,2,3,4,5]
var b = a
b.push(12)
console.log(a) // [1,2,3,4,5,12]
```

There are times though that you might want to clone an object, how do we do this?
```js
var a = [1,2,3,4,5]
var b = [].concat(a)

let obj1 = {
	a: 1,
	b: 2,
	c: 3
}
let obj2 = Object.assign({}, obj1)
let obj3 = { ...obj1 }
// these are shallow clones

// there's still a way for pass by reference to mess things up, which is through nested objects

let obj1 = {
	a: 1,
	b: 2,
	c: {
		deep: 'hahaha'
	}
}
let obj2 = Object.assign({}, obj1)
let obj3 = { ...obj1 }
obj1.c.deep = 'no'
// this will change all them to have deep: 'no'
// this is because c is just another address that we've stored someplace in memory
```

So shallow cloning is where we can only clone the first layer. How do we do deep cloning? We use json.
```js
let obj1 = {
	a: 1,
	b: 2,
	c: {
		deep: 'hahaha'
	}
}
let deepClone = JSON.parse(JSON.stringify(obj1))
```

## Type Coercion

Type coercion means that when the operants (the values to the left and right of the operator) are different types, one of them will be converted into an equivalent value by the js engine (eg. `1 == '1'`).

This is why we have truthy and falsy values. JS does type coercion on these values and gets a boolean out of them.

Do all languages have type coercion? Yes, because we always need to convert types between programs to do things. 

In memory, different types look completely different than what we type (binary). So there is some sort of type coercion at different levels of the stack. It just so happens that js has an especially heavy type coercion in nature to it because it's dynamically typed. 

Type coercion happens when you use the `==`. However, it's not predictable code, which is why we usually use `===`.

Note:

In js there is a concept of `-0` and `+0`. We do get `true` from `-0 === +0`, but they're technically different. Here is where we can use `Object.is(-0, +0)`, which gives us `false`.

## Dynamic vs Static Typing

Dynamically typed language allows us to not be explicit with what type of variable we're creating. Type checking is done in runtime.

In a statically typed language, we have to state what the type the variable we're creating is going to be. 

## Strong vs Weak Typing

With weakly typed languages (like js), we can do something like this:
```js
var a = 'booya'
a + 17 // 'booya17'
```

In a strongly typed language, you can't do that. 