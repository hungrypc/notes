import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
})

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
})
