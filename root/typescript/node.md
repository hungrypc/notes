# Node.js + Express + TypeScript

[TS and Node Playground repo](https://github.com/hungrypc/typescript-nodejs-playground)

Node **can** work with ts files so long as it's all js, but that's not the point and would be stupid, we use ts for the advantages that ts provides. There is also [ts-node](https://github.com/TypeStrong/ts-node), which is a package that gives a ts compiler combined with the node executable. But, whilst it's nice for development, we might not want to do this for production.

All we need is the `tsc` command for compiling and the `node` command to execute.

## Setup
```cli
npm i --save express body-parser
npm i --save-dev nodemon @types/node @types/express
```

```ts
{
  "compilerOptions": {
    "target": "es2018",
    "module": "commonjs",  
    "moduleResolution": "node", // this tells ts how your files and imports will work together
    "outDir": "./dist",
    "rootDir": "./src", 
    // ...
}

// package.json
{
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "nodemon dist/app.js"
    },
}

// src/app.ts
import express from 'express'

const app = express()

app.listen(3000)
```
So in node js, we wouldn't actually use this import syntax, it's still experimental. *BUT*, we **can** use it in ts since it will get compiled. It also prefers this import syntax since types will be correctly defined through this way. 

## Adding Middleware and Types
```ts
// routes/todos.ts
import { Router } from 'express'
// const express = require('express')
// const Router = express.Router

const router = Router()
// this allows us to register middleware for the end routes and points 
// for incoming requests where we then execute some logic upon these requests

// setting up routes
router.post('/')

router.get('/')

router.patch('/:id')

router.delete('/:id')

export default router


// app.ts
import express, { Request, Response, NextFunction } from 'express'
import todoRoutes from './routes/todos'

const app = express()

app.use('/todos', todoRoutes)

// for errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    message: err.message
  })
})

app.listen(3000)
```

## Working with Controllers & Parsing Requests
```ts
// instead of typing { Request, Response, NextFunction } from 'express' over and over,
// we can just do import { RequestHandler } from 'express':

// controllers/todos.ts
import { RequestHandler } from 'express'

import { Todo } from '../models/todo'

// dummy db
const TODOS = []

export const createTodo: RequestHandler = (req, res, next) => {
    const text = (req.body as { text: string }).text
    const newTodo = new Todo(Math.random().toString(), text)

    TODOS.push(newTodo)

    res.status(201).json({
        message: 'Todo Created',
        createdTodo: newTodo
    })
}


// models/todo.ts
export class Todo {
  constructor(public id: string, public text: string) {}
}


// routes/todos.ts
import { Router } from 'express'
import { createTodo } from '../controllers/todos'

const router = Router()

router.post('/', createTodo)
// ...


// app.ts
import express, { Request, Response, NextFunction } from 'express'
import { json } from 'body-parser'

import todoRoutes from './routes/todos'

const app = express()

// parses body of incoming reqs and extracts json to populate body key
app.use(json())

// ...
```

From here, use PostMan.


## More CRUD Operations
```ts
// controllers/todos.ts
// ...
export const getTodos: RequestHandler = (req, res, next) => {
  res.json({
    todos: TODOS
  })
}


export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id

  const updatedText = (req.body as { text: string }).text

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

  if (todoIndex < 0) {
    throw new Error('could not find todo')
  }

  TODOS[todoIndex] = new Todo(TODOS[todoIndex].id, updatedText)

  res.json({
    message: 'updated',
    updatedTodo: TODOS[todoIndex]
  })
}

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
  const todoId = req.params.id

  const todoIndex = TODOS.findIndex(todo => todo.id === todoId)

  if (todoIndex < 0) {
    throw new Error('could not find todo')
  }

  TODOS.splice(todoIndex, 1)

  res.json({
    message: 'Deleted'
  })
}


// routes/todos.ts
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todos'
// ...
router.post('/', createTodo)

router.get('/', getTodos)

router.patch('/:id', updateTodo)

router.delete('/:id', deleteTodo)
```

## Moving Forward
Check out Nest.js, it's a framework which gives node projects with TS support out of the box. 













