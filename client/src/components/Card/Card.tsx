import React from 'react'

import { StyledCard } from './Card.styled'

export default function Card(props: any): JSX.Element {
  const { events, date, id } = props

  const EventList: any = () => {
    if (events !== undefined && (events.title !== undefined) === true) {
      // const eventArr: JSX.Element[] = events.title.forEach(
      //   (i: string, index: number) => {
      //     return <li key={index}>{i}</li>
      //   },
      // )
      // return <ul>{eventArr}</ul>
      return <li>{events.title}</li>
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
