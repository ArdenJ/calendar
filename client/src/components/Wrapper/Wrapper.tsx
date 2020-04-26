import React from 'react'
import styled from 'styled-components'

const Wrapper = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  return <StyledWrapper>{props.children}</StyledWrapper>
}

export default Wrapper

const StyledWrapper = styled.section`
  box-sizing: border-box;
  display: grid;
  grid-template-areas:
    'header calendar'
    'summary calendar';
  height: 100vh;
  width: 100vw;
  grid-template-columns: 30vw 70vw;
  grid-template-rows: 5rem auto;

  .calendar {
    grid-area: calendar;
  }

  .summary {
    display: grid;
  }
`

