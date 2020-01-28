import React from 'react'

import { StyledGrid } from './Grid.styled'

export default function Grid(props: JSX.ElementChildrenAttribute): JSX.Element {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const headings = days.map((i, index) => (
    <div key={index} style={{ gridArea: `${i}` }} className="heading">
      {i}
    </div>
  ))
  return (
    <StyledGrid>
      {headings}
      {props.children}
    </StyledGrid>
  )
}
