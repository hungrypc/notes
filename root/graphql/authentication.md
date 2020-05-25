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


## Integrating Operation Arguments
```js
// Query.js
// adding operation arguments to prisma
const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      // changing the structure of opArgs based on whether there are any queries or not
      opArgs.where = {
        OR: [
        // prisma given operation
          {
            name_contains: args.query
            // prisma given operation
          },
          {
            email_contains: args.query
            // prisma given operation
          }
        ]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  // do the rest of the queries
};

```
Now, we can run queries like:

```graphql
query {
  users (
    query: "Phil"
  ) {
    id
    name
  }
}
```


## Refactoring Custom Type Resolvers
Our queries are working only when we request scalar fields, relational data hasn't been handled yet.

We actually don't have to do much other than remove whats in our User.js resolver since prisma already handles relational data for us. This is because of the info argument. Do this for all other resolvers.


## Adding Prisma into GraphQL Mutations
Cleaning up and simplifying.

```js
// Mutation.js
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email })

    if (emailTaken) {
      throw new Error('Email taken')
    }

    return await prisma.mutation.createUser({ data: args.data }, info)
  },
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id })

    if (!userExists) {
      throw new Error('User not found')
    }

    return prisma.mutation.deleteUser({
      where: {
        id: args.id
      }
    }, info)
  },
  async updateUser(parent, args, { prisma }, info) {
    return await prisma.mutation.updateUser({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
  async createPost(parent, args, { prisma }, info) {
    return await prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
  },
  async deletePost(parent, args, { prisma }, info) {
    return await prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)
  },
  async updatePost(parent, args, { prisma }, info) {
    return await prisma.mutation.updatePost({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
  async createComment(parent, args, { prisma }, info) {
    return await prisma.mutation.createComment({
      data: {
        text: args.data.text,
        post: {
          connect: {
            id: args.data.post
          }
        },
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
  },
  async deleteComment(parent, args, { prisma }, info) {
    return await prisma.mutation.deleteComment({
      where: {
        id: args.id
      }
    }, info)
  },
  async updateComment(parent, args, { prisma }, info) {
    return await prisma.mutation.updateComment({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  }
}
```
































