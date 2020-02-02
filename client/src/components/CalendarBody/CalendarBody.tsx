import React from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

import Grid from '../Grid/Grid'
import Card from '../Card/Card'

import { getStartDate, getAdditionalDays } from '../../utils/monthFormatModule'

import { useDate, useEvents } from '../../contexts/date.context'

const CalendarBody = (): any => {
  let firstDay = `01-${moment(useDate()).format('MM-YYYY')}`

  const MonthInView = () => {
    const start = moment(getStartDate(firstDay), 'DD-MM-YYYY')
    const additionalDays = getAdditionalDays(firstDay)

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
            moment(i.date, 'DD-MM-YYYY').format('D') ===
            (index + 1 + additionalDays).toString()
          )
        })
        return [index + 1 + additionalDays, [...EVENTS]]
      })

    const FilledCards = arr.map((_, index) => {
      return (
        <Card
          key={`Card_${index}`}
          date={moment(start)
            .add(index, 'days')
            .format('DD-MM-YYYY')}
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
