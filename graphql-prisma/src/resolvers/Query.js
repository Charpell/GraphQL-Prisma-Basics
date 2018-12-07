const Query = {
  users(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
      opArgs.where = {
        OR: [{
          name_contains: args.query
        }, {
          email_contains: args.query
        }]
      }
    }

    return prisma.query.users(opArgs, info)
  },

  posts(parent, args, { prisma }, info) {
    const opArgs = {}
    
    if (args.query) {
      opArgs.where = {
        OR: [{
          title_contains: args.query
        }, {
          body_contains: args.query
        }]
      }
    }

    return prisma.query.posts(opArgs, info)

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