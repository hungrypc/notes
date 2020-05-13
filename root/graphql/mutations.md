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
const comments = [];

const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    createComment(text: String!, author: ID!, post: ID!): Comment!
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
    // ...
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      // returns true if some of the users have the same email
      const emailTaken = users.some((user) =>  user.email === args.email);

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
      const userExists = users.some((user) => user.id === args.author);

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
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.author);
      const postExists = posts.some((post) => post.id === args.post && post.published);

      if (!userExists) {
        throw new Error('User not found');
      }

      if(!postExists) {
        throw new Error('Post not found');
      }

      const comment = {
        id: uuidv4(),
        ...args
      }
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


## The Input Type

```js
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';

const users = [];
const posts = [];
const comments = [];

const typeDefs = `
  type Query {
    ...
  }

  type Mutation {
    createUser(data: CreateUserInput!): User!
    createPost(data: CreatePostInput!): Post!
    createComment(data: CreateCommentInput!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  ...
`;

const resolvers = {
  Query: {
    // ...
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailTaken = users.some((user) =>  user.email === args.data.email);

      if (emailTaken) {
        throw new Error('Email taken.');
      }

      const user = {
        id: uuidv4(),
        ...args.data
      }

      users.push(user)

      return user;
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);

      if (!userExists) {
        throw new Error('User not found');
      }

      const post = {
        id: uuidv4(),
        ...args.data
      }

      posts.push(post)

      return post;
    },
    createComment(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author);
      const postExists = posts.some((post) => post.id === args.data.post && post.published);

      if (!userExists) {
        throw new Error('User not found');
      }

      if(!postExists) {
        throw new Error('Post not found');
      }

      const comment = {
        id: uuidv4(),
        ...args.data
      }
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
  createUser(
    data: {
      name: "Jess",
      email: "jess@email.com",
      age: 39
    }
  ) {
    id
    name
    email
    age
  }
}
```


## Deleting Data with Mutations

When deleting data, it's important to be mindful of not just the data you're trying to delete but also all other associated data.

```js
const typeDefs = `
  type Query {
    ...
  }

  type Mutation {
    ...
    deleteUser(id: ID!): User!
    deletePost(id: ID!): Post!
    deleteComment(id: ID!): Comment!
  }

  ...input
  ...type
`;

const resolvers = {
  Query: {
    // ...
  },
  Mutation: {
    createUser(parent, args, ctx, info) {
      ...
    },
    deleteUser(parent, args, ctx, info) {
      const userIndex = users.findIndex((user) => user.id === args.id)

      if(userIndex === -1) {
        throw new Error('User not found')
      }

      const deletedUsers = users.splice(userIndex, 1);

      // delete posts by author
      posts = posts.filter((post) => {
        const match = post.author === args.id

        // delete comments on posts by author
        if (match) {
          comments = comments.filter((comment) => comment.post !== post.id)
        }

        return !match
      })

      // delete comments by author
      comments = comments.filter((comment) => comment.author !== args.id)

      return deletedUsers[0];
    },
    createPost(parent, args, ctx, info) {
      ...
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id)

      if (postIndex === -1) {
        throw new Error('Post not found')
      }

      const deletedPosts = posts.splice(postIndex, 1)

      comments = comments.filter((comment) => comment.post !== args.id)

      return deletedPosts[0];
    },
    createComment(parent, args, ctx, info) {
      ...
    },
    deleteComment(parent, args, ctx, info) {
      const commentIndex = comments.findIndex((comment) => comment.id === args.id)

      if (commentIndex === -1) {
        throw new Error('Comment not found')
      }

      const deletedComments = comments.splice(commentIndex, 1)

      return deletedComments[0];
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


## A Pro GraphQL Project Structure

- src
  - index.js
  - schema.graphql // move typeDefs here
  - db.js // move static db here
    - resolvers
      - Queries.js // move Query resolver here
      - Mutation.js // move Mutations resolver here
      - Post.js // Post resolver
      - User.js // User resolver
      - Comment.js // Comment resolver

```js
// index.js
import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4';
import db from './db';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation'
import Post from './resolvers/Post'
import User from './resolvers/User'
import Post from './resolvers/Comment'

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Post,
    Comment
  },
  context: {
    db
  }
});

server.start(() => {
  console.log('The server is up!')
});


// Query.js
const Query = {
  // ...
  // here, we replace all ctx with { db } and change all references to
  // our previous static db variables to:
  // db.users, db.posts, db.comments
  // for example:
  users(parent, args, { db }, info) {
    if (!args.query) return db.users;
    // ...
  }
};
export { Query as default }
// do the same for all other resolvers


// db.js
const users = [];
const posts = [];
const comments = [];

const db = {
  users,
  posts,
  comments
};

export { db as default };
```

```js
// package.json
{
  "scripts": {
    "start": "nodemon src/index.js --ext js,graphql --exec babel-node",
  }
}
```


## Updating Data with Mutations

```graphql
# schema.graphql
type Mutation {
  # ...
  updateUser(id: ID!, data: UpdateUserInput!): User!
  updatePost(id: ID!, data: UpdatePostInput!): Post!
  updateComment(id: ID!, data: UpdateCommentInput!): Comment!
}

input UpdateUserInput {
  name: String
  email: String
  age: Int
}

input UpdatePostInput {
  title: String
  body: String
  published: Boolean
}

input UpdateCommentInput {
  text: String
}
```

```js
// Mutation.js
const Mutation = {
  // ...
  updateUser(parent, args, { db }, info) {
    const { id, data } = args;
    // locate user to update
    const user = db.users.find((user) => user.id === id)

    if (!user) {
      throw new Error('User not found')
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some((user) => user.email === data.email)

      // check if email is already in use
      if (emailTaken) {
        throw new Error('Email in use')
      }

      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name
    }

    if (typeof data.age !== undefined){
      user.age = data.age
    }

    return user;
  },
  updatePost(parent, args, { db }, info) {
    const { id, data } = args;
    const post = db.posts.find((post) => post.id === id);

    if (!post) {
      throw new Error('Post not found')
    }

    if (typeof data.title === 'string') {
      post.title = data.title
    }

    if (typeof data.body === 'string') {
      post.body = data.body
    }

    if (typeof data.published === 'boolean') {
      post.published = data.published
    }

    return post;
  },
  updateComment(parent, args, { db }, info) {
    const { id, data } = args;
    const comment = db.comments.find((comment) => comment.id === id);

    if (!comment) {
      throw new Error('Comment not found')
    }

    if (typeof data.text === 'string') {
      comment.text = data.text
    }

    return comment;
  }
}
```

















