import React from 'react'

import { useEventContext } from '../../../contexts/event.context'

// It's ugly/dumb but, essentially this sets the event date context to an empty string
// Then the summary component will render the welcome message
const SumButt = () => {
  const { setDate } = useEventContext()

  return <button onClick={() => setDate({ date: '' })}>close</button>
}

export default SumButt
