# Advanced Types

## Intersection Types

Intersection types allows us to combine other types.

```ts
type Admin = {
    name: string;
    privileges: string[];
};

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ['create-server'],
    startDate: new Date()
}

// we obviously could achieve the same with interfaces
// one reason we may prefer types is that we can do something like this:

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric

// simpler and less code
// intersection types can be used on any types 
```

## More Type Guards

Type guards help us with union types because, whilst it's nice to have the flexibility, we often need to know what exact type we're getting at run-time. 

```ts
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') { // this is a type guard using typeof
        return a.toString() + b.toString()
    }
    return a + b
}

// --
type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
    console.log(emp.name)
    // we can't use typeof here, so:
    if ('privileges' in emp) {
        console.log(emp.privileges)    
    }
    if ('startDate' in emp) {
        console.log(emp.startDate)    
    }
}

// --
class Car {
    drive() {
        console.log('driving...')
    }
}

class Truck {
    drive() {
        console.log('driving a truck...')
    }

    loadCargo(amount: number) {
        console.log('loading cargo...' + amount)
    }
}

type Vehicle = Car | Truck
const v1 = new Car()
const v2 = new Truck()

function useVehicle(vehicle: Vehicle) {
    vehicle.drive()
    if (vehicle instanceof Truck) { // type guard
        vehicle.loadCargo(1000)
    }
}
```

## Discriminated Unions

Discriminated unions are patterns, which you can use when working with union types, that makes implementing type guards easier. It's available when working with object types.

```ts
interface Bird {
    animalType: 'bird';     // common property
    flyingSpeed: number;
}

interface Horse {
    animalType: 'horse';    // common property
    runningSpeed: number;
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.animalType) {
        case 'bird':
            speed = animal.flyingSpeed
            break
        case 'horse':
            speed = animal.runningSpeed
            break
        default:
            speed = 0
            break
    }
    console.log(`moving with speed: ${speed}`)
}

// this is a discriminated union because we have one common property in every object 
// that makes up our union so that we can use this common property in our check to have 100% 
// type safety and understand which properties are available and which are not
```

## Type Casting

Type casting helps you tell ts that some value is of a specific type where ts is not able to detect it on its own but you as a developer know that it will be the case. Eg getting access from something in the DOM.

```ts
// say we had an input element by id = user-input
const userInputElement = document.getElementById('user-input')!
// note: ! tells ts that this will never yield null

userInputElement.value = 'Hi there'
// ts doesn't dive into our html files and analyze them
// so this would get an error because ts doesn't know that it's an input element
// we can fix this with type casting:

const userInputElement = <HTMLInputElement>document.getElementById('user-input')!
// or
const userInputElement = document.getElementById('user-input')! as HTMLInputElement
// or
(userInputElement as HTMLInputElement).value = 'hi there'
```

## Index Properties

A feature that allows us to create objects which are more flexible regarding the properties they might hold. 

Let's say you're writing an app where you're validating user input (so you have multiple input fields) and, depending on what the user enters and what field it is, you might want to show different error messages.

```ts
interface ErrorContainer {
    [prop: string]: string // whatever object im constructing, it must have a 
    // property name that's a string, and this property returns string
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email'
}
```

## Function Overloads

A feature that allows us to define multiple function signatures, which simply means we can have multiple possible ways of calling a function with different parameters.

```ts
type Combinable = string | number;

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }
    return a + b
}

const result = add(1, 5)
// because of our function above, ts thinks that result is of type Combinable
// which makes sense because we've told ts that the two parameters that the
// function receives is type Combinable
// BUT we know that result should be type number

// so, we can do function overload
function add(a:number, b: number): number;
function add(a: string, b: string): string; 
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString()
    }
    return a + b
}

// ts combines the knowledge and now spits out the correct type based on what we've told it
```

## Optional Chaining

Let's say you have an app where you're getting data from any source where you don't know with certainty whether a certain property is defined.

```ts
const fetchedUserData = {
    id: 'u1',
    name: 'Max',
    job: { title: 'CEO', description: 'Owner of company' }
}

console.log(fetchedUserData.job.title)

// but what if fetchedUserData.job hasn't been set yet?

// in js, we'd do this:
console.log(fetchedUserData.job && fetchedUserData.job.title)

// but ts provides a nicer way, via chaining
console.log(fetchedUserData?.job?.title)

// ? asks ts whether fetchedUserData exists, if so then check if job exists, and if it does, then move forward with title
```

## Nullish Coalescing

This helps deal with null data. Imagine you have some data where you don't know whether it's null, undefined, or a valid piece of data.

```ts
const userInput = ''  // imagine we don't know what this is
// say we don't mind this being an empty string

const storedData = userInput || 'DEFAULT'
// in js, '' is a falsy value and so would take 'DEFAULT' rather than ''

const storedData = userInput ?? 'DEFAULT'
// ?? asks whether the input is ONLY EITHER NULL OR UNDEFINED
// since '' is NOT null or undefined, so '' would be accepted
```
