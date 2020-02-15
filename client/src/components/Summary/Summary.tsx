import React from 'react'

import { useEventContext } from '../../contexts/event.context'

import { StyledSummary } from './Summary.styled'

import EventList from './EventList/EventList'
import SumButt from './SummaryButton/SummaryButton'

// Summary body either returns a list of events or a welcome message
// TODO: Extract rendering event logic to this component and add an abstracted lauer to the summary propper
// TODO: Conditional logic to render one of two states

const Summary = (): JSX.Element => {
  const ctx = useEventContext().date.date

  const Body = () => {
    if (ctx !== '') {
      // If there is a valid da./SummaryBody/Summary.styledturn event list
      return (
        //events
        <>
          <div className="heading">
            <h1>{ctx}</h1>
            <SumButt />
          </div>
          <EventList ctx={ctx} />
        </>
      )
    } else {
      return (
        //If there isn't a valid date in context, return welcome message
        <>
          <h2>👋</h2>
        </>
      )
    }
  }

  return (
    <StyledSummary>
      <Body />
    </StyledSummary>
  )
}

export default Summary
