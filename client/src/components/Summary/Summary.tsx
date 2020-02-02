import React from 'react'
import { useEventContext } from '../../contexts/event.context'

import { StyledSummary } from './Summary.styled'

const Summary = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  const dateCtx = useEventContext().date.date
  return (
    <StyledSummary>
      <h1>{dateCtx}</h1>
      {props.children}
    </StyledSummary>
  )
}

export default Summary
