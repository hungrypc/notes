# Authentication with GraphQL
Changes will be made here:
[graphql-prisma](https://github.com/hungrypc/notes/tree/master/root/graphql/graphql-prisma)

Will update this readme with important notes along the way.

## Adding Prisma into GraphQL Queries
```js
// prisma.js
// ...
export { prisma as default }
// so that we can use prisma in other files

// index.js
import { GraphQLServer, PubSub } from 'graphql-yoga';
// ...
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer){
  // ...
  context: {
    db,
    pubsub,
    prisma
  }
};

// Query.js
// here we can take advantage of prisma, which now lives in context
const Query = {
  users(parent, args, { prisma }, info) {
    // info contains all of the info from the original operation, which is why we pass it to prisma
    return prisma.query.users(null, info)
  },
  // do the rest of the queries
};

```






































