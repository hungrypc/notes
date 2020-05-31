import { Prisma } from 'prisma-binding'
import { fragmentReplacements } from './resolvers/index'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'secret_text',
  fragmentReplacements
})

// token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkZWZhdWx0QGRlZmF1bHQiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTkwNDQ0NTU3LCJleHAiOjE1OTEwNDkzNTd9.H8VRz564fzrJvK5tvLPCt012EN5-bW-Z7oybwnpTTH0

export { prisma as default }