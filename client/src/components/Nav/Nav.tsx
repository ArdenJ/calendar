import React, { ReactChildren } from 'react'

import { StyledNav, StyledNavButton } from './Nav.styled'

const Nav = ({ toggle }: any): JSX.Element => {
  return (
    <StyledNav>
      <ul>
        <li>
          <button className="repo">
            <a
              href="https://www.github.com/ArdenJ/calendar"
              rel="noopener noreferrer"
              target="_blank">
              Repo
            </a>
          </button>
        </li>
        <li>
          <StyledNavButton onClick={() => toggle()}>Dark Mode</StyledNavButton>
        </li>
      </ul>
    </StyledNav>
  )
}

export default Nav
