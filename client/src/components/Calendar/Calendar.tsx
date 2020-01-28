import React from 'react'

import CalendarHeader from '../CalendarHeader/CalendarHeader'
import CalendarBody from '../CalendarBody/CalendarBody'
import Nav from '../Nav/Nav'

import { StyledCalendar } from './Calendar.styled'

const Calendar = (): JSX.Element => {
  return (
    <StyledCalendar>
      <div className="header">
        <CalendarHeader />
        <Nav>NAV</Nav>
      </div>
      <CalendarBody />
    </StyledCalendar>
  )
}

export default Calendar
