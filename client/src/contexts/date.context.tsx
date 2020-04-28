import React, { useReducer } from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

type Action = { type: 'next' } | { type: 'back' } | { type: 'reset' }
type Dispatch = (action: Action) => void
type State = { date: number }
type DateProviderProps = { children: React.ReactNode }

const NEXT = 'next'
const BACK = 'back'
const RESET = 'reset'
const DAY = 'day'
const MONTH = 'month'
const MonthStateContext = React.createContext<State | undefined>(undefined)
const MonthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

function monthReducer(state: State, action: Action) {
  switch (action.type) {
    case NEXT: {
      return { date: state.date + 1 }
    }
    case BACK: {
      return { date: state.date - 1 }
    }
    case RESET: {
      return { date: 0 }
    }
  }
}

function DateProvider({ children }: DateProviderProps) {
  const [state, dispatch] = useReducer(monthReducer, { date: 0 })
  return (
    <MonthStateContext.Provider value={state}>
      <MonthDispatchContext.Provider value={dispatch}>
        {children}
      </MonthDispatchContext.Provider>
    </MonthStateContext.Provider>
  )
}

function useMonthState() {
  const context = React.useContext(MonthStateContext)
  if (context === undefined) {
    throw new Error('useMonthState must be used within a MonthProvider')
  }
  return context
}

function useMonthDispatch() {
  const context = React.useContext(MonthDispatchContext)
  if (context === undefined) {
    throw new Error('useMonthDispatch must be used within a MonthProvider')
  }
  return context
}

function useDate() {
  const { date } = useMonthState()
  const DATE = moment()
    .add(date, 'months')
    .format('YYYY-MM-DD')

  return DATE
}

function useEvents(scope: string) {
  let returnedData: any
  const date = useDate()
  const QUERY = scope === DAY ? QUERY_EVENTS_ON_DAY : QUERY_EVENTS_ON_MONTH
  const { loading, error, data } = useQuery(QUERY, {
    variables: { DATE: date },
  })
  if (loading) console.log('loading')
  if (error || !loading) console.log(error)
  returnedData = data
  return returnedData
}

export {
  DateProvider,
  useMonthState,
  useMonthDispatch,
  useDate,
  useEvents,
  NEXT,
  BACK,
  DAY,
  MONTH,
  RESET,
}

// QUERIES
const QUERY_EVENTS_ON_MONTH = gql`
  query($DATE: String!) {
    eventsByMonth(date: $DATE) {
      id
      title
      date
    }
  }
`

const QUERY_EVENTS_ON_DAY = gql`
  query($DATE: String!) {
    eventsByDay(date: $DATE) {
      id
      title
      date
    }
  }
`
