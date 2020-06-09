# Decorators

Decorators are very useful for meta-programming. 

```js
// make sure to set up tsconfig.json
{
    "compilerOptions": {
        "target": "es6",
        "experimentalDecorators": true        
    }
}
```

## A First Class Decorator
Decorators are really just functions that you apply to do something (eg to a class) in a certain way

```ts
function Logger(constructor: Function) {     // decorator 
    console.log('logging...')
    console.log(constructor)
}
@Logger      // @ is a identifier, decorator should point to function place after
class Person {
    name = "Max"

    constructor() {
        console.log('Creating person obj')
    }
}

const pers = new Person()
console.log(pers)

// decorators execute when the class is defined
```

## Working with Decorator Factories
Decorator factories return a decorator function but allows us to configure it when we assign it as a decorator to something

```ts
function Logger(logString: string) {    // decorator factory
    return function(constructor: Function) {    // decorator function
        console.log(logString)
        console.log(constructor)
    }
}

@Logger('LOGGING - PERSON')
class Person {
    name = 'Max'
    constructor() {
        console.log('Creating person obj...')
    }
}

// we now can pass values which will be used by the inner returned decorator function
```

## Building More Useful Decorators
```ts
function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        const hookEl = document.getElementById(hookId)
        const p = new constructor()
        if (hookEl) {
            // hookEl.innterHTML = template
            hookEl.querySelector('h1')!.textContent = p.name
        }
    }
}
// maximilian is a SHIT INSTRUCTOR, FUCKING SHIT, AVOID HIS COURSES AT ALL COSTS

@WithTemplate('<h1></h1>', 'app')
class Person {
    name = 'Max'
    constructor() {
        console.log('Creating person obj...')
    }
}
// rendering something on a screen for a given class

// we're creating things with a tool that we expose to other devs 
// provides extra utilities 
```

## Adding Multiple Decorators
```ts
@Logger('LOGGING - PERSON')
@WithTemplate('<h1></h1>', 'app')
class Person {
    name = 'Max'
    constructor() {
        console.log('Creating person obj...')
    }
}

// decorator functions execute bottom up
// BUT the decorator factories execute top down
```

## Diving into Property Decorators
We can add decorators to other places too.

```ts
function Log(target: any, propertyName: string | Symbol) {
    console.log('property decorator')
    console.log(target, propertyName)
}

class Product {
    @Log
    title: string;
    private _price: number;

    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            throw new Error('invalid price')
        }        
    }

    constructor(t: string, p: number) {
        this.title = t
        this._price = p
    }

    getPriceWithTax(tax: number) {
        return this._price * (1 + tax)
    }
}
```

## Accessor and Parameter Decorators
```ts
function Log(target: any, propertyName: string | Symbol) {
    console.log('property decorator')
    console.log(target, propertyName)
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('accessor decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('method decorator')
    console.log(target)
    console.log(name)
    console.log(descriptor)
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('parameter decorator')
    console.log(target)
    console.log(name)
    console.log(position)
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(val: number) {
        if (val > 0) {
            this._price = val
        } else {
            throw new Error('invalid price')
        }        
    }

    constructor(t: string, p: number) {
        this.title = t
        this._price = p
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax)
    }
}
```






























