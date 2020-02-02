import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'

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
          const title =
            i.title.length > 10 ? `${i.title.substr(0, 17)}...` : i.title
          return (
            <li key={index}>
              <div className="container" />
              {title}
            </li>
          )
        },
      )

      return <ul>{eventArr}</ul>
    } else {
      return <React.Fragment />
    }
  }
  return (
    <StyledCard onClick={() => setDate({ date: date })}>
      <h1>{moment(date, 'DD-MM-YYYY').format('DD')}</h1>
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
