# Generics

What are generic types?
> Types that are connected with some other type and is really flexible regarding which exact type that other type is

```ts
const names: Array = []
// this is incorrect. an array is a type on its own BUT it stores data of a certain type as well. 
// it doesn't care what you're storing in there, but it DOES care about getting at least
// SOME info about what's going in there, which is why we do:
const names: string[] = []
// or
const names: Array<string> = []

// this allows ts to give us better support

// another generic type we have are promises
const promise: Promise<string> = new Promise((res, rej) => {
    setTimeout(() => {
        res('timer done')
    }, 1000)
})

// we want this extra info so that when we call type specific methods on the data we get back later, 
// we will know whether we are calling correcly related methods 
```

## Creating a Generic Function

```ts
function merge(objA: object, objB: object) {
    return Object.assign(objA, objB)
}

const mergedObj = merge({name: 'Phil'}, {age: 26})
console.log(mergedObj.age)   // this would bring up an error
// ts doesn't know mergedObj will have this

// we can turn this into a generic function:
function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}

// now, ts will know that the result of this function will be an intersection of T and U
// this is what ts infers:
function merge<T, U>(objA: T, objB: U): T & U

// so, through inference, ts will infer this about mergedObj:
const mergedObj: {
    name: string;
} & {
    age: number;
}

// which now allows us to do 
console.log(mergedObj.age)
```

## Working with Constraints

```ts
// now, we still have a problem. with this:
function merge<T, U>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}
// we're telling ts that T and U can be of any type
// but what if we want to tell ts that we only want objects
// we can set contraints

function merge<T extends object, U extends object>(objA: T, objB: U) {
    return Object.assign(objA, objB)
}

// now we're forced to pass only objects into this function, which is good
```

## Another Generic Type

```ts
interface Lengthy {
    length: number;
}

function countAndDesribe<T extends Lengthy>(element: T): [T, string] {
    let text = 'got no value'
    if (element.length) {
        text = `got ${element.length} elements`
    }
    return [element, text]
}

// this is flexible because we've locked down the accepted parameter to be anything with a length property, such as a string or an array.
// This lecturer has very convoluted ways of explaining concepts, I don't really like this guy
```





































