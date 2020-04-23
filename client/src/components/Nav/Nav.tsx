import React from 'react'

import { StyledNav, StyledNavButton } from './Nav.styled'

const Nav = ({ toggle }: any): JSX.Element => {
  const [isDarkMode, setIsDarkMode] = toggle()
  return (
    <StyledNav>
          <StyledNavButton onClick={() => setIsDarkMode(!isDarkMode)}>        
            {isDarkMode ? `🌞` : `🌙`}
          </StyledNavButton>
    </StyledNav>
  )
}

export default Nav
