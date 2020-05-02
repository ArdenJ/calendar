import React from 'react'
import styled from 'styled-components'

import { useMonthDispatch, RESET } from '../../../../contexts/date.context'

const Nav = ({ themeHook }: any): JSX.Element => {
  const [theme, updateTheme] = themeHook 
  const dispatch = useMonthDispatch()
  return (
    <StyledNav>
          <StyledNavButton onClick={() => dispatch(
            { type: RESET }
          )}>
            <span role='img' aria-label="return to present month button, house emoji">🏡</span>
          </StyledNavButton>
          <StyledNavButton onClick={() => updateTheme()}>        
            {theme === 'dark' 
            ? <span role='img' aria-label="set light mode button, sun emoji">🌞</span> 
            : <span role='img' aria-label="set dark mode button, moon emoji">🌙</span>}
          </StyledNavButton>
    </StyledNav>
  )
}

export default Nav

export const StyledNav = styled.section`
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
  margin-left: 0.3rem;
`
