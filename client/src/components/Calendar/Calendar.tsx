import React from 'react'

import CalendarHeader from '../CalendarHeader/CalendarHeader'
import CalendarBody from '../CalendarBody/CalendarBody'
import Nav from '../Nav/Nav'

import { StyledCalendar } from './Calendar.styled'

const Calendar = ({ setDarkMode }: any): JSX.Element => {
  return (
    <StyledCalendar>
      <div className="header">
        <CalendarHeader />
        <Nav toggle={setDarkMode} />
      </div>
      <CalendarBody />
    </StyledCalendar>
  )
}

export default Calendar
