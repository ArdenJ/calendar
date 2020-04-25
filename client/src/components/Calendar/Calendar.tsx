import React from 'react'
import styled from 'styled-components'

import CalendarHeader from './CalendarHeader/CalendarHeader'
import CalendarBody from './CalendarBody/CalendarBody' 

const Calendar = ({ setDarkMode }: any): JSX.Element => {
  console.log('here')
  return (
    <Container>
      <div className="header">
        <CalendarHeader toggle={setDarkMode}/> 
      </div>
      <CalendarBody />
    </Container>
  )
}

export default Calendar

// Styling 
const Container = styled.main`
  box-sizing: border-box;
  display: grid;
  grid-template-areas:
    'header'
    'body';
  grid-template-rows: 1fr 8fr;
  min-height: 100%;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  border: 3px solid black;
  border-radius: 4px;
  box-shadow: 10px 10px paleturquoise;
  transform: translateX(-5px);

  .header {
    display: flex;
    justify-content: space-between;
  }
`




