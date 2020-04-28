import styled from 'styled-components'

export const StyledNav = styled.section`
  box-sizing: border-box;
  margin: auto 0;
`

export const StyledNavButton = styled.button`
  box-sizing: border-box;
  font-size: 1.5rem;
  background: none;
  border: ${({theme}) => `3px solid ${theme.border} `};
  background-color: ${({theme}) => theme.accent2};
  font-size: 1rem;
  margin: auto;
  padding: 0.6rem;
  border-radius: 4px;
`
