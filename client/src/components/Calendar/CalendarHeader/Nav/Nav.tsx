import React from 'react'

import { useMonthDispatch, RESET } from '../../contexts/date.context'

import { StyledNav, StyledNavButton } from './Nav.styled'

const Nav = ({ themeHook }: any): JSX.Element => {
  const [theme, updateTheme] = themeHook 
  const dispatch = useMonthDispatch()
  return (
    <StyledNav>
          <StyledNavButton onClick={() => dispatch(
            { type: RESET }
          )}>
            <span role='image'>🏡</span>
          </StyledNavButton>
          <StyledNavButton onClick={() => updateTheme()}>        
            {theme === 'dark' ? `🌞` : `🌙`}
          </StyledNavButton>
    </StyledNav>
  )
}

export default Nav
