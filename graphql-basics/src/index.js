import { GraphQLServer } from 'graphql-yoga';

// Scalar Types => String, Boolean, Int, Float, ID

// Demo user data
const users = [{
  id: '1',
  name: 'Andrew',
  email: 'andrew@example.com',
  age: 27
},
{
  id: '2',
  name: 'Sarah',
  email: 'sarah@example.com'
},
{
  id: '3',
  name: 'Mike',
  email: 'mike@example.com',
  age: 27
}]

// Demo post data
const posts = [{
  id: '10',
  title: 'GraphQL 101',
  body: 'This is how to use GraphQl..',
  published: true
},{
  id: '11',
  title: 'GraphQL 201',
  body: 'This is how to use GraphQl..',
  published: false
},{
  id: '13',
  title: 'Programming Music',
  body: 'This is how to use GraphQl..',
  published: false
}]

// Type definations (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
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
    users(parent, args, ctx, info) {
      if (!args.query) {
        return users
      }

      return users.filter(user => {
        return user.name.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
      })
    },

    posts(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter(post => {
        const isTitleMatch = post.title.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
        const isBodyMatch = post.body.toLocaleLowerCase().includes(args.query.toLocaleLowerCase())
        return isTitleMatch || isBodyMatch
      })
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