import React, { useState } from 'react'

type EventProviderProps = { children: React.ReactNode }
interface IState {
  date: { date: string }
  setDate: React.Dispatch<
    React.SetStateAction<{
      date: string
    }>
  >
}

const EventStateContext = React.createContext<IState | undefined>(undefined)

function EventProvider({ children }: EventProviderProps) {
  const [date, setDate] = useState({ date: '' })
  const events = {
    date,
    setDate,
  }
  return (
    <EventStateContext.Provider value={events}>
      {children}
    </EventStateContext.Provider>
  )
}

function useEventContext() {
  const ctx = React.useContext(EventStateContext)
  if (ctx === undefined) {
    throw new Error('useEventContext must be used withiing a EventProvider')
  }
  return ctx
}

function setEventContext(newDate: string): void {}

export { EventProvider, useEventContext, setEventContext }
