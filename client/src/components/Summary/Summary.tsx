import React from 'react'

import { useEventContext } from '../../contexts/event.context'

import { StyledSummary } from './Summary.styled'

import EventList from './EventList/EventList'
import { Cross } from './EventList/icons/SVGS'

const Summary = (props: any) => {
  const ctx = useEventContext().date.date

  return (
    <StyledSummary>
      <button onClick={props.click}>
        <Cross />
      </button>
      <EventList ctx={ctx} />
    </StyledSummary>
  )
}

export default Summary
