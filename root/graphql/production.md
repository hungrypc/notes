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
npm i env-cmd@8.0.2
npm i @babel/polyfill@7.0.0
```

```js
// index.js
import '@babel/polyfill'
// ...
server.start({ port: process.env.PORT || 4000 }, () => {
  console.log('The server is up!')
})


// package.json
"scripts": {
    "start": "node dist/index.js",
    "heroku-postbuild": "babel src --out-dir dist --copy-files",
    // this script is going to run thru babel
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


// heroku create
// heroku config:set PRISMA_ENDPOINT=https://chan-blogging-app-09f77f0fe6.herokuapp.com/chan-blogging-app/prod
// git push heroku master
```


## Node.js Production Environment Variables

```js
// prisma.js
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,    // set up
  fragmentReplacements
});

```

```yml
// prisma.yml
endpoint: ${env:PRISMA_ENDPOINT}
datamodel: datamodel.graphql
secret: ${env:PRISMA_SECRET}

// dev.env
PRISMA_SECRET=secret_text

// prod.env
PRISMA_SECRET=secret_text

heroku config:set PRISMA_SECRET=secret_text
cd prisma
prisma deploy -e ../config/dev.env
npm run dev
cd ..
git add .
git commit -m ''
git push heroku master
cd prisma
prisma deploy -e ../config/prod.env
```

note: "get-schema": "graphql get-schema -p prisma --dotenv config/dev.env"
