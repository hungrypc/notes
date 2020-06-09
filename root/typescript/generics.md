# Generics

What are generic types?
> Types that are connected with some other type and is really flexible regarding which exact type that other type is, whilst still ensuring type safety

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

## The "keyof" Constraint
```ts
function extractAndConvert(obj: object, key: string) {
    return obj[key]
}
// ts complains because it can't guarantee that the key exists within the object
// so, we can do this:

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key]
}

// so by using keyof, we want to ensure that U is a key of T
// meaning we will now be notified if we try to call this function with a key
// that doesn't exist in the object we called it with
```

## Generic Classes
```ts
class DataStorage {
    private data = []

    addItem(item) {
        this.data.push(item)
    }

    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}
// we would get a bunch of errors here:
// - we're not telling ts about the kind of data we're storing
// - and we're not saying anything about what item is/could be

// we can turn this into a generic class b/c we might not care about the type of data
// we want it to be uniform, but other than that, we don't care
// here's how we would do this:

class DataStorage<T> {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1)
    }

    getItems() {
        return [...this.data]
    }
}

// so now, we can do stuff like this:
const textStorage = new DataStorage<string>()
const numberStorage = new DataStorage<number>()

// so it's now flexible, yet strongly supported

// however, if we're working with objects, we'll still have some problems
// objects are reference types, so we can't really do things like removeItem
// indexOf() wouldn't work with the object, so it just removes the last item
// it would only work if we pass it a constant
const objStorage = new DataStorage<object>()
const maxObj = {name: 'Max'}    // constant
objStorage.addItem(maxObj)
objStorage.removeItem(maxObj)

// but since it's finicky with objects, we probably want to keep this to primitive types:
class DataStorage<T extends number | string | boolean > {
    private data: T[] = []

    addItem(item: T) {
        this.data.push(item)
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1) // this logic is fine now
    }

    getItems() {
        return [...this.data]
    }
}
```

## Generic Utility Types
There are a couple built-in types that utilize/are generic types.

```ts
interface CourseGoal {
    title: string;
    desc: string;
    completion: Date;
}

function createCourseGoal(
    title: string,
    desc: string,
    date: Date
): CourseGoal {
    let courseGoal = Partial<CourseGoal> = {}
    // Partial wraps our type and changes it to where CourseGoal properties are optional
    // so ts won't complain about setting it as an empty obj
    courseGoal.title = title
    courseGoal.desc = desc
    courseGoal.completion = date
    return courseGoal as CourseGoal // gotta do this because we said its of type Partial    
}

// another built in utility type is Readonly

const names: Readonly<string[]> = ['Max', 'Anna']
names.push('Manu') // now, this won't work
// we've set names as Readonly, so it can't be changed up
```
[List of Generic Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)

## Generic Types vs Union Types
```ts
class DataStorage<T extends number | string | boolean > {
    private data: T[] = [] // number[] or string[] or boolean[]
}
// vs
class DataStorage {
    private data: (string | number | boolean)[] = []
    // [] of any of string | number | boolean
}

// these are very different
// with union types, we accept any type, it doesn't really have as much strictness 
// generic types allow us to choose which type of data we wanna store, and then
// ONLY add that type of data

// union types are great for lots of freedom, but generic types are good for locking in types
```
