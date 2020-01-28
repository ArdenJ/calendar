import React, { ReactChildren } from 'react'

import { StyledSummary } from './Summary.styled'

const Summary = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  return <StyledSummary>{props.children}</StyledSummary>
}

export default Summary
