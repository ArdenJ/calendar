import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { getStartDate, getAdditionalDays } from '../utils/monthFormat'
import { splitDayArray } from '../utils/splitArray'

import { useDate } from '../../../contexts/date.context'

import Grid from './Grid/Grid'
import Week from './Week/Week'
import Day from './Day/Day'

import { QUERY_EVENTS_ON_MONTH } from '../../../queries/queries'

// 7 days in a week innit
const rowLength = 7

const CalendarBody = () => {
  const [openEditor, setOpenEditor] = useState<{
    openIndex: [string, number]
  }>({ openIndex: ['none', 0] });

  // get the month presently in view
  // create date string for first of the month
  let firstDay = `01-${moment(useDate()).format('MM-YYYY')}` 

  // ensure start is correctly formatted 
  const start = moment(getStartDate(firstDay), 'DD-MM-YYYY') 

  // get the number of additional days (first sunday before start of month)
  const additionalDays = getAdditionalDays(firstDay) 

  // get the present date 
  const date = moment(useDate()).format('DD-MM-YYYY')

  // gql query to find event in the month
  let { loading, error, data } = useQuery(QUERY_EVENTS_ON_MONTH, {
    variables: { DATE: date },
  })
  if (loading) return <>{'loading...'}</>
  if (error) {
    console.error(error)
    return <>{'Sorry pal, something went wrong'}</>
  }

  interface IEventData {
    id: string,
    title: string,
    date: string
  }
  // create an array of 42 cards (6 weeks)
  // spread the events into the cards
  const arr = Array(42)
    .fill(0)
    .map((_, index) => {
      const EVENTS = data.eventsByMonth.filter((i: IEventData) => {
        return (
          moment(i.date, 'DD-MM-YYYY').format('D') ===
          (index + 1 + additionalDays).toString()
        )
      })
      return [index + 1 + additionalDays, [...EVENTS]]
    })

  const dayArray = arr.map((_: any, index: number) => {
    let weekNo = `week${Math.ceil((index + 1) / rowLength)}`;
    let inMonth =  moment(start, 'DD-MM-YYYY')
    .add(index, 'days')
    .format('MMM') === moment(date, 'DD-MM-YYYY').format('MMM')
    ? 'month'
    : 'hidden'
    return (
      <div 
        data-testid={`Card_${index}`} 
        key={`Card_${index}`} 
        className={`item ${inMonth}`} 
        style={{display: 'flex', width: 'calc(100% / 7)', minHeight: '7vh'}}>
      <Day
        key={`Card_${index}`}
        date={moment(start)
          .add(index, 'days')
          .format('DD-MM-YYYY')}
        events={arr[index][1]}
        highlight={inMonth}
        index={index}
        weekNo={weekNo}
        setOpenEditor={setOpenEditor}
        openEditor={openEditor}
      />
      </div>
    );
  });

  const splitArray = splitDayArray(dayArray, rowLength);

  const weeks = splitArray.map((i, index) => {
    return (
      <Week
        key={`Week_${index}`}
        weekNo={`week${index + 1}`}
        setOpenEditor={setOpenEditor}
        openEditor={openEditor}
      >
        {i}
      </Week>
    );
  });

  // return CalendarBody
  return (
    <div style={{height: '100%', width: '100%'}}>
      <Grid>
        {weeks}
      </Grid>
    </div>
  );
}

export default CalendarBody