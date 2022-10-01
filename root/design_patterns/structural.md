# Structural Design Patterns

+ [Adapter](https://github.com/hungrypc/notes/blob/master/root/design_patterns/structural.md#adapter)
+ [Bridge](https://github.com/hungrypc/notes/blob/master/root/design_patterns/structural.md#bridge)
+ [Composite](https://github.com/hungrypc/notes/blob/master/root/design_patterns/structural.md#composite)
+ [Decorator](https://github.com/hungrypc/notes/blob/master/root/design_patterns/structural.md#decorator)
+ [Facade](https://github.com/hungrypc/notes/blob/master/root/design_patterns/structural.md#facade)
+ [Flyweight](https://github.com/hungrypc/notes/blob/master/root/design_patterns/structural.md#flyweight)
+ [Proxy](https://github.com/hungrypc/notes/blob/master/root/design_patterns/structural.md#proxy)


## Adapter
The ::**Adapter**:: is a structural design pattern that allows objects with incompatible interfaces to collaborate.

### Problem:
Sometimes, the application will have to work with interfaces that are incompatible with each other. For example, maybe the app mainly works with XML format data but needs to integrate a 3rd party analytics library taht only works with data in JSON. The adapter pattern works as a bridge between these two incompatible interfaces.

### Solution:
The adapter is a special object that converts the interface of one object so that another object can understand it.

An adapter wraps one of the objects to hide the complexity of conversion happening behind the scenes. The wrapped object isn't even aware of the adapter.

This can not only convert data into various formats but can also help objects with different interfaces collaberate.

How it works:
1. The adapter gets an interface, compatible with one of the existing objects
2. Using this interface, the existing object can safely call the adapter's methods
3. Upon receiving  a call, the adapter passes the request to the second object, but in a format and order taht the second object expects

Sometimes it's even possible to create a two-way adapter that can convert the calls in both directions.

Structure:
1. The **Client** is a class that contains the existing business logic of the program
2. The **Client Interface** describes a protocol that other classes must follow to be able to collaborate with the client code
3. The **Service** is some useful class (usually 3rd party or legacy). The client can't use this class directly because it has an incompatible interface
4. The **Adapter** is a class that's able to work with both the client and the service: it implements the client interface, while wrapping the service object. The adapter receives calls from the client via the adapter interface and translates them into calls to the wrapped service object in a format it can understand.
5. The client code doesn't get coupled to the concrete adapter class as long as it works with the adapter via the client interface
  + Thanks to this, you can introduce new types of adapters into the program without breaking the existing client code

### Example:
```ts
interface BaseAdapter {
  createPaymentMethod: (user: User) => Promise<PaymentMethod>
  charge: (args: { amount: number; providerAccountId: string }) => Promise<Charge>
}

class StripeAdapter implements BaseAdapter {
  private stripeService: ReturnType<typeof StripeApiClient>

  constructor() {
    this.stripeService = StripeApiClient()
  }

  public async createPaymentMethod(user: User): Promise<PaymentMethod> {
    const { userId, firstName, lastName, emailAddress } = user
    const { id, ...account } = await this.stripeService.customers.create({
      email: emailAddress,
      name: [firstName, lastName || ''].join(' '),
      metadata: { userId },
    })

    return { provider: 'stripe', providerAccountId: id, details: account }
  }

  public async charge({ amount, providerAccountId }: { amount: number; providerAccountId: string }): Promise<Charge> {
    const stripeCharge = await this.stripeService.charges
      .create({ amount, customer: providerAccountId })
      .catch(err => {
        console.error('Failed to create charge on stripe', err)
        return { status: 'FAILED' }
      })
    
    return { status: stripeCharge.status === 'succeeded' ? 'SUCCESS' : 'FAILED' }
  }
}

class PaysafeAdapter implements BaseAdapter {
  private paysafeService: ReturnType<typeof PaysafeApiClient>

  constructor() {
    this.paysafeService = PaysafeApiClient()
  }

  public async createPaymentMethod(user: User): Promise<PaymentMethod> {
      const { id, ...account } = await this.paysafeService.createOneAccount({ emailAddress: user.emailAddress })
      const accountActivation = await this.paysafeService.activateCustomer({ accountId: id })

      if (accountActivation.status === 'ACTIVE') {
        return { provider: 'paysafe', providerAccountId: id, details: account }
      } else {
        throw new Error('Failed to activate Paysafe account')
      }
  }

  public async charge({ amount, providerAccountId }: { amount: number; providerAccountId: string }): Promise<Charge> {
    const paysafeCharge = await this.paysafeService.
      .chargeOneCustomer({ accountId: providerAccountId, principalAmount: amount, currency: 'CAD' })
      .catch(err => {
        console.error('Failed to create charge on paysafe', err)
        throw err
      })
    
    return { status: paysafeCharge.id ? 'SUCCESS' : 'FAILED' }
  }
}

class PaymentClientInterface {
  private providerAdapter: StripeAdapter | PaysafeAdapter

  constructor(provider: 'stripe' | 'paysafe') {
    switch (provider) {
      case 'stripe':
        this.providerAdapter = new StripeAdapter()
        break
      case 'paysafe':
        this.providerAdapter = new PaysafeAdapter()
        break
      default:
        throw new Error('provider is not supported')
    }
  }

  public async createOneProviderPaymentMethod(user: User): Promise<PaymentMethod> {
    return this.providerAdapter.createPaymentMethod(user)
  }

  public async chargeProviderAccount(args: { amount: number; providerAccountId: string }): Promise<Charge> {
    return this.providerAdapter.charge(args)
  }
}
```

### Use-case:

When...

- you want to use some existing class, but its interface isn't compatible with the rest of your code
- you want to reuse several existing subclasses that lack some common functionality that can't be added to the superclass

## Bridge
The ::**xxx**:: 

### Problem:

### Solution:

### Example:
```ts

```

### Use-case:


## Composite
The ::**xxx**:: 

### Problem:

### Solution:

### Example:
```ts

```

### Use-case:


## Decorator
The ::**xxx**:: 

### Problem:

### Solution:

### Example:
```ts

```

### Use-case:


## Facade
The ::**xxx**:: 

### Problem:

### Solution:

### Example:
```ts

```

### Use-case:


## Flyweight
The ::**xxx**:: 

### Problem:

### Solution:

### Example:
```ts

```

### Use-case:


## Proxy
The ::**xxx**:: 

### Problem:

### Solution:

### Example:
```ts

```

### Use-case:


