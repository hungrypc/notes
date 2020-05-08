## Schemas and Queries

### What is a Graph?
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


### GraphQL Queries
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

### Nested GraphQL Queries
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

### Setting up Environment
```cli
npm init
npm i babel-cli babel-present-env
touch .babelrc
mkdir src
touch src/index.js
```
```json
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






































