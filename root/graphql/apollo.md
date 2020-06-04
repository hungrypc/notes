# Apollo Client and Testing GraphQL

## Setting up a Test Environment

In the config folder, create test.env

```env
<!-- test.env -->
PRISMA_ENDPOINT=http://localhost:4466/default/test
PRISMA_SECRET=secret_key
JWT_SECRET=jwt_secret
```

```cli
cd prisma
prisma deploy -e ../config/test.env
```


## Getting Started with Jest

```cli
npm i jest --save-dev
```

```js
// package.json
"scripts": {
  // ...
  "test": "jest --watch",
  // ...
};

// Create a folder tests, our test files will live here.

// create user.test.js
test('dummy test', () => {

});

// npm run test
```


## Testing and Assertions
Let's explore how testing works with some examples.

```js
const getFirstName = (fullName) => {
  return fullName.split(' ')[0]
}

// test
test('Should return first name when given full name', () => {
  const firstName = getFirstName('Phil Chan')

  expect(firstName).toBe('Phil')
  // this is how we tell jest what we expect as a result
  // jest has a lot of different assertions, check their documentation
})

// we want to write multiple test cases to really make sure our app is working
test('Should return first name when given first name', () => {
  const firstName = getFirstName('John')

  expect(firstName).toBe('John')
})


const isValidPassword = (password) => {
  return password.length >= 8 && !password.toLowerCase().includes('password')
}

test('Should return reject password shorter than 8 characters', () => {
  const isValid = isValidPassword('abc')

  expect(isValid).toBe(false)
})

test('Should reject password that contains word password', () => {
  const isValid = isValidPassword('abcPassword098')

  expect(isValid).toBe(false)
})

test('Should correctly validate a valid password', () => {
  const isValid = isValidPassword('43hjd9jd82')

  expect(isValid).toBe(true)
});
```


## Apollo Client in the Browser

File structure for my project isn't in sync with lecture so I will document what I learn here for this part, rather than in the project.

Create folder apollo-client, in it create src folder, and create an index.html & index.js.

```html
<body>
  <div id="users"></div>
  <script src="./index.js" type="text/javascript"></script>
</body>
```

```js
// in apollo-client
// npm init
// npm i parcel-bundler --save-dev

// package.json
{
  "scripts": {
    "start": "parcel src/index.html"
  }
}

// npm i apollo-boost graphql

// index.js
import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

// this will be parsed
const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`

client.query({
  // this takes in an abstract syntax tree
  query: getUsers
}).then((response) => {
  let html = ''

  response.data.users.forEach((user) => {
    html += `
      <div>
        <h3>${user.name}</h3>
      </div>
    `
  })

  document.getElementById('users').innerHTML = html
});

// npm run start
// this starts a web server
```

### Challenge

```html
<body>
  <div id="users"></div>
  <div id="posts"></div>
  <script src="./index.js" type="text/javascript"></script>
</body>
```

```js
// index.js
import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

const getUsers = gql`
  query {
    users {
      id
      name
    }
  }
`

client.query({
  query: getUsers
}).then((response) => {
  let html = ''

  response.data.users.forEach((user) => {
    html += `
      <div>
        <h3>${user.name}</h3>
      </div>
    `
  })

  document.getElementById('users').innerHTML = html
});

const getPosts = gql`
  query {
    posts {
      title
      author {
        name
      }
    }
  }
`

client.query({
  query: getPosts
}).then((response) => {
  let html = ''

  response.data.posts.forEach((post) => {
    html += `
      <div>
        <h4>${post.title}</h4>
        <p>${post.author.name}</p>
      </div>
    `
  })

  document.getElementById('posts').innerHTML = html
});
```


## Configuring Jest to Start the GraphQL Server
Back to our graphql-prisma folder.

```js
// create a folder in test: /jest
// create two files: globalSetup.js + globalTeardown.js
// then, in the src folder, create server.js

// server.js
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

export { server as default }


// index.js
import '@babel/polyfill/noConflict'
import server from './server'

server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('The server is up!')
})


// npm i babel-register


// globalSetup.js
require('babel-register')
require('@babel/polyfill/noConflict')
const server = require('../../src/server').default

module.exports = async () => {
  global.httpServer = await server.start({ port: 4000 })
}

// globalTeardown.js
module.exports = async () => {
  await global.httpServer.close()
}


// package.json
"scripts": {
  // ...
  "test": "env-cmd ./config/test.env jest --watch",
  // "...
},
"jest": {
  "globalSetup": "./tests/jest/globalSetup.js",
  "globalTeardown": "./tests/jest/globalTeardown.js"
};

// npm run test
```


## Testing Mutations

```js
// npm i apollo-boost@0.1.14 graphql@14.0.2 cross-fetch@2.2.2

// user.test.js
import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import prisma from '../src/prisma'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Phil",
          email: "phil@example.com",
          password: "mypass123"
        }
      ) {
        token,
        user {
          id
        }
      }
    }
  `

  const response = await client.mutate({
    mutation: createUser
  })

  const exists = await prisma.exists.User({ id: response.data.createUser.user.id })

  expect(exists).toBe(true)
});
```


## Seeding the Test Database with Test Data

```js
// user.test.js
import 'cross-fetch/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'
import bcrypt from 'bcryptjs'
import prisma from '../src/prisma'

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})


beforeEach(async () => {      // wipe the database before doing anything
  await prisma.mutation.deleteManyUsers()
  // BUT if we want to test features like login, we DO need data SO...
  await prisma.mutation.createUser({
    data: {
      name: 'Jen',
      email: 'jen@example.com',
      password: bcrypt.hashSync('red12345')
    }
  })
  // we now have one user we can use to test other features
})

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Phil",
          email: "phil@example.com",
          password: "mypass123"
        }
      ) {
        token,
        user {
          id
        }
      }
    }
  `

  const response = await client.mutate({
    mutation: createUser
  })

  const exists = await prisma.exists.User({ id: response.data.createUser.user.id })

  expect(exists).toBe(true)
});
```

### Challenge
Create two dummy posts for the database

1. Use the correct prisma mutation to create the two posts
  - Set author to the test user
  - Have one be published and the other be a draft
2. Before deleting all users, delete all posts
3. Test your work and verify that two posts are showing up in the database

```js
beforeEach(async () => {
  await prisma.mutation.deleteManyPosts()
  await prisma.mutation.deleteManyUsers()
  const user = await prisma.mutation.createUser({
    data: {
      name: 'Jen',
      email: 'jen@example.com',
      password: bcrypt.hashSync('red12345')
    }
  })
  await prisma.mutation.createPost({
    data: {
      title: 'Test Published Post',
      body: '',
      published: true,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  })
  await prisma.mutation.createPost({
    data: {
      title: 'Test Draft Post',
      body: '',
      published: false,
      author: {
        connect: {
          id: user.id
        }
      }
    }
  })
})

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "Phil",
          email: "phil@example.com",
          password: "mypass123"
        }
      ) {
        token,
        user {
          id
        }
      }
    }
  `

  const response = await client.mutate({
    mutation: createUser
  })

  const exists = await prisma.exists.User({ id: response.data.createUser.user.id })

  expect(exists).toBe(true)
});
```

## Testing Queries

```js
test('Should expose public author profiles', async () => {
  const getUsers = gql`
    query {
      users {
        id
        name
        email
      }
    }
  `

  const response = await client.query({
    query: getUsers
  })

  expect(response.data.users.length).toBe(1)
  expect(response.data.users[0].email).toBe(null)
  expect(response.data.users[0].name).toBe('Jen')
});
```

### Challenge

Write a test for the posts query

1. Create the test case
2. Fire off a posts query getting all scalar fields for each post
3. Assert a single post is returned and that it's published
4. Run the test suite to test your work

```js
test('Should expose published posts', async () => {
  const getPosts = gql`
    query {
      posts {
        id
        title
        body
        published
      }
    }
  `

  const response = await client.query({
    query: getPosts
  })

  expect(response.data.posts.length).toBe(1)
  expect(response.data.posts[0].published).toBe(true)
});
```


## Expecting GraphQL Operations to Fail

```js
test('Should not log in with bad credentials', async() => {
  const login = gql`
    mutation {
      login (
        data: {
          email: "fakeuser@email.com",
          password: "43807safd"
        }
      ) {
        token
      }
    }
  `

  await expect(client.mutate({ mutation: login })).rejects.toThrow()

  // expect(() => {
    // throw new Error('hi')
  // }).toThrow()
});
```

### Challenge

Test that you can't signup with a short password

1. Create the test case
2. Setup the createUser mutation operation
3. Fire off the mutation and expect the promise to throw an error
4. Test your work

```js
test('Should not signup user with invalid password', async() => {
  const signup = gql`
    mutation {
      createUser (
        data: {
          name: "faker"
          email: "fakeuser@email.com",
          password: "123"
        }
      ) {
        token
      }
    }
  `

  await expect(client.mutate({ mutation: signup })).rejects.toThrow()
});
```




























