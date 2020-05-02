import React from 'react'
import styled from 'styled-components'

import { useEventContext } from '../../../../contexts/event.context'

import EventList from './EventList/EventList'
import { Cross } from './EventList/assets/SVGS'

// Summary is presentational - it handles the rendering of the event list
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

// Styling 
const StyledSummary = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  border: ${({theme}) => `3px dashed ${theme.accent}`};

  input {
    background: transparent;
    border: none;
  }

  button {
    border: ${({theme}) => `3px solid ${theme.textLight}`};
    border-radius: 4px;
    padding: 0.6rem;
    background: none;
    color: ${({theme}) => theme.textLight}
  }

  svg {
    height: 1rem;
    width: 1rem;
    fill: ${({theme}) => `${theme.textLight} !important`}
  }
`

