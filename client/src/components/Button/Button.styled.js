import styled from 'styled-components'

export const StyledButton = styled.button`
  box-sizing: border-box;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
  margin: auto;
  padding: 0.1rem;
`
