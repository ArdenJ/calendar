const { ApolloServer } = require('apollo-server')
const crypto = require('crypto')
import typeDefs from './typeDefs'
import resolvers from './resolvers'

// Apollo Server
import { environment } from '../environment'
const { port, jsonServ } = environment

// TODO: apollo .env variables aren't getting passed...
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    id: crypto.randomBytes(10).toString('hex'),
    db: `${jsonServ}events`,
  }),
  introspection: true,
  playground: true,
})

server.listen(port).then(({ url }): any => {
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
