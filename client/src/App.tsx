import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import { DateProvider, NEXT, BACK } from './contexts/date.context'

import { theme } from './styling/theme'
import { GlobalStyles } from './styling/global'

//Compon./contexts/dateNav.context
import Grid from './components/Grid/Grid'
import Card from './components/Card/Card'
import Date from './components/Date/Date'
import Button from './components/Button/Button'

const App: React.FC = () => {
  return (
    <DateProvider>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <div className="App">
            <Button click={NEXT}>NEXT</Button>
            <Button click={BACK}>BACK</Button>
            <Date />
            <Grid>
              <Card>prop</Card>
            </Grid>
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
