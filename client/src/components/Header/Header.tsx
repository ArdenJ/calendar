import React, { ReactChildren } from 'react'

import { StyledHeader } from './Header.styled'
import Icon from './Icon'

const Header = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  return (
    <StyledHeader>
      <Icon />
      <h1>{props.children}</h1>
    </StyledHeader>
  )
}

export default Header
