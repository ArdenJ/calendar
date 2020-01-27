import styled from 'styled-components'

export const StyledGrid = styled.section`
  box-sizing: border-box;
  display: grid;
  height: 90vh;
  width: 90vw;
  box-shadow: 0 0 2px 0 black;
  border-radius: 8px;
  padding: 1rem;

  grid-template-areas: 'sun mon tue wed thu fri sat';
  grid-template-rows: 2.4rem 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  .heading {
    margin: auto;
    background-color: cornsilk;
  }
`
