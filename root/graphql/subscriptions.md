# Subscriptions

Setting up GraphQL to listen for data updates.

## Subscription Basics
```graphql
# schema.graphql
# ...
type Subscription {
  count: Int!
}
# ...
```

```js
////// Subscription.js
const Subscription = {
  count: {
    subscribe(parent, args, { pubsub }, info) {
      let count = 0;

      setInterval(() => {
        count++;
        // send data
        pubsub.publish('count', {
          count
        })
      }, 1000);

      // sets up channel: count
      return pubsub.asyncIterator('count');
    }
  }
}
export { Subscription as default };


////// index.js
import { GraphQLServer, PubSub } from 'graphql-yoga';
// ...
import Subscription from './resolvers/Subscription';

const pubsub = new PubSub();

const server = new GraphQLServer){
  // ...
  resolvers: {
    // ...
    Subscription,
    // ...
  },
  context: {
    db,
    pubsub
  }
}
```
Query:

```graphql
subscription {
  count
}
```
So we've set this up to watch for a change in data for the variable 'count'. Whenever count updates, GraphQL updates and sends us back this updated data. At this point, we've set up a subscription but it's not doing anything meaningful yet.




























