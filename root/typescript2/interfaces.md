# Interfaces

```ts
interface Vehicle {
    name: string
    year: number
    broken: boolean
}

const oldCivic = {
    name: 'civic',
    year: 2000,
    broken: true
}

const printVehicle = (vehicle: Vehicle): void => {
    const { name, year, broken } = vehicle
    console.log(name, year, broken)
}

printVehicle(oldCivic)
```

## Syntax Around Interfaces

```ts
interface Vehicle {
    name: string
    date: Date
    broken: boolean
    summary(): string
}
```

With interfaces, the only question it asks is does this satisfy the requirements for this variable to be what the interface describes?
