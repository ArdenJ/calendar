const { gql } = require('apollo-server')

export const typeDefs = gql`
  type ToDo {
    id: String!
    title: String!
    date: String!
  }

  type Query {
    ToDos: [ToDo!]!
  }
`
