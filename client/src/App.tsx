import React, { useState, useEffect } from 'react'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { ThemeProvider } from 'styled-components'

// Context
import { DateProvider } from './contexts/date.context'
import { EventProvider } from './contexts/event.context'

// Theming
import { lightTheme, darkTheme } from './styling/themes/themes'
import { GlobalStyles } from './styling/global'

// Components
import Wrapper from './components/Wrapper/Wrapper'
import Header from './components/Header/Header'
import Summary from './components/Summary/Summary'
import Calendar from './components/Calendar/Calendar'

const App: React.FC = () => {

  // TODO: MOVE TO SEPERATE HOOKS FOLDER
  // custom hook to set and store theme in local storage
  function useTheme():[string, React.Dispatch<string>, boolean] {
    const [isDarkMode, setIsDarkMode] = useState(() => {
      const storedValue = localStorage.getItem('theme')
      return storedValue === null ? false : JSON.parse(storedValue)
    })

    useEffect(() => { 
      localStorage.setItem('theme', JSON.stringify(isDarkMode))
    }, [isDarkMode, setIsDarkMode])

    const themeBoolean = Boolean(localStorage.getItem('theme'))

    return [isDarkMode, setIsDarkMode, themeBoolean]
  }

  const [themeBoolean] = useTheme()

  return (
    <DateProvider>
      <EventProvider>
        <ApolloProvider client={client}>
          {/* FIXME: WHY NO UPDATE?  */}
          <ThemeProvider theme={themeBoolean ? darkTheme : lightTheme}>
            <GlobalStyles />
            <div className="App">
              {/* <Wrapper>
                <Header>
                  <>Calen-dope</>
                </Header>
                <div className="summary">
                  <Summary />
                </div> */}
                <div className="calendar" style={{width: '70vw', height: '80vh'}}>
                  <Calendar setDarkMode={useTheme} />
                </div>
              {/* </Wrapper> */}
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
