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


// prisma.mutation.createPost({
//   data: {
//     title: 'Title of Post',
//     body: 'New body of post',
//     published: false,
//     author: {
//       connect: {
//         id: "cjpc7xjf4001s0811g4hypnjg"
//       }
//     }
//   }
// }, '{ id title body published }').then(data => {
//   console.log(data)
//   return prisma.query.users(null, '{ id name posts { id title } }')
// }).then(data => {
//   console.log(JSON.stringify(data, undefined, 2))
// })


// prisma.mutation.updatePost({
//   where: {
//     id: "cjpcaztqw0053081127pmol5q"
//   },
//   data: {
//     body: "Newly updated post",
//     published: true
//   }
// }, '{ id }').then(data => {
//   return prisma.query.posts(null, '{ id title body published }')
// }).then(data => {
//   console.log(data)
// })





// Using Async and Await

//  Create Post Function
const createPostForUser = async (authorId, data) => {
  const post = await prisma.mutation.createPost({
    data: {
      ...data,
      author: {
        connect: {
          id: authorId
        }
      }
    }
  }, '{ id }')
  const user = await prisma.query.user({
    where: {
      id: authorId
    }
  }, '{ id name email posts { id title published} }')
  return user
}


// Using the function
createPostForUser("cjpc7xjf4001s0811g4hypnjg", {
  title: 'Great books to read',
  body: "The War of Art",
  published: true
}).then(user => {
  console.log(JSON.stringify(user, undefined, 2))
})



// Update Post Function
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
  }, '{ id name email posts { id title published } }')
  return user
}


// Using the Function
updatePostForUser("cjpcbjokm006e0811gkfqe100", { published: false }).then(user => {
  console.log(JSON.stringify(user, undefined, 2))
})