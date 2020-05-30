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
      first: args.first,
      skip: args.skip
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
}

```








































