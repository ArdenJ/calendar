import styled from 'styled-components'

export const StyledHeader = styled.header`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  margin: auto;

  svg {
    margin-right: 1rem;
    fill: ${({ theme }) => theme.accent};
  }

  h1 {
    color: ${({ theme }) => theme.accent};
    font-size: 2.2rem;
    text-transform: uppercase;
  }
`
