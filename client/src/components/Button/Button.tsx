import React from 'react'
import { useMonthDispatch, useMonthState } from '../../contexts/date.context'

import { StyledButton } from './Button.styled'

export default function Button({ children, click }: any): JSX.Element {
  const dispatch = useMonthDispatch()
  const month = useMonthState()
  return (
    <StyledButton
      onClick={() => {
        dispatch({ type: click })
        console.log(month)
      }}>
      {children}
    </StyledButton>
  )
}
