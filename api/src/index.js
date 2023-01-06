const { ApolloServer } = require('apollo-server');

// 1
const typeDefs = `
  type Query {
    info: String!
  }
`

// 2
const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`
    }
}

// 3
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server
    .listen({
        port: process.env.API_PORT || 3000
    })
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );