import React, { ReactChildren } from 'react'

import { StyledWrapper } from './Wrapper.styled'

const Wrapper = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  return <StyledWrapper>{props.children}</StyledWrapper>
}

export default Wrapper
