import styled from 'styled-components'

export const StyledGrid = styled.section`
  box-sizing: border-box;
  display: grid;
  height: 100%;
  width: 100%;

  grid-template-areas: 'sun mon tue wed thu fri sat';
  grid-template-rows: 2.4rem 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  .heading {
    margin: auto;
  }
`
