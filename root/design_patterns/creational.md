
# Creational Design Patterns

+ [Factory Method](#factory-method)
+ [Abstract Factory](#abstract-factory)
+ [Builder](#builder)
+ [Prototype](#prototype)
+ [Singleton](#singleton)

## Factory Method
The ::**Factory Method**:: is when we have an interface provided in a superclass (which does not expose the creation logic to the client) to create objects, and the subclasses can determine what type of object will be created.

### Problem:
When building an app, the first version may start with one class and as development progresses, all the logic of the app becomes coupled to that initial class. If we were to introduce a new class, it would require making changes to the entire codebase, riddling the app with conditionals that switches the app's behavior depending on the class.

### Solution:
The Factory Method pattern suggests that you replace direct object construction calls (using `new`) with calls to a special _factory_ method (objects are still created via `new` but is called from within the factory method). Objects returned by a factory method are referred to as "products".

1. The **Product** is the interface which is common to all objects that can be produced by the creator and its subclasses
2. **Concrete Products** are just different implementations of the product interface
3. The **Creator** class declares the factory method that returns new product objects
  + The return type of this method _must_ match the product interface
  + You can declare the factory method as abstract to force all subclasses to implement their own version of the method
  + Note that product creation is **not** the primary responsibility of the creator. Usually, the creator class already has some core business logic related to products. The factory method helps to decouple this logic from the concrete product classes
4. **Concrete Creators** override the base factory method so it returns a different type of product
  + Note, the factory method doesn't have to _create_ new instances all the time, it can also return existing objects from a cache, object pool, or another source
  
### Example:
```ts
/** `abstract` classes are mainly for inheritance where other classes may derive from them
 * We cannot create an instance of an abstract class. The class which extends the abstract
 * class must define all the abstract methods.
 */
abstract class Creator {
  /**
   * The Creator class declares the factory method that is supposed to return an
   * object of a Product class. The subclasses usually provide the implementation.
   * Note, the Creator can also provide some default implementation. 
   */ 
  public abstract factoryMethod(): Product

  /**
   * Remember, the Creator's primary responsibility IS NOT _creating_ the products.
   * It contains core business logic that relies on Product objects, returned by
   * the factory method.
   * 
   * Subclasses can indirectly change that business logic by overriding the factory
   * method and returning a different type of product from it.
   */
  public someOperation(): string {
    // call the factory method to create a Product object
    const product = this.factoryMethod()
    // now use the product
    return product.operation()
  }

}

/**
 * Concreate Creators override the factory method in order to change the
 * resulting product's type.
 */ 
class ConcreteCreator1 extends Creator {
  /**
   * Note, the signature method still uses the abstract product type,
   * even though the concrete product is actually returned from the method.
   * This way, the Creator can stay independent of concrete product classes.
   */
   public factoryMethod(): Product {
    return new ConcreteProduct1()
   }
}

class ConcreteCreator2 extends Creator {
  public factoryMethod(): Product {
    return new ConcreteProduct2()
  }
}

// The product interface declares the operations that all concrete products must implement
interface Product {
  operation(): string
}


// Concreate Products provide various implementation of the Product interface
class ConcreteProduct1 implements Product {
  public operation(): string {
    return 'Result of ConcreteProduct1'
  }
}

class ConcreteProduct2 implements Product {
  public operation(): string {
    return 'Result of ConcreteProduct2'
  }
}


/** Client code works with an instance of a concrete creator.
 * As long as the client keeps working with the creator via the base interface,
 * you can pass it any creator's subclass
 */
const clientCode = (creator: Creator) => {
  console.log("Client: I'm not aware of the creator's class, but it still works!")
  console.log(creator.someOperation())
}

console.log('App: Launched with ConcreteCreator1')
clientCode(new ConcreteCreator1())

console.log('App: Launched with ConcreteCreator2')
clientCode(new ConcreteCreator2())


/***** simpler example *****/

// without factory
class IOSButton { }
class AndroidButton { }

const button1 = os === 'ios' ? new IOSButton() : new AndroidButton()
const button2 = os === 'ios' ? new IOSButton() : new AndroidButton()

// with factory
class ButtonFactory {
  createButton(os: string): IOSButton | AndroidButton {
    if (os === 'ios') {
      return new IOSButton()
    } else {
      return new AndroidButton()
    }
  }
}

const factory = new ButtonFactory()
const button1 = factory.createButton(os)
const button2 = factory.createButton(os)
```

### Use-case:
When...

- you don't know beforehand the exact types and dependencies of the objects your code should work with
  + The Factory Method separates product construction code from the code that actually uses the product. This makes it easier to extend the product construction code independently from the rest of the code
- you want to provide users of your library/framework with a way to extend its internal components
- you want to save system resources by reusing existing objects instead of rebuilding them each time


## Abstract Factory
The ::**Abstract Factory**:: provides an interface that lets you create families of related objects without specifying their concrete classes.

### Problem:

### Solution:
First, explicitly declare interfaces for each distinct product of the product family. All variants of products can then follow these interfaces. Eg, all "chair" vairants can implement the `Chair` interface; all "table" variants can implement the `Table` interface, etc.

Next, declare the _Abstract Factory_ - an interface with a list of creation methods for all products that are part of the product family (eg `createChair`, `createSofa`, `createTable`). These methods must return **abstract** product types represented by the interfaces we extracted previously: `Chair`, `Sofa`, `Table`.

For product variants, we create a separate factory class based on the `AbstractFactory` interface. A factory is a class that returns products of a particular kind - `ModernFurnitureFactory` can only create `ModernChair`, `ModernSofa`, `ModernTable` objects.

The client code has to work with both factories and products via their respective abstract interfaces. This lets you change the type of factory that you pass to the client code, as well as the product variant that the client code receives, without breaking the actual client code.

> The client should not care about the concrete class of the factory it works with.

Let's say the client wants a factory to spit out a chair. The client doesn't care about the factory's class, nor the kind of chair it gets. The client treats all chairs the same, using the abstract `Chair` interface. With this approach, the only thing the client needs to know is that the chair implements the `sitOn` method in some way. Whichever variant of the chair returned, it'll always match the type of sofa or table produced by the same factory object.

One last thing, since the client is only exposed to the abstract interfaces, the application usually creates a concrete factory object at the initialization stage. Just before that, the app must select the factory type depending on the configuration or the environment settings.

Structure:
1. **Abstract Products** declare interfaces for a set of distinct but related products which make up a product family
2. **Concrete Products** are various implementations of abstract products, grouped by variants. Each abstract product must be implemented in all given variants
3. The **Abstract Factory** interface declares a set of methods for creating each of the abstract products
4. **Concrete Factories** implement creation methods of the abstract factory. Each concrete factory corresponds to a specific variant of products and creates only those product variants
5. Although concrete cactories instantiate concrete products, signatures of their creation methods must return corresponding abstract products. THis way the client code that uses a factory doesn't get coupled to the specific variant of the product it gets from a factory. The **Client** can work with any concrete factory/product variant, as long as it communicates with their objects via abstract interfaces

### Example:
```ts
/** Abstract Factory */
interface GUIFactory {
  createCheckbox(): Checkbox // Abstract Product A
  createButton(): Button // Abstract Product B
}


/** Concrete Factory 1 */
class WinFactory implements GUIFactory {
  public createCheckbox(): Checkbox {
    return new WinCheckbox()
  }

  public createButton(): Button {
    return new WinButton()
  }
}

/** Concrete Factory 2 */
class MacFactory implements GUIFactory {
  public createCheckbox(): Checkbox {
    return new MacCheckbox()
  }

  public createButton(): Button {
    return new MacButton()
  }
}

/** Abstract Product A */
interface Checkbox {
  onClick(): void
  getValue(): boolean
}


/** Concrete Product A1 */
class WinCheckbox implements Button {
  private value: boolean = false

  public onClick(): void {
    this.value = !this.value
    console.log('WinCheckbox value was changed')
  }

  public getValue(): boolean {
    return this.value
  }
}

/** Concrete Product A2 */
class MacCheckbox implements Button {
  private value: boolean = false

  public onClick(): void {
    this.value = !this.value
    console.log('MacCheckbox value was changed')
  }

  public getValue(): boolean {
    return this.value
  }
}

/** Abstract Product B */
interface Button {
  /** can do its own thing */
  onSubmit(): void 
  /**
   * or collaborate with other products
   * 
   * The Abstract Factory makes sure that all products it creates are of the
   * same variant and thus, compatible
   */
  printFormValues(collaborator: Checkbox): string
}

/** Concrete Product B1 */
class WinButton implements Button {
  public onSubmit(): void {
    console.log('WinButton clicked')
  }

  public printFormValues(collaborator: Checkbox): string {
    const result = collaborator.getValue()
    return `The result of collaborating checkbox was ${result}`
  }
}

/** Concrete Product B2 */
class MacButton implements Button {
  public onSubmit(): void {
    console.log('MacButton clicked')
  }

  public printFormValues(collaborator: Checkbox): string {
    const result = collaborator.getValue()
    return `The result of collaborating checkbox was ${result}`
  }
}


function clientCode(factory: GUIFactory) {
  const checkbox = factory.createCheckbox()
  const button = factory.createButton()

  checkbox.onClick()
  button.printFormValues(checkbox)
}

clientCode(new WinFactory())
clientCode(new MacFactory())
```

### Use-case:
When...

- your code needs to work with various families of related products, but you don't want it to depend on the concrete classes of those products in case they might not be known beforehand / you want to allow for future extensibility
  + as long as your code creates objects via this interface, you don't have to worry about creating the wrong variant of a product which doesn't match the products already created by your app
- you have a class with a set of **Factory Methods** that blur its primary responsibility
- a class deals with multiple product types - it may be worth extracting its factory methods into a stand-alone factory class or a full-blown Abstract Factory implementation


## Builder

The ::**Builder**:: constructs complex objects step by step. This enables the production of different types and representations of an object using the same construction code.

### Problem:
In cases where a complex object required laborous, step-by-step initialization of multiple fields and nested objects. This initialization code is usually buried within a monstrous constructor with a lot of parameters (or worse, scattered all over the client code).

Now, you _could_ extend the class and create a set of subclasses to cover all combinations of the params. But eventually, we might end up with a whole bunch of subclasses and any new parameter will require growing this hierarchy even more.

You could also create a giant constructor in the base class that has all possible parameters that control that class. Though this rids of the need for subclasses, most of the parameters may be unused and the constructor call can get hella ugly.

### Solution:
The Builder pattern suggests extracting the object construction code out of its own class and move it to separate objects called _builders_.

This pattern organizes construction into a set of steps. To create an object, we execute a series of these steps on a builder object. Note that you don't have to call all of the steps, only the ones necessary for producing a particular configuration of an object.

Maybe some of the steps requires different implementation when building various representations of the product. In that case, create several different builder classes that implements the same set of building steps, but in a different manner. This way, you can use these builders to produce different kinds of objects. However, this only works if the client code that calls the building steps is able to interact with builders using a common interface.

You can go further, extract a series of calls to the builder steps you use to construct a product into a separate class called **Director**. This guy defines the order in which to execute the building steps, while the builder provides the implementation for those steps. _Note, this isn't strictly necessary, you can call the building steps in a specific order directly from the client code BUT it might be a good place to put various construction routines so you can reuse them_. The director also hides the details of product construction from the client, all the client needs to know is which builder to associate with the director, launch the construction with the director, and get the result from the builder.

Structure:
1. **Builder** interface declare product construction steps that are common to all types of builders
2. **Concrete Builders** provide different implementations of the construction steps. They may produce products that don't follow the common interface
3. **Products** are resulting objects. Products constructed by different builders don't have to belong to the same class hierarchy or interface
4. **Director** class defines order in which to call construction steps, so you can create and reuse specific configs of products
5. **Client** must associate one of the builder objects with the director. Usually just done once via params of the director's constructor. There's also an alternative where the client passes the builder object to the production method of the director - in this case, you can use a different builder each time you produce something with the director

### Example:
```ts
// Builder interface specifies methods for creating different parts of Product
interface Builder {
  producePartA(): void
  producePartB(): void
  producePartC(): void
}

class ConcreteBuilder1 implements Builder {
  private product: Product1

  constructor() {
    // fresh builder instance should contain blank product object, which we're about to assemble
    this.reset() 
  }

  public reset(): void {
    this.product = new Product1()
  }

  public producePartA(): void {
    this.product.parts.push('PartA1')
  }

  public producePartB(): void {
    this.product.parts.push('PartB1')
  }

  public producePartC(): void {
    this.product.parts.push('PartC1')
  }

  /**
  * Concrete Builders need to provide their own methods for retrieving results.
  * This is because various types of builders may create completely different products 
  * that don't follow the same interface. Therefore, we don't declare such methods in
  * the base Builder interface.
  * 
  * Also, after returning the end result to the client, the builder needs to be ready
  * to produce another product. Though, this isn't mandatory, you can make the builder
  * wait for an explicit reset call before disposing the previous result.
  */
  public getProduct(): Product1 {
    const result = this.product
    this.reset()
    return result
  }
}

class Product1 {
  // Builder only makes sense when product is complex and has extensive config.
  // we'll just keep it simple as an example
  public parts: string[] = []

  public listParts(): void {
    console.log(`Parts: ${this.parts.join(', ')}\n`)
  }
}

class Director {
  private builder: Builder

  /**
   * Here, the Director works with any builder instance the client passes
   * to it. This way, client can alter the final type of the product
   */
  public setBuilder(builder: Builder): void {
    this.builder = builder
  }

  // product variations using same building steps
  public buildMinimalViableProduct(): void {
    this.builder.producePartA()
  }

  public buildFullFeatureProduct(): void {
    this.builder.producePartA()
    this.builder.producePartB()
    this.builder.producePartC()
  }
}

const Client = (director: Director) => {
  const builder = new ConcreteBuilder1()
  director.setBuilder(builder)

  console.log('basic product')
  director.buildMinimalViableProduct()
  builder.getProduct().listParts()

  console.log('full product')
  director.buildFullFeatureProduct()
  builder.getProduct().listParts()

  // Builder pattern can also be used without Director
  builder.producePartA()
  builder.producePartC()
  builder.getProduct().listParts()  
}

const director = new Director()
clientCode(director)
```

We can also achieve this via method chaining.

```ts
class HotDog {
  constructor(
    public bread: string,
    public ketchup?: boolean,
    public mustard?: boolean,
    public kraut?: boolean
  ) {}

  public addKetchup(): HotDog {
    this.ketchup = true
    return this
  }

  public addMustard(): HotDog {
    this.mustard = true
    return this
  }

  public addKraut(): HotDog {
    this.kraut = true
    return this
  }
}

const myLunch = new HotDog('gluten free')
  .addKetchup()
  .addMustard()
  .addKraut()

// though this isn't a great example imo, has the prob of telescopic constructor
```

### Use-case:

When...

- getting rid of a telescopic constructor (overloaded)
- you want your code to be able to create different representations of some product
- constructing [Composite](https://github.com/hungrypc/notes/tree/master/root/design_patterns#composite) trees or other complex objects


## Prototype
::**Prototype**:: lets you copy existing objects without making your code dependent on their classes, it delegates the cloning process to the actual objects that are being cloned

### Problem:


### Solution:
This pattern declares a common interface for all objects that support cloning. This interface lets you clone an object without coupling the code to the class of that object. Usually, the interface contains just a single `clone` method.

The method creates an object of the current class and carries over all of the field values of the old object into the new one. You can even copy private fields because most programming languages lets objects access private fields of other objects that belong to the same class.

An object that supports cloning is called a _prototype_. When your objects have dozens of fields and hundreds of possible configs, cloning them might serve as an alt to subclassing.

Structure:
1. The **Prototype** interface declares the cloning methods. In most cases, it's a single `clone` method.
2. The **Concrete Prototype** class implements the cloning method. In addition to copying the original object's data to the clone, this method may also handle some edge cases of the cloning process related to cloning linked objects, untangling recursive dependencies, etc
3. The **Client** can produce a copy of any object that follows the prototype interface

### Example:
```ts
class Prototype {
  public primitive: any
  public component: object
  public circularReference: ComponentWithBackReference

  public clone(): this {
    const clone = Object.create(this)

    clone.component = Object.create(this.component)

    /**
     * cloning an object that has a nested object with backreference
     * requires special treatment. after the cloning is completed, the
     * nested object should point to the cloned object, instead of the
     * original object
     */
     clone.circularReference = {
      ...this.circularReference,
      prototype: { ...this },
     }

     return clone
  }
}

class ComponentWithBackReference {
  public prototype

  constructor(prototype: Prototype) {
    this.prototype = prototype
  }
}

function clientCode() {
  const p1 = new Prototype()
  p1.primitive = 245
  p1.component = new Date()
  p1.circularReference = new ComponentWithBackReference(p1)

  const p2 = p1.clone()
  if (p1.primitive === p2.primitive) {
    console.log('prim values were carried over to clone')
  } else {
    console.log('prim values were NOT copied')
  }

  if (p1.component === p2.component) {
    console.log('simple comp was NOT cloned')
  } else {
    console.log('simple comp has been cloned')
  }

  if (p1.circularReference === p2.circularReference) {
    console.log('comp with back reference was NOT cloned')
  } else {
    console.log('comp with back reference has been cloned')
  }

  if (p1.circularReference.prototype === p2.circularReference.prototype) {
    console.log('comp with back reference is linked to ORIGINAL OBJECT')
  } else {
    console.log('comp with back reference is linked to CLONE')
  }
}

clientCode()
// prim values were carried over to clone
// simple comp has been cloned
// comp with back reference has been cloned
// comp with back reference is linked to CLONE


/** ANOTHER EXAMPLE */

// base prototype
abstract class Shape {
  public X: number
  public Y: number
  public color: string

  constructor(source?: Shape) {
    if (source) {
      this.X = source.X
      this.Y = source.Y
      this.color = source.color
    }
  }

  abstract  clone(): Shape
}


class Rectangle extends Shape {
  public width: number
  public height: number

  constructor(target?: Rectangle) {
    super(target)
    if (target) {
      this.width = target.width
      this.height = target.height
    }
  }

  public clone() {
    return new Rectangle(this)
  }
}

class Circle extends Shape {
  public radius: number

  constructor(target?: Circle) {
    super(target)
    if (target) {
      this.radius = target.radius
    }
  }

  public clone() {
    return new Circle(this)
  }
}

class Application {
  public shapes: Shape[]

  constructor() {
    const circle = new Circle()
    circle.X = 10
    circle.Y = 10
    circle.radius = 20

    const circleClone = circle.clone() // should be a copy

    const rectangle = new Rectangle()
    rectangle.width = 10
    rectangle.height = 20
    
    this.shapes = [circle, circleClone, rectangle]
  }

  cloneAndCompare() {
    const shapesCopy: Shape[] = []
    this.shapes.forEach(shape => {
      shapesCopy.push(shape.clone()) // shapesCopy should contain exact copies of shapes children
    })

    this.shapes.forEach((shape, index) => {
        if (shape !== shapesCopy[index]) {
            console.log('shapes are different objects :)')
            console.log({ ogShape: shape, clone: shapesCopy[index] })
        } else {
            console.log('shape objects are the same :(')
        }
    })
  }
}

const application = new Application()
application.cloneAndCompare()
// shapes will be different objects BUT identical 
```

### Use-case:



## Singleton
::**Singleton**:: lets you ensure that a class has only one instance, while providing a global access point to this instance

### Problem:
Solves 2 problems:

1. **Ensure that a class has just a single instance**

The reason we might want to do this is because we might want to control access to some shared resource.

2. **Provide a global access point to that instance**

This means you can access some object from anywhere in the program, but the Singleton pattern also protects that instance from being overwritten by other code.

### Solution:
- Make default constructor private, prevents other objects from using the new operator with the Singleton class
- Create a static creation method that acts as a constructor. This method calls the private constructor to create an object and save it in a static field. All following calls to this method returns the cached object

### Example:
```ts
class Settings {
  static instance: Settings
  public readonly mode = 'dark'

  // prevent new with private constructor
  private constructor() {}

  static getInstance(): Settings {
    if (!settings.instance) {
      Settings.instance = new Settings()
    }

    return Settings.instance
  }
}

const settings = new Settings() // throws error
const settings = Settings.getInstance()
```

### Use-case:

When...
 
- a class in your program should have just a single instance available to all clients (eg a db object shared by different parts of the program)
- you need stricter control over global variables
