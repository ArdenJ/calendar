import React from 'react'
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
import { render } from '@testing-library/react'


const AllTheProviders = ({ children }:any) => {
  const {theme, updateTheme} = useTheme()

  return (
    <DateProvider>
      <EventProvider>
        <ApolloProvider client={client}>
          <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            {children}
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

//@ts-ignore
const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }