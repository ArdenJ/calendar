import styled from 'styled-components'

export const StyledButton = styled.button`
  box-sizing: border-box;
  background: transparent;
  border: none;
  color: ${({theme}) => theme.textLight};
  font-size: 1rem;
  margin: auto;
  padding: 0.1rem;
`
