import styled from 'styled-components'

export const StyledWrapper = styled.section`
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
