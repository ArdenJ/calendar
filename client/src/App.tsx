import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import { DateProvider, NEXT, BACK } from './contexts/date.context'

import { theme } from './styling/theme'
import { GlobalStyles } from './styling/global'

import Date from './components/Date/Date'
import Button from './components/Button/Button'
import CalendarBody from './components/CalendarBody/CalendarBody'

const App: React.FC = () => {
  return (
    <DateProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <div className="App">
            <Date />
            <Button click={BACK}>BACK</Button>
            <Button click={NEXT}>NEXT</Button>
            <CalendarBody />
          </div>
        </ThemeProvider>
      </ApolloProvider>
    </DateProvider>
  )
}

// Apollo
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
})

export default App
