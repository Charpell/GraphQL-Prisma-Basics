import { GraphQLServer } from 'graphql-yoga';

// Type definations (schema)
const typeDefs = `
  type Query {
    hello: String!
    name: String!
  }
`

// Resplvers
const resolvers = {
  Query: {
    hello() {
      return 'This is my first query!'
    },
    name() {
      return 'Ebuka Umeh'
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