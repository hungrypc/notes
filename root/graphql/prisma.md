# Database Storate with Prisma

## What is Prisma?
How do we connect our backend (in this case, node.js) with our database? We need a tool to facilitate that communication. So when a mutation is sent to the server, the server needs to write to the database. When someone sends a query asking for data, the server needs to read from the database. So how do we get that done?

The first option is to use a native driver. All popular databases have native drivers for node.js. However, are very barebones implementations. We can perform all the queries necessary to read and write data, but we don't get any nice-to-have features (data validations, migrations, mapping models to set up associations between our data, etc).

Another option is to use an ORM (Object Relational Mapping) such as Sequelize or Mogoose. Here, we start to get those nice-to-have features, and is typically what tends to be used.

Prisma is an ORM. But it also comes with more features that make it a stand out choice. For example, it is database agnostic, meaning it supports every major database out there. That means, we can easily pick the database we want or switch between databases without changing too much code. All of this works because Prisma wraps our database up and exposes it as a GraphQL api.

Because we're using GraphQL between the client and the server AND between the server and the database, the server itself becomes a whole lot less important - there's not as much we need to actually do there, which reduces the amount of code and reduces the complexity of the code.


## Prisma Setup
Install a GUI and Docker, create a postgresql database on Heroku.

```cli
npm i -g prisma

prisma init project_name
<!-- from here, configure database info -->
```


## Exploring the Prisma GraphQL API
```graphql
mutation {
  createUser(
    data: {
      name: "Phil Chan"
    }
  ){
    id
    name
  }
}
```
This is actually being stored into our database. In this lecture, it's shown that we can basically do everything we learned in previous lectures, the main difference being we're manipulating/accessing our real database that we set up. One thing to note is updateUser:

```graphql
mutation {
  updateUser(
    where: {
      id: "32kj4h3k24234jh"
    },
    data: {
      name: "Someone Else"
    }
  ){
    id
    name
  }
}
```
updateUser now takes a "where" object that contains id, which is how prisma locates the user we're trying to update. deleteUser also works this way.


## Adding a Post type to Prisma
```graphql
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  posts: [Post!]!
}

type Post {
  id: ID! @id
  title: String!
  body: String!
  published: Boolean!
  author: User!
}
```
Because we've set up a relationship between Posts and Users, Prisma automatically sets up a relation table between these.

```graphql
mutation {
  createPost(
    data: {
      title: "Prisma post",
      body: "",
      published: false,
      author: {
        connect: {   # this is where we tell prisma who we're connecting the post to
          id: "ckah9y9z700100713hvk8z3mn"
        }
      }
    }
  ){
    id
    title
    body
    published
    author {
      id
      name
    }
  }
}
```


## Adding a Comment type to Prisma
```graphql
# ...

type Comment {
  id: ID! @id
  text: String!
  post: Post!
  author: User!
}
```

```graphql
mutation {
  createComment(
    data: {
      text: "A comment from prisma graphql",
      author: {
        connect: {
          id: "ckah9y9z700100713hvk8z3mn"
        }
      },
      post: {
        connect: {
          id: "ckahbaoum0045071340cgvbxr"
        }
      }
    }
  ){
    id
    text
    post {
      title
    }
    author {
      name
    }
  }
}
```


## Integrating Prisma into a Node.js Project
Changes will be made here:
[graphql-prisma](https://github.com/hungrypc/notes/tree/master/root/graphql/graphql-prisma)

Will update this readme with important notes along the way.

```cli
npm i prisma-binding graphql-cli
```

```js
// create src/prisma.js
import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'localhost:4466',
})

// create .graphqlconfig
{
  "projects": {
    "prisma": {
      "schemaPath": "src/generated/prisma.graphql",
      "extensions": {
        "endpoints": {
          "default": "http://localhost:4466"
        }
      }
    }
  }
}

// in package.json, add script:
{
  // ...
  "get-schema": "graphql get-schema -p prisma"
}
```
Run 'npm run get-schema' and a file will be auto-generated in src/generated.

Any changes made to the datamodel.graphql needs to be deployed to prisma via this command: prisma deploy


## Using Prisma Bindings
The main prisma methods we'll be using are:

- prisma.query
- prisma.mutation
- prisma.subscription
- prisma.exists

### prisma.query
```js
// prisma.js
import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
})

prisma.query.users(null, '{ id name email }').then((data) => {
  console.log(data)
})
/*
There is one method for every query that the api supports where the method name matches with the query name (eg users).
All our prisma methods take two arguments:
- operation     (eg null)
- selection set (eg '{ id name email }')

What comes back is a promise, which is why we use .then().
*/

// a few more examples of querying
prisma.query.users(null, '{ id name email posts { id title } }').then((data) => {
  console.log(JSON.stringify(data, undefined, 2))
})

prisma.query.comments(null, '{ id text author { id name } }').then((data) => {
  console.log(JSON.stringify(data, undefined, 2))
});
```

### prisma.mutation
```js
prisma.mutation.createPost({
  // here is where we provide operation arguments
  data: {
    title: "My new GraphQL post is live",
    body: "You can find the new course here",
    published: true,
    author: {
      connect: {
        id: "ckah9y9z700100713hvk8z3mn"
      }
    }
  }
}, '{ id title body published }').then((data) => {
  console.log(data)
  // we can also chain methods
  return prisma.query.users(null, '{ id name email posts { id title } }')
  // because we return this, we can chain another .then()
}).then((data) => {
  console.log(JSON.stringify(data, undefined, 2))
});

prisma.mutation.updatePost({
  where: {
    id: "ckak4gzqy00300713bcjhbih0",
  },
  data: {
    title: "Updated Post",
    body: "updated via prisma mutation",
  }
}, '{ id title body published }').then((data) => {
  console.log(data)
  return prisma.query.users(null, '{ id name posts { id title } }')
}).then((data) => {
  console.log(JSON.stringify(data, undefined, 2))
});

```

### Using Async/Await with Prisma Bindings
```js
const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id }')

  const user = await prisma.query.user({
    where: {
      id: authorId
    }
  }, '{ id name email posts { id title published } }')

  return user
}

createPostForUser("ckah9y9z700100713hvk8z3mn", {
  title: "async await post",
  body: "created post with async await",
  published: true
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2))
})

// note: this didnt work at first, need to set up plugin "babel-plugin-transform-object-rest-spread" in .babelrc

const updatePostForUser = async (postId, data) => {
  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data
  }, '{ author { id } }')

  const user = await prisma.query.user({
    where: {
      id: post.author.id
    }
  }, '{ id name email posts { id title body } }')

  return user
}

updatePostForUser("ckak5m2sc003j0713jslueq8s", {
  title: "updated async post",
  body: "this post was updated with async await"
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2))
});
```

### Checking If Data Exists Using Prisma Bindings
```js
prisma.exists.Comment({
  // properties that we want to verify for the comment we're looking for
  id: "ckahbm9b000960713qew7ptqt",
  // we can get complex, looking into associations
  author: {
    id: "ckah9y9z700100713hvk8z3mn"
  }
}).then((exists) => {
  console.log(exists)
})

// we can utilize this as follows:

const createPostForUser = async (authorId, data) => {
  // so we want to check first if user exists
  const userExists = await prisma.exists.User({ id: authorId })

  if (!userExists) {
    throw new Error('User not found')
  }

  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ author { id name email posts { id title published } } }')
  // now that we have userExists, const user is redundant
  // we now have post returning the same data user did

  return post.author
}

createPostForUser("ckah9y9z700100713hvk8z3mn", {
  title: "userExists implemented",
  body: "checking and checking",
  published: true
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
  // now that we have an error in place, we can catch if anything goes wrong
  console.log(error.message)
})

// lets improve our updatePostForUser

const updatePostForUser = async (postId, data) => {
  const postExists = await prisma.exists.Post({ id: postId })

  if (!postExists) {
    throw new Error('Post not found')
  }

  const post = await prisma.mutation.updatePost({
    where: {
      id: postId
    },
    data
  }, '{ author { id name email posts { id title body } } }')

  return post.author
}

updatePostForUser("ckali6i78000c0813tdd3457b", {
  title: "updated and userExists",
  body: "new n improved"
}).then((user) => {
  console.log(JSON.stringify(user, undefined, 2))
}).catch((error) => {
  console.log(error.message)
});
```


## Customizing Type Relationships
If we try to delete a user with posts and comments right now would not work. This would violate the required relation between the types. We can set up some onDelete behaviour to solve this.

We have two options: SET_NULL (default) or CASCADE

```graphql
type User {
  id: ID! @id
  name: String!
  email: String! @unique
  posts: [Post!]! @relation(name: "PostToUser", onDelete: CASCADE)
  comments: [Comment!]! @relation(name: "CommentToUser", onDelete: CASCADE)
}

type Post {
  id: ID! @id
  title: String!
  body: String!
  published: Boolean!
  author: User! @relation(name: "PostToUser", onDelete: SET_NULL)
  comments: [Comment!]! @relation(name: "CommentToPost", onDelete: CASCADE)
}

type Comment {
  id: ID! @id
  text: String!
  post: Post! @relation(name: "CommentToPost", onDelete: SET_NULL)
  author: User! @relation(name: "CommentToUser", onDelete: SET_NULL)
}

# prisma deploy
```


## Modeling a Review System with Prisma: Set Up
Deploying another project.
New model found here:
[graphql-prisma](https://github.com/hungrypc/notes/tree/master/root/graphql/graphql-prisma/prisma-review)
