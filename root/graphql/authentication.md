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
};
```


## Adding Prisma into GraphQL Subscriptions
Prisma actually already gives us some subscription methods. Prisma already knows when things are changing because Prisma is in charge of changing it anyway.
BUT we'll need to align typeDefs from client with Node typeDefs first so that data doesn't get lost and everything flows correctly.

```graphql
# schema.graphql
# ...

type PostSubscriptionPayload {
  mutation: MutationType!
  node: Post
}

type CommentSubscriptionPayload {
  mutation: MutationType!
  node: Comment
}

# make node non-nullable because delete makes it null
```

```js
const Subscription = {
  comment: {
    subscribe(parent, { postId }, { prisma }, info) {
      return prisma.subscription.comment({
        where: {
          // look through schema to find path
          node: {
            post: {
              id: postId
            }
          }
        }
      }, info)
    }
  },
  post: {
    subscribe(parent, args, { prisma }, info) {
      return prisma.subscription.post({
        where: {
          node: {
            published: true
          }
        }
      }, info)
    }
  }
};
```


## Closing Prisma to the Outside World
Everything we've done so far has helped us set up a node server to communicate between the client and database. But, one big problem is that the client can still go straight to the database and manipulate it directly. What we want is to restrict access to the database so that the client cannot mess around with the database unless it's through our set up node server.

To do this, we set up a 'prisma secret' (basically just a password).

```yml
endpoint: http://localhost:4466
datamodel: datamodel.graphql
secret: secret_text
```
cd prisma, then run prisma deploy to set the secret

```js
// prisma.js
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'secret_text'   // secret key for access
});
```
However, we still might want access to the database server (localhost:4466) for development purposes. We can do this via http headers. This would require a token that prisma provides. To generate a token, run in prisma folder: prisma token

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTkwNDQ0NTU3LCJleHAiOjE1OTEwNDkzNTd9.H8VRz564fzrJvK5tvLPCt012EN5-bW-Z7oybwnpTTH0"
}
```


## Allowing for Generated Schemas
Now that we've locked our database, npm run get-schema won't work. To fix this, let's tweak .graphqlconfig

```json
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "prisma": "prisma/prisma.yml", // add this line here
        "endpoints": {
          "default": "http://localhost:4466"
        }
      }
    }
  }
}
```


## Storing Passwords

Next, let's give our Users a password field, and then adjust our createUser mutation in relation to this.

```graphql
# in both datamodel.graphql and schema.graphql

type User {
  # ...
  password: String!
  # ...
}

# only in schema.graphql
input CreateUserInput {
  # ...
  password: String!
}
```

```cli
npm i bcryptjs
```

```js
// Mutation.js
// take in password -> validate password -> hash password -> generate auth token
import bcrypt from 'bcryptjs'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length) {
      // if length is less than 8, throw error
      throw new Error('Password must be 8 characters or longer')
    }

    const password = await bcrypt.hash(args.data.password, 10)
    // hash args: (password, salt)
    // a salt is a random series of characters that are hashed with the string we're hashing
    // this ensures that the hash is truly random

    const emailTaken = await prisma.exists.User({ email: args.data.email })

    if (emailTaken) {
      throw new Error('Email taken')
    }

    return await prisma.mutation.createUser({
      data: {
        ...args.data,
        password   // overwriting plaintext
      }
    }, info)
  },
  // ...
};
```


## Creating Auth Tokens with JSON Web Tokens
```cli
npm i jsonwebtoken
```

```js
import jwt from 'jsonwebtoken'  // import jsonwebtoken

const token = jwt.sign({ id: 46 }, 'mysecret')
// this is how we create a new token
// args: (payloadObj, secret)
// payloadObj: info for our specific purposes eg associate a particular user by id
// secret: used to verify the integrity of a token

const decoded = jwt.decode(token)
// this decodes the token that returns the payloadObj in plaintext, in this case { id: 46 }

// finally, we verify that this token was created from this server

const verified = jwt.verify(token, 'mysecret')
// this decodes AND verifies
// args: (token, secret)
// if token wasn't created with the same secret, verify is going to fail
// ensures that the client can't tamper with our token


// Mutation.js
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    if (args.data.password.length) {
      throw new Error('Password must be 8 characters or longer')
    }

    const password = await bcrypt.hash(args.data.password, 10)

    const emailTaken = await prisma.exists.User({ email: args.data.email })

    if (emailTaken) {
      throw new Error('Email taken')
    }

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password   // overwriting plaintext
      }
    }) // remove info, since we'll be returning a custom type

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'token_secret')
    }
  },
  // ...
};
```

```graphql
# schema.graphql
# ...
type Mutation {
  createUser(data: CreateUserInput!): AuthPayload!
  # ...
}

type AuthPayload {
  token: String!
  user: User!
}
```


## Logging in Existing Users

So we know how to hash a password and store it, but now we have to figure out how to compare the hashed password with the password given by a user when they log in.

```js
const dummy = async () => {
  const email = 'example@email.com'
  const password = 'red12345'

  const hashed = '$2a$10$pEY2VV1.oEYaeLxMq.ynheWbG5/1IjLHhZ4lVbYDH1/K50eZ10E9S'
  // this is a hashed version of 'red12345'

  const isMatch = await bcrypt.compare(password, hashed)
  console.log(isMatch)  // true
};
// we're not decrypting, we're simply comparing via bcrypt
```
Let's create our login mutation.

```graphql
# schema.graphql
type Mutation {
  login(data: LoginUserInput!): AuthPayload!
  # ...
}

input LoginUserInput {
  email: String!
  password: String!
}
```

```js
// Mutation.js
const Mutation = {
  async login(parent, args, { prisma }, info) {
    const user = await prisma.query.user({
      where: {
        email: args.data.email
      }
    })

    if (!user) {
      throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(args.data.password, user.password)

    if (!isMatch) {
     throw new Error('Unable to login')
    }

    return {
      user,
      token: jwt.sign({ userId: user.id }, 'token_secret')
    }
  },
  // ...
};
```


## Validating Auth Tokens

Currently, our mutations don't require any authentication when performing these actions. Let's fix that.

On GraphQL Playground, set http header:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2FvZjBjZnUwMDE3MDcxMzhkYzBheWs5IiwiaWF0IjoxNTkwNjEzNTgzfQ.CwRVOvh5mLcjb1aAnrDFG5XiS91dJGYzWFI_SoLPj38"
}
```
This is all we need to get the token from the client to the server.

```js
// index.js
const server = new GraphQLServer({
    // ...
    context(request) {   //turned into a function
      return {
        pubsub,
        prisma,
        request
      }
    }
})


// create src/utils/getUserId.js
import jwt from 'jsonwebtoken'

const getUserId = (request) => {
  const header = request.request.headers.authorization

  if (!header) {
    throw new Error('Authentication required')
  }

  const token = header.replace('Bearer ', '')
  const decoded = jwt.verify(token, 'token_secret')

  return decoded.userId
}

export { getUserId as default }


// Mutation.js
import getUserId from '../utils/getUserId'

const Mutation = {
  // ...
  async createPost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)      // utilize our new utility function

    return await prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: userId        // give userId to prisma
          }
        }
      }
    }, info)
  },
  // ...
};
```

```graphql
# schema.graphql
input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
  # author: ID!   remove this, we no longer need it
}
```
Do this for all other resolvers that require this.
Note: when deleting post, we should first check that the token belongs to the user who has the rights to delete the post.

```js
// Mutation.js
const Mutation = {
  // ...
  async deletePost(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)
    const postExists = await prisma.exists.Post({
      id: args.id,
      author: {
        id: userId
      }
    })

    if (!postExists) {
      throw new Error('Unable to delete post')
    }

    return await prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)
  },
  // ...
};
```























