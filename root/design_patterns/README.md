# Design Patterns notes

- [Dive into Design Patterns](https://refactoring.guru/design-patterns/book)
- [Design Patterns: Elements of Reusable Object-Oriented Software](https://www.amazon.ca/Design-Patterns-Elements-Reusable-Object-Oriented/dp/0201633612)

## TOC

- [Intro](https://github.com/hungrypc/notes/tree/master/root/design_patterns#intro)
	+ [OOP Basics](https://github.com/hungrypc/notes/tree/master/root/design_patterns#oop-basics)
	+ [Design Pattern Basics](https://github.com/hungrypc/notes/tree/master/root/design_patterns#design-patterns-basics)
		* [Design Principles](https://github.com/hungrypc/notes/tree/master/root/design_patterns#design-principles)
		* [SOLID Principles](https://github.com/hungrypc/notes/tree/master/root/design_patterns#solid-principles)
- [Design Patterns Catalogue](https://github.com/hungrypc/notes/tree/master/root/design_patterns#design-patterns-catalogue)
	+ [Creational](https://github.com/hungrypc/notes/tree/master/root/design_patterns/creational.md)
	+ [Structural](https://github.com/hungrypc/notes/tree/master/root/design_patterns/structural.md)

## Intro

Purpose: to design reusable and flexible object-oriented software. 

In finding solutions, we come across recurring patterns to solve particular problems. Instead of rediscovering these solutions over and over, we can look to these patterns and reuse successful designs and architectures. They help us choose design alternatives that make a system reusable and avoid alternatives that compromise reusability.

## OOP Basics

#### Objects, classes

> Object-oriented programming is a paradigm based on the concept of wrapping data and procedures related to that data and calling that an object, of which we use as a blueprint and identify it as a "class".

A class is basically a blueprint that outlines/defines the structure for objects, which are concrete instances of that class.

Data stored inside of the object's fields are referenced as _state_, and the object's methods are defined as its _behavior_

#### Pillars of OOP

1. **Abstraction**: Hiding unnecessary details from the user - represent all details relevant to this context with high accuracy while omitting the rest (creating simpler interfaces)
2. **Encapsulation**: Wrap code into boxes that are related to one another where these boxes can interact with each other using only methods and properties made available (hide parts of state and behaviour, exposing limited interface to the rest of the program)
3. **Inheritance**: Ability to build new classes on top of existing ones (avoid writing the same code)
4. **Polymorphism**: Ability to call the same method on different objects and each object responds in a different way (we can customize methods to their own object/class)

#### Relations between objects

Inherits copies the class to the T, where behavior is also copied. Implements makes a shallow copy, where you have the shell but the behavior is yet to be defined.

> Association: type of relationship where one object uses or interacts with another.

In general, we use an assocaition to represent something like a field in a class. The link is always there. Doesn't have to actually be a field, it can just indicate the presence of a method that will return the end thing. 

eg. `Professor` communicates to `Student`

> Dependency: weaker variant of association that implies that there isn't a permanent link between objects.

Dependency (typically) implies that an object accepts another object as a method parameter, instantiates, or uses another object. A dependency exists between two classes if changes to the definition of one class results in modifications in another class.

eg. `Professor` depends on `Salary`

> Composition: "whole-part" relationship between two objects, one of which is composed of one or more instances of the other.

Distinction between this relation and others is that the component can only exist as part of the container.

eg. `University` consists of `Department`s

> Aggregation: less strict variant of composition, where one object merely contains a reference to another.

The container doesn't control the life cycle of the component. The component can exist without the container and can be linked to several containers at the same time.

eg. `Department` contains `Professor`s

## Design Patterns Basics

### Classification

The most basic and low-level patterns are often called _idioms_ (usually applied only to a single programming language).

The most universal and high-level patterns are _architectural patterns_. They can be implemented in virtually any language. Unlike other patterns, they can be used to design the architecture of an entire application.

We'll cover 3 main groups of patterns:

1. **Creational patterns**: concerned with the process of object creation that increases flexibility and reuse of existing code 
2. **Structural patterns**: how to assemble objects and classes into larger structures (composition), while keeping them flexible and efficient
3. **Behavioral patterns**: ways in which objects/classes interact or communicate effectively, and the assignment of responsibility between them

### Design Principles

Most of the design patterns listed here are based on the following principles.

#### Encapsulate what varies

> Identify the aspects of your application that vary and separate them from what stays the same.

Purpose: to minimize the effect caused by changes. For example, imagine your program as a submarine navigating in mine infested waters, strike a mine and your sub can be seriously damaged. Knowing this, you can choose to separate the sub into separate compartments, sealed to limit damage to a single compartment. Now, if the sub hits a mine, the sub can still somewhat function. 

In the same way, we can isolate parts of the program that vary in independent modules, protecting the rest of the code from adverse effects. This saves us time from getting the program into working shape, time from implementing and testing the changes. Less time spent making changes = more time to implement features.

```ts
/* Encapsulation on a method level */
type Item = {
	price: number
	quantity: number
}

type Order = {
	items: Item[]
	country: 'US' | 'EU'
}

const getOrderTotal = (order: Order) => {
	const { items, country } = order
	let total = items.reduce((res, item) => res += item.price * item.quantity, 0)


	if (country === 'US') {
		total += total * 0.07 // US sales tax
	} else if (country === 'EU') {
		total += total * 0.20 // EU VAT
	}

	return total
}

// looking at the above, we can extract calculation logic into a separate method...
const getTaxRate = (country: string) => {
	switch (country) {
		case 'US':
			return 0.07 // US sales tax
		case 'EU':
			return 0.20 // EU VAT
		default:
			return 0
	}
}

const getOrderTotal = (order: Order) => {
	const { items, country } = order
	let total = items.reduce((val, item) => val + item.price * item.quantity, 0)

	total += total * getTaxRate(country)

	return total
}


/* Encapsulation on a class level */
class Order {
	items: Item[]
	country: Country
	// ...

	getOrderTotal() { /* ... */}

	getTaxRate() { /* ... */}
}

// here, we can remove all tax related work to another class to handle
class TaxCalculator {
	getTaxRate() {}
	// ...
}

class Order {
	items: Item[]
	country: Country
	taxCalculator: TaxCalculator

	constructor(items, country) {
		this.items = items
		this.country = country
		this.taxCalculator = new TaxCalculator()
	}

	getOrderTotal() { /* ... */ }
}
```

#### Program to an Interface, not an Implementation

> Program to an interface, not an implementation. Depend on abstractions, not on concrete classes.

A design is flexible enough if you can easily extend it without breaking any existing code.

When you want to set up collaboration between objects, consider:
1. Determine what exactly one object needs from the other, which method does it execute?
2. Describe these methods in a new interface or abstract class
3. Make the class that is a dependency implement this interface
4. Now make the second class dependent on this interface rather than on the concrete class. You still can make it work with objects of the original class, but the connection is now much more flexible

```ts
class Designer {
	designApp() {}
}

class Programmer {
	writeCode() {}
}

class Tester {
	testApp() {}
}

class Company {
	createSoftware() {
		const d = new Designer()
		const p = new Programmer()
		const t = new Tester()
		d.designApp()
		p.writeCode()
		t.testApp()
	}
}

// Company class is tightly coupled to concrete classes of employees. Despite the difference in their implementations, we can generalize various work-related methods and then extract a common interface for all employee clases

class Employee {
	doWork() {}
}

class Designer implements Employee {
	doWork() { /* designApp */ }
}

class Programmer implements Employee {
	doWork() { /* writeCode */ }
}

class Tester implements Employee {
	doWork() { /* testApp */ }
}

class Company {
	employees: Employee[]

	constructor() {
		this.employees = [
			new Designer(),
			new Progammer(),
			new Tester()
		]
	}

	createSoftware() {
		for (const employee of employees) {
			employee.doWork()
		}
	}
}

// this is better because polymorphism helped us simplify the code, but the rest of the Company class still depends on the concrete employee classes. this is bad because if we introduce new types of companies that work with other types of employees, we'll need to override most of the Company class instead of reusing code

// to solve this, we could declare method for getting employees as abstract

class Company {
	getEmployees(): Employee[] {}

	createSoftware() {
		const employees = this.getEmployees()
		for (const employee of employees) {
			employee.doWork()
		}
	}
}

class GameDevCompany extends Company {
	getEmployees() {
		return [new Designer(), new Artist()]
	}
}

class OutsourcingCompany extends Company {
	getEmployees() {
		return [new Programmer(), new Tester()]
	}
}

// here, the primary method of the Company class is independent from concrete employee classes. Employee objects are created in concrete company subclasses
```

#### Favor composition over inheritance

The easiest way to reuse code between classes is via inheritance, but that comes with caveats.

- **A subclass can't reduce the interface of the superclass**
	+ You have to implement all abstract methods of the parent class even if you won't be using them
- **When overriding methods you need to make usre that the new behaviour is compatible with the base one**
	+ Important because objects of the subclas may be passed to any code that expects objects of the superclass and you don't want that to break
- **Inheritance breaks encapsulation of the superclass**
	+ ...because the internal details of the parent class becomes available to the subclass
- **Subclasses are tightly coupled to the superclass**
	+ Any change in a superclass may break the functionality of subclasses
- **Trying to reuse code through inheritance can lead to creating parallel inheritance hierarchies**
	+ Inheritance usually takes place in a single dimension... but whenever there are two or more dimensions, you have to create lots of class combos, bloating the class hierarchy

Alternative to inheritance = composition. Inheritance represents "is a" relationship (a Car _is a_ Transport). Composition represents the "has a" relationship (a Car _has an_ Engine).

### SOLID Principles

Note: as with everything, don't take these principles as dogma, think about the application.

#### **S**ingle Responsibility
> A class should have just one reason to change

Try to make every class responsible for a single part of the functionality, and make that responsibility entirely encapsulated (hidden within) the class.

The goal of this principle is to reduce complexity. Problems will emerge while the program constantly grows and changes and at some point it'll be so big that you wont remember all the details. Plus, if a class does too many things, you'll have to change it every time one of these things changes, which risks breaking other parts that you might not have intended to change.

If you feel like its becoming hard to focus on specific aspects of the program one at a time, it might be an indicator to start dividing it into parts.

#### **O**pen/Closed
> Classes should be open for extension but closed for modification

The idea behind this is to keep existing code from breaking when you implement new features.

When we call a class _open_, it means that we can extend it, produce a subclass, do whatever with it (add new methods/fields, override behavior, etc). When we call a class _closed_, it means that it's complete, meaning it's ready to be used by other classes because it's clearly defined and won't be changed in the future.


#### **L**iskov Substitution Principle
> When extending a class, remember that you should be able to pass objects of the subclass in place of objects of the parent class without breaking the client code

Meaning that the subclass should remain compatible with the behavior of the super class. If you override a method, extend the base behavior rather than replacing it with something else entirely.

This principle actually has a set of formal requirements for subclasses, specifically for their methods:

- Parameter types in a method of a subclass should _match_ or be _more abstract_ than parameter types in the method of the superclass
- The return type in a method of a subclass should _match_ or be a _subtype_ of the return type in the method of the superclass
- A method in a subclass should'nt throw types of exceptions which the base method isn't expected to throw
- A subclass shouldn't strengthen pre-conditions, meaning don't add extra pre-conditions onto the parameters (eg base method parameter type `number` and subclass overrides with requirement positive `number`; suddenly base method that was able to accept negative numbers breaks)
- A subclass should'nt weaken post-conditions (?)
- Invariants of a superclass must be preserved
	+ _Invariants: conditions in which an object makes sense_. (eg invariants of a cat are: has 4 legs, can meow, etc)
- A subclass shouldn't change values of private fields of the superclass

#### **I**nterface Segregation Principle
> Clients shouldn't be forced to depend on methods they do not use.

Try to make your interfaces narrow enough that client classes don't have to implement behaviors they don't need, cut the fat, make it more granular and specific. Otherwise, changes to the "fat" might break clients that don't even use the changed methods.

Basically, it's unnecessary to cram a bunch of unrelated methods into a single interface, just break them down.

#### **D**ependency Inversion Principle
> High-level classes should _NOT_ depend on low-level classes. Both should depend on abstractions. Abstractions shouldn't depend on details. Details should depend on abstractions.

Usually, you can make a distinction between two levels of classes:

- **Low-level classes**
	+ implements basic operations like working with a disk, connecting to a db
- **High-level classes**
	+ contains complex business logic that directs low-level classes to do something

One approach is to design low-level classes first, then work on high-level. This is common when starting a prototype of a new system, mainly because you aren't really sure what's possible at the higher level yet since the lower level stuff isn't clear or hasn't been implemented. This, however, tends to make business logic classes dependent on low-level classes.

This principle suggests doing it the other way around
1. First, describe interfaces for low-level operations that high-level classes rely on (in business terms if you can)
2. Now, you can make the high-level classes dependent on those interfaces, rather than on concrete low-level classes. This makes the dependency softer
3. Once low-level classes implement these interfaces, they become dependent on the business logic level, refersing the direction of the original dependency

This often goes along with the [open/closed principle](https://github.com/hungrypc/notes/tree/master/root/design_patterns#open-closed): you can extend low-level classes to use with different business logic classes without breaking existing classes.

# Design Patterns Catalogue
