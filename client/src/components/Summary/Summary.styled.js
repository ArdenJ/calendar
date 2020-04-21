import styled from 'styled-components'

export const StyledSummary = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;

  .heading {
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: space-between;
  }

  input {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.textLight};
  }

  button {
    border: none;
    border-radius: 4px;
    padding: 0.6rem;
    color: ${({ theme }) => theme.textLight};
    background-color: ${({ theme }) => theme.backgroundLight};
    box-shadow: ${({ theme }) => theme.shadow};
  }
`
