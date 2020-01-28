import React from 'react'
import moment from 'moment'
import gql from 'graphql-tag'

import Grid from '../Grid/Grid'
import Card from '../Card/Card'

import { useDate } from '../../contexts/date.context'

const CalendarBody = (): JSX.Element => {
  let firstDay = `01-${moment(useDate()).format('MM-YYYY')}`
  debugger

  function findSunday() {
    let firstSun: string
    let sun = moment(firstDay, 'DD-MM-YYYY').format('ddd')
    let i = 1
    if (sun === 'Sun') {
      firstSun = firstDay
      return firstSun
    } else {
      do {
        i = i++
        firstDay = `${moment(firstDay, 'DD-MM-YYYY')
          .add(-i, 'days')
          .format('DD-MM-YYYY')}`
        firstSun = firstDay
        sun = moment(firstSun, 'DD-MM-YYYY').format('ddd')
        debugger
      } while (sun !== 'Sun')
      return firstSun // This should be a date string in format of (DD-MM-YYYY)
    }
  }

  const start = moment(findSunday(), 'DD-MM-YYYY')

  const arr = Array(42)
    .fill(0)
    .map((_, i) => {
      return (
        <Card>{`${moment(start)
          .add(i, 'days')
          .format('ddd-DD-MM')}`}</Card>
      )
    })

  return <Grid>{arr}</Grid>
}

const QUERY_EVENTS_ON_MONTH = gql`
  query($DATE: String) {
    eventsByMonth(date: $DATE) {
      id
      title
      date
    }
  }
`

export default CalendarBody
