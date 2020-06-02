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

File structure for my project isn't in sync with lecture so I will document what I learn here, rather than in the project.

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
})
```





































