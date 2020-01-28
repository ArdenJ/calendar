import React, { ReactChildren } from 'react'

import { StyledHeader } from './Header.styled'

const Header = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  return <StyledHeader>{props.children}</StyledHeader>
}

export default Header
