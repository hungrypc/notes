# Production Deployment

## Prisma Config and Deployment

We're going to use Prisma Cloud to host our server (go thru server set up).

Create a new directory in graphql-prisma: config

- In here, we're going to create a new cofig file for each environment we want
  - development: dev.env
  - production: prod.env

```env
<!-- the format here is key=value -->

<!-- dev.env -->
PRISMA_ENDPOINT=http://localhost:4466

<!-- prisma.yml -->
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.graphql
secret: secret_text

prisma deploy -e ../config/dev.env
```
This is how we route the endpoint for development. For production, we actually let prisma handle populating the prod.ev file.

```
prisma login
prisma deploy -e ../config/prod.env
<!-- from here, prisma will ask us what app to connect and will finish the rest -->
```
Now, we have a service on Prisma Cloud.

## Node.js Production App Deployment

```cli
npm i -g heroku
heroku login
```

```js
// index.js
// ...
server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('The server is up!')
})

// npm i env-cmd@8.0.2

// package.json
"scripts": {
    "start": "",
    "dev": "env-cmd ./config/dev/env nodemon src/index.js --exec babel-node",
    // now when we're in development, we run: npm run dev
    // ...
  },

// prisma.js
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,    // SET UP
  secret: 'secret_text',
  fragmentReplacements
})
```

































