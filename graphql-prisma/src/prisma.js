import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: 'http://localhost:4466'
})

// prisma.query.users(null, '{ id name posts { id title } }')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   })


// prisma.query.comments(null, '{ id text author { id name } }')
//   .then(data => {
//     console.log(JSON.stringify(data, undefined, 2))
//   })


prisma.mutation.createPost({
  data: {
    title: 'Title of Post',
    body: 'New body of post',
    published: false,
    author: {
      connect: {
        id: "cjpc7xjf4001s0811g4hypnjg"
      }
    }
  }
}, '{ id title body published }').then(data => {
  console.log(data)
  return prisma.query.users(null, '{ id name posts { id title } }')
}).then(data => {
  console.log(JSON.stringify(data, undefined, 2))
})


prisma.mutation.updatePost({
  where: {
    id: "cjpcaztqw0053081127pmol5q"
  },
  data: {
    body: "Newly updated post",
    published: true
  }
}, '{ id }').then(data => {
  return prisma.query.posts(null, '{ id title body published }')
}).then(data => {
  console.log(data)
})