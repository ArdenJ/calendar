import React, { ReactChildren } from 'react'

import { StyledNav } from './Nav.styled'

const Nav = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  return <StyledNav>{props.children}</StyledNav>
}

export default Nav
