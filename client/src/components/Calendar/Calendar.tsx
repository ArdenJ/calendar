import React from 'react'
import styled from 'styled-components'

import CalendarHeader from './CalendarHeader/CalendarHeader'
import CalendarBody from './CalendarBody/CalendarBody' 

const Calendar = ({ themeHook }: any): JSX.Element => {
  console.log('here')
  return (
    <Container>
      <div className="header">
        <CalendarHeader themeHook={themeHook}/> 
      </div>
      <div className='body'>
        <CalendarBody />
      </div>
    </Container>
  )
}

export default Calendar

// Styling 
const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: ${({theme}) => theme.backgroundLight};
  border: ${({theme}) => `3px solid ${theme.border}`};
  border-radius: 4px;
  box-shadow: ${({theme}) => `10px 10px ${theme.accent}`};
  transform: translateX(-5px);

  .header, .body {
    display: flex;
    justify-content: space-between;
  }

  .body {
    align-items: stretch;
  }
`
