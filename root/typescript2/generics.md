# Generics

```ts
class ArrayOfNumbers {
    constructor(public collection: number[]) {}

    get(index: number): number {
        return this.collection[index]
    }
}

class ArrayOfStrings {
    constructor(public collection: string[]) {}

    get(index: number): string {
        return this.collection[index]
    }
}
```
Here, we have two classes pretty much identical in nature, the only difference being one is for numbers and the other is for strings. Since they're so similar, it'd be ideal to condense these classes into one. To do that, we use generics. 

```ts
class ArrayOfThings<T> {
    constructor(public collection: T[]) {}

    get(index: number): T {
        return this.collection[index]
    }
}

new ArrayOfThings<string>(['a', 'b', 'c'])
new ArrayOfThings<number>([1, 2, 3])
```
T is like a placeholder for whatever type we want that class to have. 

## Type Inference with Generics

```ts
new ArrayOfThings(['a', 'b', 'c'])  // ArrayOfThings<string>
new ArrayOfThings([1, 2, 3])        // ArrayOfThings<number>
```
TS looks into the collection, recognizes what we're trying to do here and infers `<T>`.

## Function Generics

```ts
function printStrings(arr: string[]): void {
    for (let string of arr) {
        console.log(string)
    }
}

function printNumbers(arr: number[]): void {
    for (let num of arr) {
        console.log(num)
    }
}

// generic function
function printThings<T>(arr: T[]): void {
    for (let el of arr) {
        console.log(el)
    }
}

// inference also happens here
printThings([1, 2, 3])  // printThings<number>
```
Although TS can infer these things, it's better practice to include the types so that it's clear for both us and other developers.

## Generic Constraints

```ts
interface Printable {
    print(): void
}

function printHousesOrCars<T extends Printable>(arr: T[]): void {
    for (let item of arr) {
        item.print()
    }
}
```
We do this because `T` does not guarantee the `print()` method, so we extend `Printable` to let ts know that T *will* have the `print()` method.