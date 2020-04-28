import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import App from './App'
import moment from 'moment'

const month = moment()
  .format(`MMM 'YY`)
  .toString()

test('it renders the correct month on load', () => {
  const { getByText } = render(<App />)
  const presentMonth = getByText(month)
  expect(presentMonth).toBeInTheDocument()
})


