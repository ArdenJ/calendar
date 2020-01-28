import React from 'react'
import moment from 'moment'

import { StyledDate } from './Date.styled'
import { useDate } from '../../contexts/date.context'

export default function Date(): JSX.Element {
  const date = moment(useDate()).format('MMMM YYYY')
  return <>{date}</>
}
