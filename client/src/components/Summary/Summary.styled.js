import styled from 'styled-components'

export const StyledSummary = styled.section`
  box-sizing: border-box;
  margin: 5rem auto auto;
  width: 72%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.backgroundLight};
  border-radius: 12px;
  box-shadow: 0 0 20px 1px ${({ theme }) => theme.shadow};

  .heading {
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: space-between;
  }
`
