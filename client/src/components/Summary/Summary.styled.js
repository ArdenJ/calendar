import styled from 'styled-components'

export const StyledSummary = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  border: 3px dashed palevioletred;

  .heading {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between !important;
    flex-wrap: nowrap;
  }

  input {
    background: transparent;
    border: none;
  }

  button {
    border: 3px solid black;
    border-radius: 4px;
    padding: 0.6rem;
  }
`
