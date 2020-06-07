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


























