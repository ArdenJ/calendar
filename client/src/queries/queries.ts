import gql from 'graphql-tag'

export const QUERY_EVENTS_ON_DAY = gql`
  query($DATE: String!) {
    eventsByDay(date: $DATE) {
      id
      title
      date
    }
  }
`
export const QUERY_EVENTS_ON_MONTH = gql`
  query($DATE: String!) {
    eventsByMonth(date: $DATE) {
      id
      title
      date
    }
  }
`

export const QUERY_EVENTS = gql`
  query {
    id
  }
`

export const MUTATION_ADD_EVENT = gql`
  mutation($title: String!, $date: String!, $id: String!) {
    createEVENT(title: $title, date: $date, id: $id) {
      id
      title
      date
    }
  }
`

export const MUTATION_DELETE_EVENT = gql`
  mutation($id: String!) {
    deleteEVENT(id: $id) {
      title
    }
  }
`
