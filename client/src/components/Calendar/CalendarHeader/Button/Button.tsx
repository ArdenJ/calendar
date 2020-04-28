import React from 'react'
import {
  useMonthDispatch,
  useMonthState,
  NEXT,
  BACK
} from '../../../../contexts/date.context'

import { StyledButton } from './Button.styled'

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
