import styled from 'styled-components'

export const StyledSummary = styled.section`
  box-sizing: border-box;
  margin: 5rem auto auto;
  width: 72%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.shadow};

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
