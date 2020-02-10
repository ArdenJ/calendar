import React, { useState } from 'react'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'
import { DateProvider } from './contexts/date.context'
import { EventProvider } from './contexts/event.context'

import { lightTheme, darkTheme } from './styling/themes/themes'
import { GlobalStyles } from './styling/global'

import Wrapper from './components/Wrapper/Wrapper'
import Header from './components/Header/Header'
import Summary from './components/Summary/Summary'
import Calendar from './components/Calendar/Calendar'

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  function setDarkMode() {
    setIsDarkMode(!isDarkMode)
    console.log(isDarkMode)
  }

  return (
    <DateProvider>
      <EventProvider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
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
                  <Calendar setDarkMode={setDarkMode} />
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
  cache: new InMemoryCache(),
})

export default App
