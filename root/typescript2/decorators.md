# Decorators

> Decorators are functions that can be used to modify/change/mess around with different properties or methods inside of a class

These are experimental in TS so they might change over time. 

```ts
class Boat {
    color: string = 'red'

    get formattedColor(): string {
        return `This color of this boat is ${this.color}`
    }

    @testDecorator
    pilot(): void {
        console.log('swish')
    }
}

function testDecorator(target: any, key: string): void {
    console.log('Target:', target)
    console.log('Key:', key )
}
```
If we run run this as a file, we'll get:
```
Target: Boat { formattedColor: [Getter], pilot: [Function] }
Key: pilot
```

So the decorator itself gets called with a couple of different arguments:

1. The **prototype** of the object
    + In this case, the prototype of class `Boat`
2. The key of the property/method/accessor that we applied our decorator to
    + In this case, the key is `pilot`
3. The property descriptor

Decorators are applied when the code for this class is ran (**not when an instance is created**). When we define class `Boat`, decorators get executed.
Again, because this note is important, a decorator only gets executed one single time when we define the class. 

Under the hood, this is what it looks like in js (stripped to its barebones):
```js
var __decorate = function(decorators, target, key, desc) {
    var desc = Object.getOwnPropertyDescriptor(target, key)

    for (var decorator of decorators) {
        decorator(target, key, desc)
    }
}
```

## Property Descriptors

> A property descriptor is essentially an object that is meant to configure a property on another object

Whenever we are working with a property descriptor for a method specifically, the property descriptor is going to have these following options:

- Writable
    + Boolean
    + Describes whether or not this property can be changed
- Enumerable
    + Boolean
    + Describes whether or not this property will be looped over in a `for...in`
- Value
    + Current value
- Configurable
    + Describes whether or not we can change the configuration of this property and whether or not the property can be deleted

```ts
class Boat {
    // ...

    @logError
    pilot(): void {
        throw new Error()
    }
}

function logError(target: any, key: string, desc: PropertyDescriptor): void {
    // this is going to be a reference to the function pilot()
    const method = desc.value

    desc.value = function() {
        try {
            method()
        } catch (err) {
            console.log('oops, boat sank')
        }
    }
}

new Boat().pilot()      // oops, boat sank
```
This is just one example of how we can get at a function and wrap it with some additional functionality.

## Decorator Factories

Howabout we customize the error message so that this decorator can be used on other classes that aren't Boats. How? Use a decorator factory

> A decorator factory is essentially a decorator that returns a function

```ts
class Boat {
    // ...

    @logError('oops, boat sank')
    pilot(): void {
        throw new Error()
    }
}

function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
        const method = desc.value

        desc.value = function() {
            try {
                method()
            } catch (err) {
                console.log(errorMessage)
            }
        }
    }
}

new Boat().pilot()      // oops, boat sank
```

## Decorators Around Properties

```ts
class Boat {
    @testDecorator
    color: string = 'red'

    @logError('oops, boat sank')
    pilot(): void {
        throw new Error()
    }
}

function testDecorator(target: any, key: string): void {
    console.log(target)
    console.log(key)
}

function logError(errorMessage: string) {
    return function (target: any, key: string, desc: PropertyDescriptor): void {
        const method = desc.value

        desc.value = function() {
            try {
                method()
            } catch (err) {
                console.log(errorMessage)
            }
        }
    }
}
```
The first argument to a decorator function is always going to be the prototype of this class. The prototype in js generally only stores methods definitions. Actual instance properties all get defined inside the constructor, so our decorators are never going to be able to access any instance properties on an instance (unless we get clever). The only rason that we can use decorators on properties at all is more so just for the ability to know that the property exists because of the key, but that's really it. So we wont be able to modify or change the properties through decorators. Main takeaway here is that whenever we use a decorator on a property inside of a class, we can't get direct access to that property - the decorator is being executed before we ever create an instance. 

Second thing to  note is that the only argument that we get to our decorator is the actual prototype as opposed to the actual value or anything like that. 

## More on Decorators

Places we can apply decorators:

```ts
@classDecorator
class Boat {
    @testDecorator
    color: string = 'red'

    @testDecorator
    get formattedColor(): string {
        return `This color of this boat is ${this.color}`
    }

    @logError('oops, boat sank')
    pilot(@parameterDecorator speed: string): void {
        if (speed === 'fast') {
            console.log('swish')
        } else {
            console.log('drip')
        }
    }
}

function classDecorator(constructor: typeof Boat) {
    console.log(constructor)
}

// so this would log the key and index of the argument(s)
function parameterDecorator(target: any, key: string, index: number) {
    console.log(key, index)
}

function testDecorator(target: any, key: string): void {
    console.log(key)
}

// ...
```