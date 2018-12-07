const Query = {
  users(parent, args, { prisma }, info) {
    return prisma.query.users(null, info)

    // if (!args.query) {
    //   return db.users
    // }

    // return db.users.filter(user => {
    //   return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
    // })
  },

  posts(parent, args, { prisma }, info) {
    return prisma.query.posts(null, info)

    // if (!args.query) {
    //   return db.posts
    // }

    // return db.posts.filter(post => {
    //   const isTitleMatch = post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
    //   const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
    //   return isTitleMatch || isBodyMatch
    // })
  },

  comments(parent, args, { db }, info) {
    return db.comments
  },

  me() {
    return {
      id: '1234',
      name: 'Mike',
      email: 'wes@gmail.com',
      age: 20
    }
  },

  post() {
    return {
      id: '092',
      title: 'GraphQL 101',
      body: 'This is a body',
      published: false
    }
  }
}

export { Query as default }