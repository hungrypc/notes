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
})





















