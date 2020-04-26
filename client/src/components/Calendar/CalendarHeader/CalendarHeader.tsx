import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { useDate, NEXT, BACK } from '../../../contexts/date.context'

import Button from '../../Button/Button'
import Nav from '../../Nav/Nav'

const CalendarHeader = (props: any): JSX.Element => {
  return (
    <StyledCalendarHeader>
      <div className='month-selector'>
      <div className="date">
        <Date />
      </div>
      <div className="buttons">
        <Button click={BACK}>BACK</Button>
        <Button click={NEXT}>NEXT</Button>
      </div>
      </div>
      <Nav themeHook={props.themeHook}/>
    </StyledCalendarHeader>
  )
}

export default CalendarHeader

function Date(): JSX.Element {
  const date = moment(useDate()).format(`MMM 'YY`)
  return <StyledDate>{date}</StyledDate>
}

// Styling
const StyledCalendarHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  .month-selector {
    padding: 0.4rem 1rem;
    border: 3px solid black;
    border-radius: 4px;
    display: flex;
  }

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
  height: 100%;
  color: ${({ theme }) => theme.textLight};
  display: flex;
  justify-content: center;
  align-items: center;

  line-height: 1;
`