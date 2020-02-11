const fetch = require('node-fetch')

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
    createEVENT: (root, { title, date, id }, { db }, info) => {
      const newEVENT = {
        id,
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
          return { id, title: 'empty', date: '' }
        })
        .catch(err => console.log(err))
    },
  },
}

export default resolvers
