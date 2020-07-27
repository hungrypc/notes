# Typed Arrays

```ts
const carMakers: string[] = ['BMW', 'Ford', 'Toyota', 'Mitsubishi']
const dates: Date[] = [new Date(), new Date()]

const carsByMake: string[][] = [
    ['f150'],
    ['corolla'],
    ['m5']
]
```

## Why Typed Arrays?

- TS can do type inference when extracting values from an array
- TS can prevent us from adding incompatible values to the array
- We can get help with `map`, `forEach` `reduce`, etc
- Flexible - arrays can still contain multiple different types

## Multiple Types in Arrays

```ts
const importantDates: (string | Date)[] = [new Date(), '2020-10-10']
```

## When to Use Typed Arrays

We're going to an array in ts anytime we want to represent a collection of records usually with some very similar type about them. 

There is another very similar data structure in ts called tuples.

# Tuples

Looks like an array, holds fixed number of specific properties in a specific order.

```ts
// object
const drink ={
    color: 'brown',
    carbonated: true,
    sugar: 40
}

// tuple
const pepsi: [string, boolean, number] = ['brown', true, 40]
// OR
type Drink = [string, boolean, number]  // type alias
const sprite: Drink = ['clear', true, 30]
```

With this, we're saying that this array is always going to have a very consistent ordering of elements inside at a fixed number of elements. This makes it so that we can't change the order. 