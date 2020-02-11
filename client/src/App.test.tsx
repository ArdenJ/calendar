import React from 'react'
import { render, cleanup } from '@testing-library/react'
import App from './App'
import moment from 'moment'

const month = moment()
  .format('MMMM YYYY')
  .toString()

test('it renders the correct month on load', () => {
  const { getByText } = render(<App />)
  const presentMonth = getByText(month)
  expect(presentMonth).toBeInTheDocument()
})

test('the summary displays a welcome message', () => {
  const { getByText } = render(<App />)
  const welcomeMessage = getByText('Hello')
  expect(welcomeMessage).toBeInTheDocument()
})
