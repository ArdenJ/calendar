import React from 'react'

import { StyledCard } from './Card.styled'

export default function Card(props: JSX.ElementChildrenAttribute): JSX.Element {
  return <StyledCard>{props.children}</StyledCard>
}
