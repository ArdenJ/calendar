const { gql, ApolloServer } = require('apollo-server')
const crypto = require('crypto')
const fetch = require('node-fetch')

import { environment } from '../environment'

// import { typeDefs } from './typeDefs'
// import { resolvers } from './resolvers';

// GQL - TypeDefs
const typeDefs = gql`
  type ToDo {
    id: String!
    title: String!
    date: String!
  }

  type Query {
    todos: [ToDo]
  }
`

// GQL - resolvers
const resolvers = {
  Query: {
    todos: (root, args, { db }, info) => {
      return fetch(db)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    },
  },
}

// Apollo Server
const { apollo, port, jsonServ } = environment

// TODO: .env variables aren't getting passed...
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    id: crypto.randomBytes(10).toString('hex'),
    db: `${jsonServ}todos`,
  }),
  introspection: true,
  playground: true,
})

server.listen(port).then(({ url }: any) => {
  console.log(`server ready of ${url} 🚀`)
})

// Webpack - Hot Module Replacement
if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => {
    server.stop()
    console.log('Modules disposed... 💀')
  })
}
