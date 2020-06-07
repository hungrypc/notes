# Classes and Interfaces

## Classes

### Creating a First Class
This is how we build classes with ts.

```ts
class Department {
    name: string;

    constructor(n: string) {
        this.name = n
    }
}
```

### Private and Public Access Modifiers

```ts
class Department {
    name: string;
    private employees: string[] = [];

    constructor(n: string) {
        this.name = n
    }

    addEmployee(employee: string) {
        this.employees.push(employee)
    }
}

const accounting = new Department("Accounting")

accounting.addEmployee('Max')
accounting.addEmployee('Anna')

accounting.employees[2] = 'Anna'    // this wouldn't work now that employees is private
// we can add employees with addEmployee because the array is accessible within the class

// anything without private is considered public, so there's no need to explicitly state it unless you want to
```

### Shorthand Initialization

```ts
class Department {
    private employees: string[] = []
    constructor(private id: string, public name: string) {
    }
}

const accounting = new Department('d1', 'Accounting')

// because we've added access modifiers in the constructor, we have no need for this.id or this.name, it's implied that we'll have these 
```

### "readonly" Properties

"readonly" is a ts property, not available in js. This makes it so that we cannot overwrite the property we've given the "readonly" modifier to. 

```ts
class Department {
    constructor(private readonly id: string, public name: string) {
    }
}
// this adds extra safety that a certain property should only be initialized once and shouldn't change after
```

### Inheritance

Say we want another class like our department class, but the new class has properties that the regular class doesn't provide. We can extend it.

```ts
class ITDepartment extends Department {
    constructor(id: string, admins: string[]) {
        super(id, 'IT')     // this inherits the Department constructor and feeds it data
        this.admins = admins
    }
}
```

### Overriding Properties and the "protected" Modifier

```ts
// now, if we try to do something like this:
class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
    }

    addEmployee(name: string) {
        this.employees.push(name)   // this would not work
    } 
    // the error we get is "'employees' is private and only accessible within class Department"
}

// private means its only accessible within the class it's defined, so AccountingDepartment doesn't have access to this

// if we want to grant that access and still make sure that it's not a property that can be changed from outside, we can change it to protected

class Department {
    protected employees: string[] = []
    constructor(private id: string, public name: string) {
    }
}
// this makes it so that 'employees' is accessible to any class that extends this class
```

### Static Methods and Properties

You can have properties that you want to access directly ON the class, typically used for utility functions or global constants that you want to store in a class.

```ts
class Department {
    static fiscalYear = 2020
    protected employees: string[] = []
    constructor(private id: string, public name: string) {
    }
}

console.log(Department.fiscalYear)  // 2020
// you can't access static properties from inside the class without calling it with the class name btw
```

### Abstract Classes

```ts
abstract class Department {
    static fiscalYear = 2020
    protected employees: string[] = []
    constructor(private id: string, public name: string) {
    }

    abstract describe(this: Department): void;
}

// allows us to do this:
class AccountingDepartment extends Department {
    constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
    }

    describe() {
        console.log(`IT - id: ${this.id}`)
    }
}
// abstract forces us to have a desribe method but we have the freedom to determine how we want that method to work within our new class
// this is useful if we want to enforce that all classes that extends a certain class
// shares a common method or property, but it makes sure you don't have to provide the concrete implementation
```

### Singleton and Private Constructors

> There's a pattern in OOP called the Singleton Pattern. It is about ensuring that you have always only have exactly one instance of a certain class.

```ts
class AccountingDepartment extends Department {
    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
    }
    // ...
}

// this ensures that we can't call new on this class, meaning it's only accessible from inside the class
// so how do we get inside the class when we cant create objects based on it?
// static methods.

class AccountingDepartment extends Department {
    private static instance: AccountingDepartment 
    // so we have a static property which is accessible from the class itself
    // but only from inside the class (private)
    // so the value we store in there will be of type AccountingDepartment, so of the class itself

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting')
    }
    
    static getInstance() {
        if (this.instance) {
            return this.instance
        } else {
            this.instance = new AccountingDepartment('d2', [])
            return this.instance
        }
    }
}

const accounting1 = AccountingDepartment.getInstance()
const accounting2 = AccountingDepartment.getInstance() // this doesnt create a new instance, it gives us the same instance as accounting 1
```


## First Interfaces

> An Interface describes the structure of an object. We can use it to describe how an object should look like.

```ts
interface Person {
    name: string;
    age: number;

    greet(phrase: string): void;
}
let user1: Person;

user1 = {
    name: 'Phil',
    age: 26,
    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`)
    }
}

user1.greet('Hi there, I am')
```

### Using Interfaces with Classes

An interface can be used as a contract a class can implement and a class then has to adhere to. 

```ts
interface Greetable {
    name: string;
    greet(phrase: string): void
}

class Person implements Greetable {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n 
        this.age = a
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`)
    }
}

let user1: Greetable;

user1 = new Person('Phil', 26)

// because we're implementing the Greetable interface, the Person class HAS to adhere to a basic structure/feature that is based on Greetable
```

### Readonly Interfaces Properties

Adding `readonly` to an interface property makes it clear that that property in whatever object that is built based on the interface must only be set once and is only read only after, so it can't be changed after it has been intialized.

```ts
interface Greetable {
    readonly name: string;
    greet(phrase: string): void
}

class Person implements Greetable {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n 
        this.age = a
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`)
    }
}

let user1: Greetable;

user1 = new Person('Phil', 26)
user1.name = 'Someone else'    // this won't work because it's readonly
```

### Extending Interfaces

```ts
interface Named {
    readonly name: string;
}

interface Greetable extends Named {
    greet(phrase: string): void
}

class Person implements Greetable {
// OR class Person implements Greetable, Named {
    name: string;
    age: number;

    constructor(n: string, a: number) {
        this.name = n 
        this.age = a
    }

    greet(phrase: string) {
        console.log(`${phrase} ${this.name}`)
    }
}
```

### Interfaces as Function Types

Interfaces can also be used to define the structure of a function.

```ts
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn

add = (n1: number, n2: number) => {
    return n1 + n2
}
```

### Optional Parameters and Properties

```ts
interface Named {
    readonly name: string;
    outputName?: string; // the ? tells ts that objects based on this interface CAN have outputName but doesn't have to
}

// you can also have optional properties on classes

class Person implements Named {
    name: string;
    hobbies?: string[];

    constructor(n: string, h?: string[]){
        this.name = n
        if (h) {
            this.hobbies = h
        }
    }

    // ...
}
```

### Compiling Interfaces to JS

JS does not translate our interfaces whatsoever. This is because there IS NO translation for interfaces, it's purely TS, only available during development and compilation. They're soley for the purpose of writing clearer clode. 
