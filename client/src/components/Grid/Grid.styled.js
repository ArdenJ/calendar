import styled from 'styled-components'

export const StyledGrid = styled.section`
  box-sizing: border-box;
  display: grid;
  height: 100%;
  width: 100%;

  /* TODO: Make this a grid of 2 rows the first row
  (headings) should be divided into a further grin in 
  7 columns. The card rows should then be done w/ 
  flexbox.*/
  /* This would mean further rows inserted for an 'editing' component can be inserted */
  grid-template-areas: 'sun mon tue wed thu fri sat';
  grid-template-rows: 2.4rem 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr;

  .heading {
    margin: auto;
  }
`
