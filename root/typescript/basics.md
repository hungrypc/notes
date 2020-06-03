# TypeScript Basics & Basic Types

## Using Types

TypeScripts provide many types to JS (moreso than what JS provides). Let's start with three basic types we're very familiar with.

- number
  - All numbers, no differentiation between ints or floats
- string
  - All text values
- boolean

```typescript
function add(n1: number, n2: number) {
    // here, we're telling tsc that these arguments should be numbers
    return n1 + n2
}

const number1 = '5'
const number2 = 8

const result = add(number1, number2)
console.log(result)

// tsc app.ts 

// this would throw an error because number1 is a string
// we're adding an extra step to be explicit with what we're doing
// that way, we're avoiding mistakes and errors such as the one we have here
```



































