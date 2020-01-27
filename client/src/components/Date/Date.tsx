import React from 'react'

import { StyledDate } from './Date.styled'
import { useMonthState } from '../../contexts/date.context'

export default function Date(): JSX.Element {
  const { date } = useMonthState()
  return <h1>{date}</h1>
}
