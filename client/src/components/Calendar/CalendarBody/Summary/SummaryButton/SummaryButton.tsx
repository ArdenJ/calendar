import React from 'react'

import { useEventContext } from '../../../../../contexts/event.context'

// It's ugly/dumb but, essentially this sets the event date context to an empty string
// Then the summary component will render the welcome message
const SumButt = (props: any) => {
  const { setDate } = useEventContext()
  const click = () => props.click
  const handleClick = () => {
    setDate({ date: '' })
    click()
  }

  return <button onClick={() => handleClick()}>close</button>
}

export default SumButt
