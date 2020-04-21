import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { useDate, NEXT, BACK } from '../../../contexts/date.context'

import Button from '../../Button/Button'

const CalendarHeader = (): JSX.Element => {
  return (
    <StyledCalendarHeader>
      <div className="date">
        <Date />
      </div>
      <div className="buttons">
        <Button click={BACK}>BACK</Button>
        <Button click={NEXT}>NEXT</Button>
      </div>
    </StyledCalendarHeader>
  )
}

export default CalendarHeader

function Date(): JSX.Element {
  const date = moment(useDate()).format('MMMM YYYY')
  return <StyledDate>{date}</StyledDate>
}

// Styling
const StyledCalendarHeader = styled.main`
  margin: auto 0;
  padding: 0.4rem 1rem;
  margin-bottom: 0.8rem;
  border: 3px solid black;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;

  .date {
    padding-right: 0.8rem;
    border-right: 3px solid black};
    margin: auto;
  }
  .buttons {
    padding-left: 0.8rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }
`

export const StyledDate = styled.div`
  box-sizing: border-box;
  min-width: 20%;
  color: ${({ theme }) => theme.textLight};
`