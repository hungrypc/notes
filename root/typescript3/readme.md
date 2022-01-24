# Extra TS notes

just some extra ts notes to dump here. will try to avoid repeating already learned concepts from previous notes as much as possible. from [frontend masters](https://frontendmasters.com/courses/typescript-v2)

## Interfaces & Type Aliases

self referencing types does *not* work.
```ts
// nope
type NumVal = 1 | 2 | 3 | NumArr
type NumArr = NumVal[]
```

interfaces can extend other interfaces, like how classes can extend from other classes.

type aliases are extremely flexible, but interfaces are limited to js object and sub types, which includes arrays and functions.

```ts
// interface
interface ContactMessenger1 {
    (contact: HasEmail | HasPhone, message: string): void
}

// type
type ContactMessenger2 = (
    contact: HasEmail | HasPhone,
    message: string
) => void
```

construct signatures can be described as well

```ts
interface ContactConstructor {
    new (...args: any[]): HasEmail | HasPhone
}
```
so this would be a way of describing a constructor that instantiates either things that have an email address or a phone number


when writing interfaces for dictionaries, you have to write it in such a way that ts gives you a false guarentee, that no matter what property key you pass in you will definitely get a well-defined value out
```ts
interface PhoneNumberDict {
    [numberName: string]: { // index signature
        areaCode: number
        num: number
    }
}

const d: PhoneNumberDict = {}
d.abc
// ^would give us { areaCode: number; num: number; }

// ^^^ DONT DO THIS
// instead...
interface PhoneNumberDict {
    [numberName: string]: undefined | {
        areaCode: number
        num: number
    }
}
// so
d.abc
// would give us: undefined | { areaCode: number; num: number; }
```
this forces a check and narrows the type


we can combine interfaces
```ts
interface PhoneNumberDict {
    [numberName: string]: undefined | {
        areaCode: number
        num: number
    },
}

interface PhoneNumberDict {
    home: {
        areaCode: number
        num: number
    },
    office: {
        areaCode: number
        num: number
    },
}

// would become
interface PhoneNumberDict {
    home: {
        areaCode: number
        num: number
    },
    office: {
        areaCode: number
        num: number
    },
    [numberName: string]: undefined | {
        areaCode: number
        num: number
    },
}
```
so we can combo this up. note: you *can't* do this with types, it will throw an error.



















