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

 