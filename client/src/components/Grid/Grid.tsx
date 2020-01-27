import React, { useState } from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

import Card from '../Card/Card'

import { StyledGrid } from './Grid.styled'
import { GraphQLObjectType } from 'graphql'

const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const headings = days.map((i, index) => (
  <div key={index} style={{ gridArea: `${i}` }} className="heading">
    {i}
  </div>
))

export default function Grid(props: JSX.ElementChildrenAttribute): JSX.Element {
  // Declare state
  let [date, setDate] = useState(moment().format('MM-DD-YYYY'))
  console.log(date)
  // Helper func
  const displayMonth = (date: string): void => {
    setDate(date)
  }

  //   const { loading, error, data } = useQuery(EVENT_QUERY, {
  //     variables: { monthInView: `${moment(date).format("MM-YYYY")}` }
  //     });
  //     if (loading) return <h1>⏰</h1>
  //     if (error || !loading) console.log(error)

  //     console.log(data.events) // returns an integer

  //     // Ok, right so this logic is cool as hell.
  //     // 1. Define an array witth the lenth equal to the month in view and
  //     // fill it at index 0. 2. Map over the array with const if it is === the
  //     // position in the array. 3. THEN return the arr with the day in 0 and ...
  //     //the events (the spread operator doesn't push if it is empty!)
  //     //TODO: fill point of the array can start at an index: introduce logic so this = the correct day
  //     const arr = Array(moment(date).daysInMonth()).fill(0).map((_, i) => {
  //     const events = data.events.filter((event: any) => {
  //         return event.date.subStr(0, 1) === (i + 1) //This will only work up to 9
  //     })
  //     return [(i + 1), ...events]
  //     })
  // console.log(arr[1])

  // return <React.Fragment>
  //     {
  //         arr.map((i, index) => {
  //             return <div
  //                 // key={`Day_${(index)}`} //String
  //                 // day={arr[index][0]} //Int
  //                 // EVENT_DETAILS={arr[index][1]} //Object
  //             />
  //         })

  //     }
  // </React.Fragment>
  // }

  return (
    <StyledGrid>
      {headings}
      {props.children}
    </StyledGrid>
  )
}

const EVENT_QUERY = gql`
  query($monthInView: String) {
    eventsByMonth(date: $monthInView) {
      id
      title
    }
  }
`
