import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useEventContext } from '../../contexts/event.context'

import { StyledCard } from './Card.styled'

interface IEventObj {
  id: string
  title: string
  date: string
}

export default function Card(props: any): JSX.Element {
  const { events, date } = props
  const { setDate } = useEventContext()

  const EventList: React.FC = () => {
    if (events !== undefined && events.length > 0 === true) {
      const eventArr: JSX.Element[] = events.map(
        (i: IEventObj, index: number) => {
          return <li key={index}>{i.title}</li>
        },
      )
      debugger
      return <ul>{eventArr}</ul>
    } else {
      return <React.Fragment />
    }
  }
  return (
    <StyledCard onClick={() => setDate({ date: date })}>
      <>{date}</>
      <br />
      <EventList />
    </StyledCard>
  )
}

const QUERY_EVENTS_ON_DAY = gql`
  query($DATE: String!) {
    eventsByDay(date: $DATE) {
      id
      title
      date
    }
  }
`
