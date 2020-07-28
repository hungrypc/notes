# Building Functionality with Classes

> A Class is a blueprint to create an object with some fields (values) and methods (functions) to represent a 'thing'

```ts
class Vehicle {
    drive(): void {
        console.log('vroom')
    }

    honk(): void {
        console.log('beep')
    }
}

const dummyVehicle = new Vehicle()
dummyVehicle.drive()    // vroom
dummyVehicle.honk()     // beep

class Car extends Vehicle {
    // override inherited method
    drive(): void {
        console.log('kavroom')
    }
}

const dummyCar = new Car()
dummyCar.drive()        // kavroom
dummyCar.honk()         // beep
```
Pretty standard stuff, expected behavior as js.

## Instance Method Modifiers

> Modifiers are different keywords we can place on different methods and properties inside of a class. 

- `public` : this method can be called anywhere, any time
- `private` : this method can only be called by *other* methods within *this* class
- `protected` : this method can be called by other methods within *this* class, or by other methods within child classes

Public is default.

```ts
class Vehicle {
    private drive(): void {
        console.log('vroom')
    }

    startDrivingProcess(): void {
        this.drive()
    }
}
const vehicle = new Vehicle()
vehicle.startDrivingProcess()   // vroom
```
With `private`, we can no longer call `vehicle.drive()` since it's private. It can only be called *within* the class, which is why we can call it through `startDrivingProcess()`. This is good for restricting access to a function. This isn't really for application security, it's more so to restrict the different methods that other devs can call. 

```ts
class Vehicle {
    protected honk(): void {
        console.log('beep')
    }
}

class Car extends Vehicle {
    startDrivingProcess(): void {
        this.honk()
    }
}
```
So with `protected`, we have the same restriction as `private` where `honk()` can only be called within the class, but we can now also call `honk()` within the child class.

## Fields in Classes

```ts
// three ways to initialize property
class Vehicle {
    color: string = 'red'
}

class Vehicle {
    color: string

    constructor(color: string) {
        this.color = color
    }
}

class Vehicle {
    constructor(public color: string) {
    }
}
```
The last two are the same, third being a shortcut. 

Modifiers also applicable to properties.

## Fields with Inheritance

```ts
class Vehicle {
    constructor(public color: string) {
    }
}

class Car extends Vehicle {

}

const car = new Car('red')
```
Notice that `Car` doesn't have a constructor, but since it extends `Vehicle`, the constructor in `Vehicle` gets called and requires car to have a color.

Things get different when adding a constructor to `Car`

```ts
class Vehicle {
    constructor(public color: string) {
    }
}

class Car extends Vehicle {
    constructor(public wheels: number, color: string) {
        super(color)
    }
}
const car = new Car(4, 'red')
```

`super()` is a reference to the constructor in the parent. 

## Where to Use Classes

Interfaces and Classes are going to be the primary tools we use inside of TS. 