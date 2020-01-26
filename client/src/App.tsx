import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

const App: React.FC = () => {
  // Apollo
  const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
  })
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Calendar App 9000</h1>
      </div>
    </ApolloProvider>
  )
}

export default App
