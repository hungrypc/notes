# Pagination and Sorting with GraphQL

## Pagination

Prisma gives us a couple premade operation arguments that can help us paginate.

```graphql
type Query {
  users(query: String, first: Int, skip: Int): [User!]!  # add first and skip
  posts(query: String, first: Int, skip: Int): [Post!]!
  # ...
}
```

```js
// Query.js
const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,    // add first
      skip: args.skip       // add skip
    }

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true
      },
      first: args.first,
      skip: args.skip
    }

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }]
    }

    return prisma.query.posts(opArgs, info)
  },
  // ...
};
```


## Pagination Using Cursors

We can also start pagination at a certain point (such as after a certain post).

```graphql
type Query {
  users(query: String, first: Int, skip: Int, after: String): [User!]!  # add after
  posts(query: String, first: Int, skip: Int, after: String): [Post!]!
  # ...
}
```

```js
// Query.js
const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after       // add after
    }

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true
      },
      first: args.first,
      skip: args.skip,
      after: args.after
    }

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }]
    }

    return prisma.query.posts(opArgs, info)
  },
  // ...
};
```


## Working with updatedAt and createdAt

```graphql
# datamodel.graphql
type User {
  # ...
  updatedAt: DateTime! @updatedAt
  createdAt: DateTime! @createdAt
}

# cd prisma
# prisma deploy
# cd ..
# npm run get-schema


# schema.graphql
type User {
  # ...
  updatedAt: String!
  createdAt: String!
}
```


## Sorting Data

```graphql
# schema.graphql
# import UserOrderByInput, PostOrderByInput, CommentOrderByInput from './generated/prisma.graphql'
# (pulling from generated graphql schema so we don't have to rewrite enums)

type Query {
  users(query: String, first: Int, skip: Int, after: String, orderBy: UserOrderByInput): [User!]!  # add orderBy
  posts(query: String, first: Int, skip: Int, after: String, orderBy: PostOrderByInput): [Post!]!
  comments(first: Int, skip: Int, after: String, orderBy: CommentOrderByInput): [Comment!]!
  # ...
}
```

```js
// Query.js
const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }]
      }
    }

    return prisma.query.users(opArgs, info)
  },
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true
      },
      first: args.first,
      skip: args.skip,
      after: args.after,
      orderBy: args.orderBy
    }

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }]
    }

    return prisma.query.posts(opArgs, info)
  },
  // ...
};
```
Query:

```graphql
query {
  users(orderBy: name_ASC) {
    name
    email
  }
}
# createdAt_DESC / updatedAt_ASC / etc
```








































