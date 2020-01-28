import React, { useReducer } from 'react'
import moment from 'moment'

type Action = { type: 'next' } | { type: 'back' }
type Dispatch = (action: Action) => void
type State = { date: number }
type DateProviderProps = { children: React.ReactNode }

const NEXT = 'next'
const BACK = 'back'
const MonthStateContext = React.createContext<State | undefined>(undefined)
const MonthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

function monthReducer(state: State, action: Action) {
  switch (action.type) {
    case NEXT: {
      return {
        date: state.date + 1,
      }
    }
    case BACK: {
      return { date: state.date - 1 }
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

export { DateProvider, useMonthState, useMonthDispatch, useDate, NEXT, BACK }
