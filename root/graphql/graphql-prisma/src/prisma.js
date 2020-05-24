import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466',
})


// const updatePostForUser = async (postId, data) => {
//   const postExists = await prisma.exists.Post({ id: postId })

//   if (!postExists) {
//     throw new Error('Post not found')
//   }

//   const post = await prisma.mutation.updatePost({
//     where: {
//       id: postId
//     },
//     data
//   }, '{ author { id name email posts { id title body } } }')

//   return post.author
// }

// updatePostForUser("1", {
//   title: "updated and userExists",
//   body: "new n improved"
// }).then((user) => {
//   console.log(JSON.stringify(user, undefined, 2))
// }).catch((error) => {
//   console.log(error.message)
// })

