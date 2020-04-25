import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import { getStartDate, getAdditionalDays } from '../utils/monthFormat'

import { useDate } from '../../../contexts/date.context'

import Grid from './Grid/Grid'
import Week from './Week/Week'
import Day from './Day/Day'

// 7 b'cos 7 days in a week innit
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
  if (loading) return <>loading...</>
  if (error || !loading) console.log(error)

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
      <div className={`item ${inMonth}`} style={{display: 'flex', width: 'calc(100% / 7)', minHeight: '7vh', flexShrink: 4}}>
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

  const splitDayArray = (arg: JSX.Element[]) => {
    let innerArr = arg;
    let memo: any[] = [];
    const slicer = (innerArr: JSX.Element[]) => {
      if (innerArr.length === 0) return memo;
      for (let day of innerArr) {
        if (innerArr.indexOf(day) + 1 === rowLength) {
          let arr = innerArr.slice(0, innerArr.indexOf(day) + 1);
          memo.push(arr);
          slicer(innerArr.slice(innerArr.indexOf(day) + 1));
        }
      }
      return memo;
    };
    return slicer(innerArr);
  };

  const splitArray = splitDayArray(dayArray);

  const weeks = splitArray.map((i, index) => {
    return (
      <Week
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
    <div style={{width: '100%'}}>
      <Grid>
        {weeks}
      </Grid>
    </div>
  );
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