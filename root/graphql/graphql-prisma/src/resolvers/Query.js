const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.query.users(null, info)
  },
  posts(parent, args, { prisma }, info) {
    return prisma.query.posts(null, info)
  },
  comments(parent, args, { prisma }, info) {
    return prisma.query.comments(null, info)
  },
}

export { Query as default }