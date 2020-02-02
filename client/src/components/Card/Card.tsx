import React from 'react'

import { StyledCard } from './Card.styled'

interface IEventObj {
  id: string
  title: string
  date: string
}

export default function Card(props: any): JSX.Element {
  const { events, date } = props

  const EventList: React.FC = () => {
    if (events !== undefined && events.length > 0 === true) {
      const eventArr: JSX.Element[] = events.map(
        (i: IEventObj, index: number) => {
          return <li key={index}>{i.title}</li>
        },
      )
      debugger
      return <ul>{eventArr}</ul>
      // return <li>{events.title}</li>
    } else {
      return <React.Fragment />
    }
  }
  return (
    <StyledCard>
      <>{date}</>
      <br />
      <EventList />
    </StyledCard>
  )
}
