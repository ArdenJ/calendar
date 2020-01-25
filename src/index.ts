const { ApolloServer } = require('apollo-server')

import { environment } from '../environment'

import { typeDefs } from './typeDefs'
// import { resolvers } from "./resolvers";

const ToDos = [
  {
    id: '123',
    title: 'A thing',
    date: 'a fucking string',
  },
]

const resolvers = {
  Query: {
    ToDos: () => ToDos,
  },
}

const { apollo, port } = environment

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    id: 'this will create random IDs',
    db: 'local db',
  }),
  introspection: apollo.introspection,
  playground: apollo.playground,
})

server.listen(port).then(({ url }: any) => {
  console.log(`server ready of ${url} 🚀`)
})

// Hot Module Replacement
if (module.hot) {
  module.hot.accept()
  module.hot.dispose(() => console.log('Module disposed. '))
}
