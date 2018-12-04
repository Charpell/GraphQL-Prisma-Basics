import { GraphQLServer } from 'graphql-yoga';

// Scalar Types => String, Boolean, Int, Float, ID

// Type definations (schema)
const typeDefs = `
  type Query {
    id: ID!
    name: String!
    age: Int!
    employed: Boolean!
    gpa: Float
  }
`

// Resplvers
const resolvers = {
  Query: {
    id() {
      return 'abc123'
    },
    name() {
      return 'Ebuka'
    },
    age() {
      return 27
    },
    employed() {
      return true
    },
    gpa() {
      return null
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