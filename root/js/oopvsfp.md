# OOP vs FP

## Composition vs Inheritance

> Inheritance is a super class that is extended to smaller pieces that add or overwrite things

> Composition is using smaller piece to create something bigger

When it comes to inheritance, we're structuring things around what they *are* - they have data, as well as methods and actions that act upon that data. 

With composition, we focus and structure our code around what it *has* or what it does to the data - focusing on what the abilities are.

When we define something as *what it is*, we're saying that this class is going to have these properties and methods (inheritance). But if things change, we get a problem called the **tight coupling problem**. The coupling between a child class and its parent is a very tight form of coupling, meaning making a small change to a class will have rippling effects to all its subclasses. This also leads to the **fragile base class problem**, which is when code breaks as a result of the tight coupling. Another problem is the **hierarchy problem**, where some classes might inherit parts that it doesn't need because of the hierarchy set up - it's quite inflexible. 

How would we fix these problems with composition? We could remove all the methods and structure the code as to what it does to the data instead of what the thing we're trying to build is. 

## Pros and Cons

### FP

- FP is about performing many different operations for which the data is fixed 
- We don't modify state
- There are no side effects, they're pure


### OOP 

- OOP is about few operations on common data
- We are modifying state
- Procedures can access and modify the data fields of the object
- `this` and `self`


One of the reasons FP is becoming popular is because of purity. No side effects means that we can run code in parallel on multiple processors and it won't have effect on our program. It's also more declarative, it's about what we want to be doing. OOP is more about how we want things to be done (more imperative). 

So when should we use one over the other? 

FP is good at processing large data for applications. It works really well for high performance and processors because you can run it on multiple processors.If you have a few things that require a lot of operations, FP is usually a good idea.

If, on the other hand, you have many things, like characters in a game, with not too many operations, OOP might be a better solution. 

You can use ideas from both though, so it's not strictly one or the other. 