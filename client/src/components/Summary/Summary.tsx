import React from 'react'

import { useEventContext } from '../../contexts/event.context'

import { StyledSummary } from './Summary.styled'

import EventList from './EventList/EventList'
import SumButt from './SummaryButton/SummaryButton'

// Summary body either returns a list of events or a welcome message
// TODO: Extract rendering event logic to this component and add an abstracted lauer to the summary propper
// TODO: Conditional logic to render one of two states

const Summary = (props: any) => {
  const ctx = useEventContext().date.date

  return (
    <StyledSummary>
      <button onClick={props.click}>close</button>
      <EventList ctx={ctx} />
    </StyledSummary>
  )
}

export default Summary
