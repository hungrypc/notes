# Type Annotations in Action

## Type Annotations and Inference

> **Type Annotations**: Code we add to tell Typescript what type of value a variable will refer to

> **Type Inference**: Typescript tries to figure out what type of value a variable refers to (it infers the type)

### Annotations
```ts
// variables
const apples: number = 5
const now: Date = new Date()

// arrays
const colors: string[] = ['red', 'green', 'blue']

// classes
class Car {
    constructor(brand: string) {
        this.brand = brand
    }
}
const bmw: Car = new Car('BMW')

// object literals
const point: { 
    x: number 
    y: number 
} = {
    x: 10,
    y: 20
}

// functions
const logNumber: (i: number) => void = (i: number) => {
    console.log(i)
}
```
Some annotations aren't really required (mainly variables), TS is able to *infer* them.

### Inference
In general, we tend to rely on type inference where ever we can. 

There are three scenarios where we actually annotate:

1. When a function returns the 'any' type and we need to clarify the value
```ts
const json = '{"x": 10, "y": 20}'
const coordinates: { x: number; y: number } = JSON.parse(json)  
// JSON.parse() returns 'any', so we annotate
console.log(coordinates)  // {x: 10, y: 20}
```
2. When we declare a variable on one line then intialize it later
```ts
const words = ['red', 'green', 'blue']
let foundWord: boolean

words.forEach(word => {
    if(word === 'green') {
        foundWord = true
    }
})
```
3. When we want a variable to have a type that can't be inferred



































