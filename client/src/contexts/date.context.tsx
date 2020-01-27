import React, { useReducer } from 'react'
import moment, { Moment } from 'moment'

interface IMoment extends Moment {
  state: string | unknown
}
type Action = { type: 'next' } | { type: 'back' }
type Dispatch = (action: Action) => void
type State = { date: string | Moment }
type DateProviderProps = { children: React.ReactNode }

const initialDate = moment().format('YYYY-MM-DD')
const NEXT = 'next'
const BACK = 'back'
// This is hacky and I hate it but TS was being a pig about the type being Unknown..
const MonthStateContext = React.createContext<State | undefined | any>(
  undefined,
)
const MonthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined,
)

function monthReducer(state: State, action: Action) {
  switch (action.type) {
    case NEXT: {
      return { date: moment(state.date, 'YYYY-MM-DD').add(1, 'months') }
    }
    case BACK: {
      return { date: moment(state.date, 'YYYY-MM-DD').add(-1, 'months') }
    }
  }
}

const DateProvider = ({ children }: DateProviderProps) => {
  const [state, dispatch] = useReducer<any>(monthReducer, { date: initialDate })
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
    throw new Error('useCountState must be used within a DateProvider')
  }
  return context
}
function useMonthDispatch() {
  const context = React.useContext(MonthDispatchContext)
  if (context === undefined) {
    throw new Error('useMonthDispatch must be used within a DateProvider')
  }
  return context
}

export { DateProvider, useMonthState, useMonthDispatch }
