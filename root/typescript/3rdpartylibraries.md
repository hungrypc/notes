# 3rd Party Libraries & TypeScript

## Using JS Libraries (!) with TypeScript
```cli
npm i --save-dev @types/lodash
```
This installs a translation for ts to understand. Had we installed it regularly, it would not work since lodash is js for js.

Btw, what we'll be doing here is for a webpack setup

```ts
// app.ts
import _ from 'lodash'

console.log(_.shuffle([1, 2, 3, 4]))
```

## Using "decalre" as a "Last Resort"
What do we do if we have a lib where we can't install types like we did for lodash?

```html
<script type="text/javascript">
    var GLOBAL = 'this is set'
</script>
```

```ts
// app.ts
declare var GLOBAL: any
// telling ts that this will exist, so don't complain
```

## No Types Needed: class-transformer
There also are 3rd party libs that embrace ts and ts features, and so give you a brand new way of writing code because you are working with ts

```cli
npm i class-transformer --save
npm i reflect-metadata --save
```

```ts
// create product.model.ts
export class Product {
    title: string;
    price: number

    constructor(t:string, p:number) {
        this.title = t
        this.price = p
    }

    getInfo() {
        return [this.title, `$${this.price}`]
    }
}


// app.ts
import { Product } from './product.model'
import 'reflect-metadata'
import { planToClass } from 'class-transformer'

const products = [
{ title: 'carpet', 29.99 },
{ title: 'paper', 9.99 }
]

// const p1 = new Product('book', 12.99)
// console.log(p1.getInfo())

const loadedProducts = product.map(prod => {
    return new Product(prod.title, prod.price)
})
// instead of this^, we can do this:

const loadedProducts = planToClass(Product, products)
// this will go through our products object and turn each of them into the class Product

for(const prod of loadedProducts) {
    console.log(getInfo())
}
```

## TypeScript-embracing: class-validator

```cli
npm i class-validator --save
```

```ts
// product.model.ts
import { IsNotEmpty, IsNumer, IsPositive } from 'class-validator'

export class Product {
    @IsNotEmpty()
    title: string;
    @IsNumber()
    @IsPositive()
    price: number

    constructor(t:string, p:number) {
        this.title = t
        this.price = p
    }

    getInfo() {
        return [this.title, `$${this.price}`]
    }
}


// .tsconfig
{
    "compilerOptions": {
        // ...
        "experimentalDecorators": true,
        // ...
    }
}


// app.ts
import { Product } from './product.model'
import { validate } from 'class-validator'

const products = [
{ title: 'carpet', 29.99 },
{ title: 'paper', 9.99 }
]

const newProd = new Product('', -5.99)

validate(newProd).then(err => {
    if (err.length > 0) {
        console.log('validation errors', err)
    } else {
        console.log(newProd.getInformation())
    }
})
```
So now we can import more elaborate decorators for validation without having to write them ourselves.
