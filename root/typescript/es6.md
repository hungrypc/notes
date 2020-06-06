# Next-generation JS and TS

## "let" and "const"

We already know that "const" means constant, meaning it cannot be changed. Now, TS will give us an error in development whenever we try to redefine a constant. With "let", we get errors when it comes to scope. Once again, the advantage here is getting errors in development rather than at runtime. 

## Arrow Functions

```ts
// we already know arrow functions can be written like this
const add = (a, b) => a + b

// in ts, it looks like this:
const add = (a: number, b: number) => a + b

// we can also do this:
const printOutput = (output: string | number) => console.log(output)

// since we only have one argument, we can omit the parenthesis, but then we'd lose the type assignment, so we'd have to write it like this:
const printOutput: (a: number | string) => void = output => console.log(output)

// this is more concise syntax
```

## Default Function Parameters
Self-explanatory.
```ts
const add = (a: number, b: number = 1) => a + b
```

## Rest Parameters
Self-explanatory.
```ts
const add = (...numbers: number[]) => {
    return numbers.reduce((a, b) => a + b, 0)
}

add(5, 10, 2, 3, 7)
```
