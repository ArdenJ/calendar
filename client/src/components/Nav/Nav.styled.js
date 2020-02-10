import styled from 'styled-components'

export const StyledNav = styled.section`
  box-sizing: border-box;
  margin: auto 0;

  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
  }

  li {
    padding: 0.8rem 1rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.textDark};
  }

  a:active {
    text-decoration: underline;
  }
`

export const StyledNavButton = styled.button`
  box-sizing: border-box;
  font-size: 1.5rem;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.textLight};
  font-size: 1rem;
  margin: auto;
`
