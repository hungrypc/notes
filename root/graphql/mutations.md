# Mutations

## Creating Data with Mutations
```cli
npm i uuid
npm start
```

```js
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

const users = [];
const posts = [];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
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
    },
    createPost(parent, args, ctx, info) {
      // check if user exists
      const userExists = users.some((user) => return user.id === args.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author
      }

      posts.push(post)

      return post;
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
mutation {
  createUser(name: "Andrew", email: "andrew@email.com") {
    id
    name
    email
    age
  }
  # OR
  createPost(
    title: "My new post",
    body: "",
    published: false,
    author: "432jiu-412lk"
  ) {
    id
    title
    body
    published
    author {
      name
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
    },
    // OR
    "createPost": {
      "id": "09fs9asf-3hkdf9",
      "title": "My new post",
      "body": "",
      "published": false,
      "author": {
        "name": "Andrew"
      }
    }
  }
}
```

## The Object Spread Operator

```cli
npm i babel-plugin-transform-object-rest-spread
```

```js
// .babelrc
{
  "presets": [
    "env"
  ],
  "plugins": [
    "transform-object-rest-spread"
  ]
}
```

```js
const resolvers = {
  //  ...
  Mutation: {
    createUser(parent, args, ctx, info) {
      // ...

      // instead of:
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.email
      }

      // we can do this:
      const user = {
        id: uuidv4(),
        ...args
      }

      // ...
    },
    // ...
  },
};
```



































