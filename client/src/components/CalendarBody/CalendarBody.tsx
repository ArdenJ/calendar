import React from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Grid from '../Grid/Grid'
import Card from '../Card/Card'

import { useDate, useEvents } from '../../contexts/date.context'

const CalendarBody = (): any => {
  let firstDay = `01-${moment(useDate()).format('MM-YYYY')}`

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
      } while (sun !== 'Sun')
      return firstSun // This should be a date string in format of (DD-MM-YYYY)
    }
  }

  const MonthInView = () => {
    const start = moment(findSunday(), 'DD-MM-YYYY')

    const date = moment(useDate()).format('DD-MM-YYYY')
    let { loading, error, data } = useQuery(QUERY_EVENTS_ON_MONTH, {
      variables: { DATE: date },
    })
    if (loading) return <>loading...</>
    if (error || !loading) console.log(error)

    const arr = Array(42)
      .fill(0)
      .map((_, index) => {
        const EVENTS = data.eventsByMonth.filter((i: any) => {
          return (
            moment(i.date, 'DD-MM-YYYY').format('D') === (index + 1).toString()
          )
        })
        return [index + 1, ...EVENTS]
      })

    const FilledCards = arr.map((_, index) => {
      return (
        <Card
          key={`Card_${index}`}
          date={moment(start)
            .add(index, 'days')
            .format('ddd-DD-MM')}
          events={arr[index][1]}
        />
      )
    })
    return <Grid>{FilledCards}</Grid>
  }
  return (
    <>
      <MonthInView />
    </>
  )
}

export default CalendarBody

const QUERY_EVENTS_ON_MONTH = gql`
  query($DATE: String!) {
    eventsByMonth(date: $DATE) {
      id
      title
      date
    }
  }
`
