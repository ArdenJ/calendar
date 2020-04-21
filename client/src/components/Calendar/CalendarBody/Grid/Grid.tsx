import React from 'react'
import styled from 'styled-components'

export default function Grid(props: JSX.ElementChildrenAttribute): JSX.Element {
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
  const headings = days.map((i, index) => (
    <div key={index} style={{width: 'calc(100% / 7)'}} className="heading">
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
max-width: 100%;
  .heading {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap; 
    justify-content: space-evenly;
  }
`