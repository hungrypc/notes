import uuidv4 from 'uuid/v4'

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const emailTaken = await prisma.exists.User({ email: args.data.email })

    if (emailTaken) {
      throw new Error('Email taken')
    }

    return await prisma.mutation.createUser({ data: args.data }, info)
  },
  async deleteUser(parent, args, { prisma }, info) {
    const userExists = await prisma.exists.User({ id: args.id })

    if (!userExists) {
      throw new Error('User not found')
    }

    return prisma.mutation.deleteUser({ 
      where: { 
        id: args.id 
      } 
    }, info)
  },
  async updateUser(parent, args, { prisma }, info) {
    return await prisma.mutation.updateUser({ 
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
  async createPost(parent, args, { prisma }, info) {
    return await prisma.mutation.createPost({ 
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
  },
  async deletePost(parent, args, { prisma }, info) {
    return await prisma.mutation.deletePost({
      where: {
        id: args.id
      }
    }, info)
  },
  async updatePost(parent, args, { prisma }, info) {
    return await prisma.mutation.updatePost({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
  async createComment(parent, args, { prisma }, info) {
    return await prisma.mutation.createComment({ 
      data: {
        text: args.data.text,
        post: {
          connect: {
            id: args.data.post
          }
        },
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
  },
  async deleteComment(parent, args, { prisma }, info) {
    return await prisma.mutation.deleteComment({
      where: {
        id: args.id
      }
    }, info)
  },
  async updateComment(parent, args, { prisma }, info) {
    return await prisma.mutation.updateComment({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  }
}

export { Mutation as default }