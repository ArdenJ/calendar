import React from 'react'
import ApolloClient, {InMemoryCache} from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import { DateProvider } from './contexts/date.context'
import { EventProvider } from './contexts/event.context'

import { theme } from './styling/theme'
import { GlobalStyles } from './styling/global'

import Wrapper from './components/Wrapper/Wrapper'
import Header from './components/Header/Header'
import Summary from './components/Summary/Summary'
import Calendar from './components/Calendar/Calendar'

const App: React.FC = () => {
  return (
    <DateProvider>
      <EventProvider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div className="App">
              <Wrapper>
                <Header>
                  <>HEADER</>
                </Header>
                <div className="summary">
                  <Summary>SUMMARY</Summary>
                </div>
                <div className="calendar">
                  <Calendar />
                </div>
              </Wrapper>
            </div>
          </ThemeProvider>
        </ApolloProvider>
      </EventProvider>
    </DateProvider>
  )
}

// Apollo
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

export default App
