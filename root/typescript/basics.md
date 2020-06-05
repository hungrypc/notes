# TypeScript Basics & Basic Types

## Using Types

TypeScripts provide many types to JS (moreso than what JS provides). Let's start with three basic types we're very familiar with.

- number
  - All numbers, no differentiation between ints or floats
- string
  - All text values
- boolean

```typescript
function add(n1: number, n2: number) {
  // here, we're telling tsc that these arguments should be numbers
  return n1 + n2
}

const number1 = '5'
const number2 = 8

const result = add(number1, number2)
console.log(result)

// tsc app.ts 

// this would throw an error because number1 is a string
// we're adding an extra step to be explicit with what we're doing
// that way, we're avoiding mistakes and errors such as the one we have here
```


### TypeScript Types vs JavaScript Types

> They key difference between TS and JS: JS uses "dynamic types", which are resolved at runtime, meaning you won't know your errors UNTIL you run the script. TypeScript uses "static types", which are set during development so you'll be notified of any potential errors DURING development

The reason that this is advantageous is because having errors during development rather than runtime allows us to fix bugs earlier.  


### Type Assignment and Type Inferference

So in TS, we are explicit in what types we expect in our function arguments, but we don't do the same for stated variables. Why is this? It's because TS is able to **infer** the variable's types. It already **knows** what type the variable should be since it's already been stated elsewhere (like in the function). Type Inference is there for you to save time writing code so that you don't always have to manually assign the type.

### Object Types

```typescript
// in ts, this would bring up an error
const person = {
  name: "Philip",
  age: 26
}

console.log(person.nickname)

// ts knows that we don't have this nickname property because it inferred it

// in ts, objects are inferred like this:
const person: {
  name: string;
  age: number;
}
// we don't have key=value pairs, we actually have key=type pairs
// ts objects types are there to describe the type of object that is getting used 

// here is something odd, say we explicitly tell ts person is an object:
const person: object = {
  name: "Phil",
  age: 26
}

console.log(person.name)

// ts will actually bring up an error here EVEN THOUGH we DO have a name key
// this is because we've told ts that const person is an object type without giving any other information
// ts actually doesn't support any type of property because we're not saying anything about the object

// the way we can be more explicit here is like this:
const person: {
  name: string;
  age: number;
} = {
  name: "Phil",
  age: 26
}

// however, this isn't necessary since ts already can infer the types, so we'd do everything the same as we did in the beginning:
const person = {
  name: "Philip",
  age: 26
}
```

### Array Types

```typescript
const person = {
  name: "Phil",
  age: 26,
  hobbies: ["Keyboards", "Photography"]
}

// from this, ts already infers that our hobbies is an array of strings:
const person: {
  name: string;
  age: number;
  hobbies: string[];
}

// if we wanted to support an array with multiple types, we would do it like this:
let array: any[];
array = ['Sports', 1]

// however, we wouldn't want to do this often since we would lose the benefits of ts 

// here's something interesting:
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase())
}

// because ts knows that our hobbies array consist of strings, it allows us to access built in functions available to strings and does not complain
// we would get errors if we tried to access a function that was not available to that type 
```

### Working with Tuples

TS adds some new types that JS might not actually have. For example, Tuples. Tuples are fixed-length arrays. In TS, not only are these fixed-length, but also fixed-type.

```typescript
// say we have a role property that should only have 2 elements that are number and string
const person = {
  name: "Phil",
  age: 26,
  hobbies: ["Keyboards", "Photography"],
  role: [2, "Dev"]
}

// so ts will actually infer this role property as a union type array:
const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: (string | number)[]
}

// however, we're still able to mutate this in ways we don't actually want:
person.role.push('admin') // we wouldnt want this since this is adding a 3rd element
person.role[1] = 10 // we also wouldn't want this since we're now changing the second element into a number 

// we know that we want exactly this structure: [number, string]
// for such a situation, a tuple would be perfect
const person: {
    name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: "Phil",
  age: 26,
  hobbies: ["Keyboards", "Photography"],
  role: [2, "Dev"]
}

// although we originally said that it's typical to let ts infer rather types than explicitly state them, here we have a situation where we SHOULD
// this will allow us to see errors if anything ever happens to our role property that we don't intend

person.role[1] = 10
// so now, this would bring up an error
person.role.push('admin')
// however, this still would be allows since push is an exception that's allowed in tuples, so ts wouldn't catch it
person.role = [0, 'admin', 'user']
// this WOULD give an error though so that's still a good thing
```

### Working with Enums

```ts
// say we have a strict list of roles that we allow and store as numbers but want them to be expressed in a way that's readable
// 0: admin, 1: user, 2: read only

// now we COULD do it like this (which is actually a way people DO do this)
const ADMIN = 0
const USER = 1
const READ_ONLY = 2

const person = {
  name: "Phil",
  age: 26,
  hobbies: ["Keyboards", "Photography"],
  role: USER
}

// however, we would have to define the constants and role is inferred to be just a number (which means we could store any number in there, even if its a number that we don't support)

// enums can help us solve this problem:
enum Role { ADMIN, USER, READ_ONLY };

// behind the scenes, ADMIN receives the number 0, USER: 1, and READ_ONLY: 2

// so now we can do this:
const person = {
  name: "Phil",
  age: 26,
  hobbies: ["Keyboards", "Photography"],
  role: Role.USER
}

// so now, we have a readable roles expressed as labels that are stored as numbers 

// say we don't want those default numbers, we could do this:
enum Role { ADMIN = 5, USER, READ_ONLY };
// this gives us 5, 6, 7

enum Role { ADMIN = 'ADMIN', USER = 100, READ_ONLY = 200 };
// you could even do this
```

### The Any Type

This is the most flexible, TS would not complain about much if given this type. However, this would be a huge disadvantage since it strips us from all of the benefits TS provides. Still, if you really need this, it is available.

### Union Types

Let's say we want a flexible function that can add numbers when given numbers or concat strings when given strings. How would we state a type that can be one or the other?

```ts
function combine(input1: string | number, input2: string | number) {
  const result = input1 + input2
  return result
}

const combinedAges = combine(30, 26)
const combinedNames = combine('Max', 'Anna')

// this is an example of union types
// though I have to say that ts would still somewhat complain since it doesn't agree with concating string with the + operator
// we can ignore that for now since this is just an example to show how union types work 
```

### Literal Types

Literal types are types where you don't just say that a variable or parameter should hold a specific type, but where you are also very clear about what exact value it should hold. 

```ts
const number = 2.8

// this would infer:
const number: 2.8

// we see here that because we're using const, ts knows that the value will never change and therefore infers the type to be 2.8
// of course, ts knows that this is a number, but it's a specific number, so it's given the specific type 2.8

// we can take this further and combine it with union types
// say our combine function takes a third argument that dictates if we combine the inputs as string or numbers
// we can make sure its only one or the other like this:

function combine(
  input1: number | string,
  input2: number | string,
  resultConversion: 'as-number' | 'as-string'   // literal and union
) {
  let result
  if (resultConversion === 'as-number') {
      result = +input1 + +input2
  } else if (resultConversion === 'as-string') {
      result = input1.toString() + input2.toString()
  }

  return result
}
```

### Type Aliases/Custom Types

When using the same union type multiple times, it might be hasslesome to have to retype it over and over. This is where type aliases come in.

```ts
type Combinable = number | string
// you can call this anything that's not already being used by ts or js

type ConversionDesc = 'as-number' | 'as-string'
// we also can make this with literal types 

type User = {
  name: string;
  age: number;
}

function freet(user: User) {
  console.log("hi, i'm " + user.name)
}
// or even do this
```


## Function Return Types and "void"

Types actually go even further - we have things called Return Types, which are the types that are expected to be returned from a function.

```ts
function add(n1: number, n2: number) {
  return n1 + n2
}
// =
function add(n1: number, n2: number): number
// this function takes in number types, but also expects to return a number type


// we also have something called a void type
function printResult(num: number) {
  console.log('result: ' + num)
}

printResult(add(5, 10))
// because we're not returning anything in printResult, the return type is 'void'

// this is not to be confused with the type undefined. undefined is used when you actually expect undefined as a value
```

## Function as Types

```ts
// in js, we can do this
let combineValues;

combineValues = add

console.log(combineValues(8, 8))
// we can set a variable as a pointer to a function, and it would work

// HOWEVER, at any point in the code, we can interfere and reset combineValues to be anything else:
let combineValues

combineValues = add
combineValues = 5     // changing it up

console.log(combineValues(8, 8))

// what if we want to make sure that combineValues will be a value?
let combineValues: Function

combineValues = add
combineValues = 5     // so this wouldn't work

console.log(combineValues(8, 8))

// BUT now, the problem will be that we can reset combineValues into another functionlet 

combineValues = printResult     // so this would work

// it'd be nice if we could be more precise regarding how the function that we want to store in combineValues 
// should look like, this is where function types come into play

let combineValues: (a: number, b: number) => number

// now, we're telling ts that we want combineValues to be a function that takes two numbers and returns a number 
```

### Function Types and Callbacks

```ts
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2
  cb(result)
}

addAndHandle(10, 20, (result) => {
  console.log(result)
})
// the advantage of us defining the cb function definition is that inside the function that we pass in as a callback, ts is able to infer that result will be a number
```


## The Unknown Type

```ts
let userInput: unknown;
// if we don't know what the variable will hold yet, we can give it an unknown type

// we can store any type into the variable without getting any errors
// it would be the same as the any type 
// the key difference though is as shown:

let userInput: unknown;
let userName: string;

userInput = 5
userInput = 'Max'
userName = userInput
// this wouldn't work. userName wants a string but userInput is not guaranteed to be a string. it's unknown. 

// so unknown is a bit more restrictive. we first have to check the type before assigning
let userInput: unknown;
let userName: string;

userInput = 5
userInput = 'Max'
if (typeof userInput === 'string') {
  userName = userInput  
}

// so unknown is the better choice over any for this sort of situation
```


### The Never Type

```ts
// never is another type that functions can return
function generateError(message: string, code: number): never {
  throw {
    message,
    errorCode: code
  }
}

generateError('An error occured', 500)
// this function never produces a return value but it's different to void
// since an error is thrown, it cancels our script, so this function truly never returns anything 
```




































