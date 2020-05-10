# Mutations

## Creating Data with Mutations
```cli
npm i uuid
npm start
```

```js
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

const users = [
  {
    id: '1',
    name: 'Phil',
    email: 'phil@email.com',
    age: 26
  },
  {
    id: '2',
    name: 'Xi',
    email: 'xi@email.com',
    age: 25
  },
  {
    id: '3',
    name: 'John',
    email: 'john@email.com'
  }
];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }
`;

const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if (!args.query) return users;

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      });
    },
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      // returns true if some of the users have the same email
      const emailTaken = users.some((user) => return user.email === args.email);

      if (emailTaken) {
        throw new Error('Email taken.');
      }

      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.email
      }

      users.push(user)

      return user;
    }
  },
};

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {
    console.log('The server is up!')
});
```
Query:

```graphql
query {
  mutation {
    createUser(name: "Andrew", email: "andrew@email.com") {
      id
      name
      email
      age
    }
  }
}
```
Returns:

```js
{
  "data": {
    "createUser": {
      "id": "432jiu-412lk",
      "name": "Andrew",
      "email": "andrew@email.com",
      "age": null
    }
  }
}
```










