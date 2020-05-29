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


## Locking Down Queries 1

The database is still entirely readable, we need to make it so that SOME data is still accessible to the public (like published posts), but drafts should only be viewed by the author.

```js
// Query.js
import getUserId from '../utils/getUserId'

const Query = {
  // ...
  async me(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    return prisma.query.user({
      where: {
        id: userId
      }
    })
  },
  post(parent, args, { prisma }, info) {
    const userId = getUserId(request, false)

    // we'll be using posts (plural) so we can set up our conditional logic

    const posts = await prisma.query.posts({
      where: {
        id: args.id,
        OR: [{
          published: true
        }, {
          author: {
            id: userId
          }
        }]
      }
    }, info)

    if (posts.length === 0) {
      throw new Error('Post not found')
    }

    return posts[0]
  }
}


// getUserId.js
const getUserId = (request, requireAuth = true) => {  // add requireAuth arg
  const header = request.request.headers.authorization

  // we're restructuring this because there will be cases where getUserId will require authorization, and cases where it wont
  if (header) {
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, 'token_secret')
    return decoded.userId
  }

  // so this would be if authentication IS required
  if (requireAuth) {
    throw new Error('Authentication required')
  }

  // so if you aren't authenticated, we'll return null
  return null
};
```
So now, any user should be able to see published posts but are unable to see unpublished posts. Only users who are authenticated as the author can see their unpublished posts.



## Locking Down Queries 2

Now, lets make the posts (plural) query only send back published posts. Let's also make a myPosts query so users can get back all of their posts, published or unpublished.

```js
// Query.js
import getUserId from '../utils/getUserId'

const Query = {
  // ...
  posts(parent, args, { prisma }, info) {
    const opArgs = {
      where: {
        published: true
      }
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
  myPosts(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    const opArgs = {
      where: {
        author: {
          id: userId
        }
      }
    }

    if (args.query) {
      opArgs.where.OR = [{
        title_contains: args.query
      }, {
        body_contains: args.query
      }]
    }

    return prisma.query.posts(opArgs, info)
  }
  // ...
};
```

```graphql
type Query {
  # ...
  myPosts(query: String): [Post!]!
  # ...
}
```


## Locking Down Individual Types

There's still one more way for users to get unpublished posts of other users, and that's through selection sets (query users and get back their posts). We should lock that down. We should also lock down getting the email of others.

```graphql
type User {
  # ...
  email: String   # make this nullable
  # ...
}
```

```js
// User.js
import getUserId from '../utils/getUserId'

const User = {
  // in here, we can determine whether or not we should send the email back
  email(parent, args, { request }, info) {
    // in this case, parent is the user object
    const userId = getUserId(request, false)
    // we don't require auth here, if you're not authed youll just get null

    if (userId && userId === parent.id) {
      return parent.email
    } else {
      return null
    }
  }
}

export { User as default }
```


## Fragments

A common complaint complaint is that we are constantly listing the same scalar field that we want back. With Fragments, we no longer have to do that.

> A Fragment allows us to create a reusable selection set so that we can define what we want once, and we can use that anywhere where we want those things

```graphql
# in playground
query {
  users {
    ...userFields
  }
}

#        (name)        (type)
fragment userFields on User {
  id
  name
  email
}
```
You could even use a combo of an explicit field + fragment.

```js
// User.js
import getUserId from '../utils/getUserId'

const User = {
  email: {
    fragment: 'fragment userId on User { id }',
    resolve(parent, args, { request }, info) {
      const userId = getUserId(request, false)

      if (userId && userId === parent.id) {
        return parent.email
      } else {
        return null
      }
    }
  }
}

export { User as default }

// restructuring

// resolvers/index.js
import { extractFragmentReplacements } from 'prisma-binding'

import Query from './Query'
import Mutation from './Mutation'
import Subscription from './Subscription'
import User from './User'
import Post from './Post'
import Comment from './Comment'

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Post,
  Comment
}

const fragmentReplacements = extractFragmentReplacements(resolvers)
// takes resolvers, and extracts fragments we set up

export { resolvers, fragmentReplacements }


// index.js
import { GraphQLServer, PubSub } from 'graphql-yoga'
import { resolvers, fragmentReplacements } from './resolvers/index'
import prisma from './prisma'

const pubsub = new PubSub()

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context(request) {
    return {
      pubsub,
      prisma,
      request
    }
  },
  fragmentReplacements
})

server.start(() => {
  console.log('The server is up!')
})


// prisma.js
import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
  secret: 'secret_text',
  fragmentReplacements
})

export { prisma as default }
```


## Cleaning up Some Edge Cases

```js
// make it so comments can only be made on published posts AND delete all comments on a post if its about to be unpublished
// Mutation.js
const Mutation = {
  // ...
  async createComment(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)

      const postExists = await prisma.exists.Post({
        id: args.data.post,
        published: true
      })

      if (!postExists) {
        throw new Error('Unable to find post')
      }

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
              id: userId
            }
          }
        }
      }, info)
    },
    async updatePost(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)
      const postExists = await prisma.exists.Post({
        id: args.id,
        author: {
          id: userId
        }
      })

      const isPublished = await prisma.exists.Post({
        id: args.id,
        published: true
      })

      if (!postExists) {
        throw new Error('Unable to update post')
      }

      if (isPublished && args.data.published === false) {
        await prisma.mutation.deleteManyComments({
          where: {
            post: {
              id: args.id
            }
          }
        })
      }

      return await prisma.mutation.updatePost({
        where: {
          id: args.id
        },
        data: args.data
      }, info)
    },
  // ...
};
```


## Locking Down Subscriptions

Let's create a subscription which requires authentication. This will allow a logged in user to subscribe to just their posts.

```js
// Subscription.js
import getUserId from '../utils/getUserId'

const Subscription = {
  // ...
  myPost: {
    subscribe(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)

      return prisma.subscription.post({
        where: {
          node: {
            author: {
              id: userId
            }
          }
        }
      }, info)
    }
  }
}

// however, with subs, auth headers dont work the same way

// getUserId.js
const getUserId = (request, requireAuth = true) => {
  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization
  // fix here

  if (header) {
    const token = header.replace('Bearer ', '')
    const decoded = jwt.verify(token, 'token_secret')
    return decoded.userId
  }

  if (requireAuth) {
    throw new Error('Authentication required')
  }

  return null
};
```

```graphql
# schema.graphql
type Subscription {
  comment(postId: ID!): CommentSubscriptionPayload!
  post: PostSubscriptionPayload!
  myPost: PostSubscriptionPayload!
}
```


## Token Expiration

We can specify how long a token is valid.

```js
// create utils/generateToken.js
import jwt from 'jsonwebtoken'

function generateToken(userId) {
  return jwt.sign({ userId }, 'token_secret', { expiresIn: '7 days' })
}

export { generateToken as default }


// Mutation.js
import generateToken from '../utils/generateToken'

const Mutation = {
  async login(parent, args, { prisma }, info) {
    // ...
    return {
      user,
      token: jwt.sign({ userId: user.id }, 'token_secret', { expiresIn: '7 days'})
    }
  },
  async createUser(parent, args, { prisma }, info) {
    // ...
    return {
      user,
      token: generateToken(user.id)
    }
  },
};
```


## Update Password

```graphql
input UpdateUserInput {
  name: String
  email: String
  password: String  # update
}
```

```js
// create utils/hashPassword.js
import bcrypt from 'bcryptjs'

function hashPassword(password) {
  if (password.length < 8) {
    throw new Error('Password must be 8 characters or longer')
  }
  return bcrypt.hash(password, 10)
}

export { hashPassword as default }


// Mutation.js
const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email })
    if (emailTaken) {
      throw new Error('Email taken')
    }

    const password = await hashPassword(args.data.password)

    const user = await prisma.mutation.createUser({
      data: {
        ...args.data,
        password
      }
    })

    return {
      user,
      token: generateToken(user.id)
    }
  },
  async updateUser(parent, args, { prisma, request }, info) {
    const userId = getUserId(request)

    if (typeof args.data.password === 'string') {
      args.data.password = await hashPassword(args.data.password)
    }

    return await prisma.mutation.updateUser({
      where: {
        id: userId
      },
      data: args.data
    }, info)
  },
}
```


































