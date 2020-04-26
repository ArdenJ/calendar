import React, { useState, useEffect } from 'react'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'

// Context
import { DateProvider } from './contexts/date.context'
import { EventProvider } from './contexts/event.context'

// Hooks 
import {useTheme} from './hooks/useTheme'

// Theming
import { lightTheme, darkTheme } from './styling/themes/themes'
import { GlobalStyles } from './styling/global'

// Components
import Calendar from './components/Calendar/Calendar'

const App: React.FC = () => {

  const {theme, updateTheme} = useTheme()

  return (
    <DateProvider>
      <EventProvider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <div className="App">
              <div style={{
                width: '375px', 
                minHeight: '812px', 
                display: 'flex', 
                alignItems: 'flex-start', 
                position: 'absolute', 
                top: '5vh', 
                transform: 'translateX(-50%)'
              }}>
                <Calendar themeHook={[theme, updateTheme]} />
              </div>
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
