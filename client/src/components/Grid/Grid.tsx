import React from 'react'
import styled from 'styled-components'

import { StyledGrid } from './Grid.styled'

export default function Grid(props: JSX.ElementChildrenAttribute): JSX.Element {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const headings = days.map((i, index) => (
    <div key={index} style={{ gridArea: `${i}` }} className="heading">
      {i}
    </div>
  ))
  return (
    // TODO: This might be better achieved with flexbox rather than grid tbh
    <GridContainer>
      <div className='heading'>
        {headings}  
      </div>
      <div className='container'>
        {props.children}
      </div>
    </GridContainer>
  )
}

const GridContainer = styled.div`
  .heading {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap; 
    justify-content: space-evenly;
  }

  /* render cards into columns */
  .container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-evenly;
  background-color: #444;
  width: 100%
  }

  .item {
    width: 14.2%;
  }

  /* force new columns */
  .item:nth-child(n + 7)::after {
    content: "";
    flex-basis: 100%;
    width: 100%;
    height: 30px;
    order: 2;
    background: palevioletred;
  }
`