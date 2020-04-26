import React from 'react'

import { StyledNav, StyledNavButton } from './Nav.styled'

const Nav = ({ themeHook }: any): JSX.Element => {
  const [theme, updateTheme] = themeHook 
  return (
    <StyledNav>
          <StyledNavButton onClick={() => updateTheme()}>        
            {theme === 'dark' ? `🌞` : `🌙`}
          </StyledNavButton>
    </StyledNav>
  )
}

export default Nav
