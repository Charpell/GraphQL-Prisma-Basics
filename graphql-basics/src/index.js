import { GraphQLServer } from 'graphql-yoga';
import uuidv4 from 'uuid/v4'

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
  published: true,
  author: '1'
},{
  id: '11',
  title: 'GraphQL 201',
  body: 'This is how to use GraphQl..',
  published: false,
  author: '1'
},{
  id: '13',
  title: 'Programming Music',
  body: 'This is how to use GraphQl..',
  published: false,
  author: '2'
}]


const comments = [{
  id: '102',
  text: 'This worked well for me. Thanks!',
  author: '3',
  post: '10'
}, {
  id: '103',
  text: 'Glad you enjoyed it.',
  author: '1',
  post: '10'
}, {
  id: '104',
  text: 'This did no work.',
  author: '2',
  post: '11'
}, {
  id: '105',
  text: 'Nevermind. I got it to work.',
  author: '1',
  post: '11'
}]


// Type definations (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): User!
    createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
  }

  type User {
    id: ID
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }
  
  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
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

    comments(parent, args, ctx, info) {
      return comments
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
  },
  
  Mutation: {
    createUser(parent, args, ctx, info) {
      const emailToken = users.some(user => user.email === args.email)

      if (emailToken) {
        throw new Error('Email taken')
      }
      
      const user = {
        id: uuidv4(),
        name: args.name,
        email: args.email,
        age: args.age
      }

      users.push(user)

      return user
    },

    createPost(parent, args, ctx, info) {
      const userExists = users.some(user => user.id === args.author)

      if (!userExists) {
        throw new Error('User not found')
      }

      const post = {
        id: uuidv4(),
        title: args.title,
        body: args.body,
        published: args.published,
        author: args.author
      }

      posts.push(post)

      return post
    }
  },

  Post: {
    author(parent, args, ctx, info) {
      return users.find(user => {
        return user.id === parent.author
      })
    },
    comments(parent, args, ctx, info) {
        return comments.filter((comment) => {
            return comment.post === parent.id
        })
    }
  },

  Comment: {
    author(parent, args, ctx, info) {
        return users.find((user) => {
            return user.id === parent.author
        })
    },
    post(parent, args, ctx, info) {
        return posts.find((post) => {
            return post.id === parent.post
        })
    }
  },
  
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id
      })
    },
    comments(parent, args, ctx, info) {
        return comments.filter((comment) => {
            return comment.author === parent.id
        })
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