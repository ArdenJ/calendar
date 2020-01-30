import React from 'react'

import { StyledCard } from './Card.styled'

export default function Card(props: any): JSX.Element {
  return (
    <StyledCard>
      <>{props.date}</>
      <br />
      <>{props.events ? props.events : `nout`}</>
    </StyledCard>
  )
}
