# Annotations with Functions and Objects

```ts
const add = (a: number, b: number): number => {
    return a + b
}

function divide(a: number, b: number): number {
    return a / b
}

const multiply = function(a: number, b: number): number {
    return a * b
}
```

So, ts can make sure that we are returning the correct type of value, but it doesn't try to make sure that we have the correct logic (such as our add function returning `a - b`, it only cares that the function is returning a number). The type system is only concerned with types. 

Every time we define a function, we **must always** add type annotations for the arguments, there is no type inference. With the output, we do have the benefit of type inference, but we shouldn't really use it since we want to be clear about what we want back.

## Void and Never

```ts
const logger = (message: string): void => {
    console.log(message)
}

const throwError = (message: string): never => {
    throw new Error(message)
}
```

Void means the function doesn't return anything. Technically, functions that return void can also return `null` and `undefined`, but same concept.

Never means that we're never going to actually reach the end of this function. Pretty rare to use this though, usually we return something eventually. 

## Destructuring with Annotations

```ts
const forecast = {
    date: new Date(),
    weather: 'sunny'
}

const logWeather = ({ date, weather }: { date: Date, weather: string }): void => {
    console.log(date)
    console.log(weather)
}

logWeather(forecast)
```

## Annotations Around Objects

```ts
const profile = {
    name: 'phil',
    age: 26,
    coords: {
        lat: 0,
        lng: 15
    },
    setAge(age: number): void {
        this.age = age
    }
}

const { age }: { age: number } = profile
const { 
    coord: { lat, lng } 
}: { coords: { lat: number, lng: number } } = profile
```