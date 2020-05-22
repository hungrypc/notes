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

































