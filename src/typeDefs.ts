const { gql } = require('apollo-server')

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
    createEVENT(title: String!, date: String!, id: String!): EVENT!
    updateEVENT(id: String!, title: String, date: String): EVENT!
    deleteEVENT(id: String!): EVENT
  }
`

export default typeDefs
