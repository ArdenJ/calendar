const { gql, ApolloServer } = require('apollo-server')
const crypto = require('crypto')
const fetch = require('node-fetch')

// import { typeDefs } from './typeDefs'
// import { resolvers } from './resolvers';

// GQL - TypeDefs
const typeDefs = gql`
  type EVENT {
    id: String!
    title: String!
    date: String!
  }

  type Query {
    events: [EVENT!]!
    eventsByMonth(date: String!): [EVENT]!
    eventsByDay(date: String!): [EVENT]!
    event(id: String!): EVENT!
  }

  type Mutation {
    createEVENT(title: String!, date: String!): EVENT!
    updateEVENT(id: String!, title: String, date: String): EVENT!
    deleteEVENT(id: String!): EVENT
  }
`

// GQL - resolvers
const resolvers = {
  Query: {
    events: (root, args, { db }, info) => {
      return fetch(db)
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    },
    event: (root, { id }, { db }, info) => {
      return fetch(db)
        .then(res => res.json())
        .then(data => data.find(i => i.id === id))
        .then(data => data)
        .catch(err => console.log(err))
    },
    eventsByMonth: (root, { date }, { db }, info) => {
      return fetch(db)
        .then(res => res.json())
        .then(data =>
          data.filter(i => i.date.substr(3, 9) === date.substr(3, 9)),
        )
        .then(data => data)
        .catch(err => console.log(err))
    },
    eventsByDay: (root, { date }, { db }, info) => {
      return fetch(db)
        .then(res => res.json())
        .then(data => data.filter(i => i.date === date))
        .then(data => data)
        .catch(err => console.log(err))
    },
  },

  Mutation: {
    // Create new EVENT
    createEVENT: (root, { title, date }, { db, id }, info) => {
      const newEVENT = {
        id: id,
        title,
        date,
      }
      return fetch(db, {
        method: 'POST',
        body: JSON.stringify(newEVENT),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => data)
        .catch(err => console.log(err))
    },

    // Update existing EVENT
    updateEVENT: (root, args, { db }, info) => {
      const editEVENT = {
        ...args,
      }
      console.log(editEVENT)
      return fetch(`${db}/${args.id}`, {
        method: 'PATCH',
        body: JSON.stringify(editEVENT),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          return data
        })
        .catch(err => console.log(err))
    },

    // Delete existing EVENT
    // TODO: How to handle a the return - there is no data - can I return a generic?
    deleteEVENT: (root, { id }, { db }, info) => {
      return fetch(`${db}/${id}`, {
        method: 'DELETE',
      })
        .then(res => res.json())
        .then(data => {
          console.log(data)
          return data
        })
        .catch(err => console.log(err))
    },
  },
}

// Apollo Server
import { environment } from '../environment'
const {
  apollo: { introspection, playground },
  port,
  jsonServ,
} = environment

// TODO: apollo .env variables aren't getting passed...
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
