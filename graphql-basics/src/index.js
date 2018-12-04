import { GraphQLServer } from 'graphql-yoga';

// Scalar Types => String, Boolean, Int, Float, ID

// Type definations (schema)
const typeDefs = `
  type Query {
    greeting(name: String!, position: String!): String!
    me: User!
    post: Post!
  }

  type User {
    id: ID
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// Resplvers
const resolvers = {
  Query: {
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.posotion}.`
      }
      return 'Hello'
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
}

const server = new GraphQLServer({
  typeDefs,
  resolvers
})

server.start(() => {
  console.log('The server is up!')
})