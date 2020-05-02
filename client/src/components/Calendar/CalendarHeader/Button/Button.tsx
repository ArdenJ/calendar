import React from 'react'
import styled from 'styled-components'

import {
  useMonthDispatch,
  useMonthState,
  NEXT,
} from '../../../../contexts/date.context'

export default function Button({ click }: any): JSX.Element {
  const dispatch = useMonthDispatch()
  const month = useMonthState()

  const Arrow = () => {
    if (click === NEXT) {
      return <>&#x25b6;</>
    } else {
      return <>&#x25c0;</>
    }
  }

  return (
    <StyledButton
      onClick={() => {
        dispatch({ type: click })
        console.log(month)
      }}>
      <Arrow />
    </StyledButton>
  )
}

const StyledButton = styled.button`
  box-sizing: border-box;
  background: transparent;
  border: none;
  color: ${({theme}) => theme.textLight};
  font-size: 1rem;
  margin: auto;
  padding: 0.1rem;
`

