import React from 'react'
import { render } from '../../test-utils'
import moment from 'moment'

import {useTheme} from '../../hooks/useTheme'

import Calendar from './Calendar'

const daysInMonth = moment().daysInMonth()
const days = new Array(daysInMonth).map((_, index) => index + 1)



test('loads and displays date cards', () => {

  function Component() {
    const { theme, updateTheme } = useTheme()
    return <Calendar themeHook={[theme, updateTheme]}/>
  }
  
  // @ts-ignore
  const { getByText } = render(<Component />)
  days.forEach(day => {
    const text = getByText(`${day}`)
    expect(text).toBeInTheDOM
  })
})
