import styled from 'styled-components'

export const StyledNav = styled.section`
  box-sizing: border-box;
  margin: auto 0;

  ul {
    display: flex;
    justify-content: space-between;
    list-style: none;
    margin: auto 0;
  }

  li {
    padding: 0 1rem;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.textDark};
  }

  a:active {
    text-decoration: underline;
  }

  .repo {
    font-size: 1rem;
    margin: auto;
    padding: 0.6rem;
    background: transparent;
    border: none;
  }
`

export const StyledNavButton = styled.button`
  box-sizing: border-box;
  font-size: 1.5rem;
  border: 3px solid black;
  font-size: 1rem;
  margin: auto;
  padding: 0.6rem;
  border-radius: 4px;
`
