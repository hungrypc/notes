# Schemas and Queries

## What is a Graph?
> A data structure that takes into account how information/data is related to one another

For example, let's imagine we are creating an application that stores 3 things:
1. Users
2. Posts
3. Comments

In GraphQL, these are known as **types** - things that we define when creating our GraphQL API.
On top of this, we also define fields associated with each type - *individual pieces of data we want to store*.

For a User, we might want to track:
- id
- name
- age

For a Post:
- id
- title
- content
- published

For a Comment:
- id
- text

This is pretty much how we would visualize data with other databases. GraphQL doesn't care what backend you're using, SQL or no SQL.

Between our types, we have a couple relationships.

For example, if a User creates a Post, that Post is associated with the User.
- A User can have many Posts through the *posts property*
- This means a Post also belongs to a User, so the Post is related to the User through the *author property*

There is also a relationship between Posts and Comments
- A Post can have many comments, associated through the *comments property*
- A Comment is associated with a Post through the *post property*

Same with Comments and Users
- A Comment is associated to a User through the *author property*
- A User can have many comments, associated through the *comments property*


## GraphQL Queries
```graphql
query {
  hello             # field
  courseInstructor  # field
}
```
returns

```json
{
  "data": {
    "hello": "Hello world!",
    "courseInstructor": "Andrew Mead"
  }
}
```

## Nested GraphQL Queries
[GraphQL Query Demo](https://graphql-demo.mead.io/)

```graphql
query {
  course    # field
  me {      # type (User)
    id      # field
    name    # field
  }
  posts {   # array of type (Post)
    title   # field
  }
}
```
returns

```json
{
  "course": "GraphQL",
  "me": {
    "id": "c60f44c7-8149-44ad",
    "name": "Phil Chan"
  },
  "posts": [
    {
      "title": "GraphQL 101"
    },
    {
      "title": "GraphQL 201"
    }
  ]
}
```

## Setting up Environment
```cli
npm init
npm i babel-cli babel-present-env
touch .babelrc
mkdir src
touch src/index.js
```
```js
// .babelrc
{
  "presets": [
    "env"
  ]
}

// package.json
{
  // ...
  "scripts": {
    "start": "babel-node src/index.js",
    // ...
  }
}
```

### ES6 Import/Export
```js
// module.js
const message = 'some message from module.js';
const location = 'toronto';
export { message, location as default };

// index.js
import myLocation, { message } from './module.js';

console.log(message);
console.log(myLocation);
```

## Creating a GraphQL API
```cli
npm i graphql-yoga
```

```js
// index.js
import { GraphQLServer } from 'graphql-yoga';

// Type definitions (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`;
// ! means we will always get that type back, no nulls allowed


// Resolvers
const resolvers = {
  Query: {
    id() {
      return 'abc123'
    },
    name() {
      return 'Phil'
    },
    age() {
      return 26
    },
    employed() {
      return false
    },
    gpa() {
      return null   // because we left out !, null is allowed
    }
  }
};
// structure of resolvers should mirror structure of typeDefs

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('server is up and running')
});
```
From here, run

```cli
npm run start
```
And visit localhost:4000 on your browser.

This should open a GraphQL playground where you can test queries to your new API.

Scalar Types:
- String
- Boolean
- Int
- Float
- ID

Let's set up our environment so that our server restarts itself whenever any changes are made.

```cli
npm i nodemon --save-dev
```
```json
// package.json
{
  "scripts": {
    "start": "nodemon src/index.js --exec babel-node",
  }
}
```

## Creating Custom Types
```js
const typeDefs = `
  type Query {
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

const resolvers = {
  Query: {
    me() {
      return {
        id: '123098',
        name: 'Phil',
        email: 'phil@email.com',
      }
    }
  }
};
```
Query:

```graphql
query {
  me {
    id
    name
    email
    age
  }
}
```
Returns:

```json
{
  "data": {
    "me": {
      "id": "123098",
      "name": "Phil",
      "email": "phil@email.com",
      "age": null
    }
  }
}
```

## Operation Arguments

```js
const typeDefs = `
  type Query {
    greeting(name: String): String!
    add(a: Float!, b: Float!): Float!
  }
`;

const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name) {
        return `Hello, ${args.name}!`;
      } else {
        return "Hello";
      }
    },
    add(parent, args, ctx, info) {
      return args.a + args.b;
    }
  }
};

```
Query:

```graphql
query {
  greeting(name: "Phil")
  add(a: 2.1, b: 2.9)
}
```
Returns:

```json
{
  "data": {
    "greeting": "Hello, Phil!",
    "add": 5
  }
}
```

## Working with Arrays
```js
// demo user data
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
    grades: [Int!]!
    sumArr(numbers: [Float!]!)
    users(query: String): [User!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

const resolvers = {
  Query: {
    grades(parent, args, ctx, info) {
      return [99, 80, 93];
    },
    sumArr(parent, args, ctx, info) {
      if (args.numbers.length === 0) {
        return 0;
      }

      return args.numbers.reduce((accum, currVal) => {
        return accum + currVal
      });
    },
    users(parent, args, ctx, info) {
      if (!args.query) return users;

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      });
    }
  }
};

```
Query:

```graphql
query {
  grades
  sumArr(numbers: [1, 2, 3])
  users {
    id
    name
  }
  # or
  users(query: "i") {
    name
  }
}
```
Returns:

```js
{
  "data": {
    "grades": [
      99,
      80,
      93
    ],
    "sumArr": 6,
    "users": [
      {
        "id": "1",
        "name": "Phil"
      },
      {
        "id": "2",
        "name": "Xi"
      },
      {
        "id": "3",
        "name": "John"
      }
    ],
    // or
    "users": [
      {
        "name": "Phil"
      },
      {
        "name": "Xi"
      }
    ]
  }
}
```

## Relational Data
```js
// demo user data
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

const posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
  },
  {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is advanced GraphQL...',
    published: false
    author: '1'
  },
  {
    id: '12',
    title: 'BioChem 400',
    body: 'Bio shit, bitch...',
    published: false,
    author: '2'
  },
];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
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
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
      });
    }
  },
  // setting up relationship b/t users and posts
  Post: {
    author(parent, args, ctx, info) {
      // calling this method is going to run for every post
      // the post will be contained in the 'parent' argument
      return users.find((user) => {
        return user.id === parent.author
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    }
  }
};

```
Query:

```graphql
query {
  posts {
    id
    title
    body
    published
    author {
      name
    }
  }
  users: {
    name
    posts {
      id
      title
    }
  }
}
```
Returns:

```js
{
  "data": {
    "posts": [
      {
        "id": "10",
        "title": "GraphQL 101",
        "body": "This is how to use GraphQL",
        "published": true,
        "author": {
          "name": "Phil"
        }
      },
      {
        "id": "11",
        "title": 'GraphQL 201',
        "body": 'This is advanced GraphQL...',
        "published": false,
        "author": {
          "name": "Phil"
        }
      },
      {
        "id": "12",
        "title": "BioChem 400",
        "body": 'Bio shit, bitch...',
        "published": false,
        "author": {
          "name": "Xi"
        }
      }
    ],
    "users": [
      {
        "name": "Phil",
        "posts": [
          {
            "id": "10",
            "title": "GraphQL 101"
          },
          {
            "id": "11",
            "title": "GraphQL 201"
          }
        ]
      },
      {
        "name": "Xi",
        "posts": [
          {
            "id": "12",
            "title": "BioChem 400"
          }
        ]
      },
      {
        "name": "John",
        "posts": []
      }
    ]
  }
}
```

## Comments Challenge
Using what we've learned to set up Comments

```js
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

const posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use GraphQL...',
    published: true,
    author: '1'
  },
  {
    id: '11',
    title: 'GraphQL 201',
    body: 'This is advanced GraphQL...',
    published: false
    author: '1'
  },
  {
    id: '12',
    title: 'BioChem 400',
    body: 'Bio shit, bitch...',
    published: false,
    author: '2'
  },
];

const comments = [
  {
    id: '51',
    text: 'oh fuck, ok',
    author: '1',
    post: '12'
  },
  {
    id: '52',
    text: 'lol',
    author: '3',
    post: '10'
  },
  {
    id: '53',
    text: 'why tho',
    author: '2',
    post: '11'
  },
  {
    id: '54',
    text: '💩',
    author: '1',
    post: '11'
  }
];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
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

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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
    posts(parent, args, ctx, info) {
      if (!args.query) return posts;
      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase());
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    comments(parent, args, ctx, info) {
      return comments
    }
  },
  // setting up relationship b/t users and posts
  Post: {
    author(parent, args, ctx, info) {
      // calling this method is going to run for every post
      // the post will be contained in the 'parent' argument
      return users.find((user) => {
        return user.id === parent.author
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.post === parent.id
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter((post) => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
      return comments.filter((comment) => {
        return comment.author === parent.id
      })
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author
      });
    },
    post(parent, args, ctx, info) {
      return posts.find((post) => {
        return post.id === parent.post
      });
    }
  }
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
  posts {
    id
    title
    comments {
      id
      text
    }
  }
  users: {
    name
    comments {
      id
      text
    }
  }
  comments: {
    id
    text
    author {
      name
    }
  }
}
```









































