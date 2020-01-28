import React from 'react'

import { NEXT, BACK } from '../../contexts/date.context'

import Button from '../Button/Button'
import Date from '../Date/Date'

import { StyledCalendarHeader } from './CalendarHeader.styled'

const CalendarHeader = (): JSX.Element => {
  return (
    <StyledCalendarHeader>
      <Date />
      <Button click={BACK}>BACK</Button>
      <Button click={NEXT}>NEXT</Button>
    </StyledCalendarHeader>
  )
}

export default CalendarHeader
