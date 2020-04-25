import React from 'react'
import moment from 'moment'

import { useDate } from '../../../../contexts/date.context'

import Card from '../../../Card/Card'

// Day is a container component for the Card components
// TODO: could this be refactored to be include in the 
// Card component itself?

interface IDayProps {
  weekNo: string,
  index: number,
  openEditor: {openIndex: [string, number]},
  setOpenEditor: React.Dispatch<React.SetStateAction<{
    openIndex: [string, number]
  }>>,
  date: string,
  events: any, 
  highlight: string 
}

const Day = (props:IDayProps):JSX.Element => {
  const {
    weekNo,
    index, 
    openEditor, 
    setOpenEditor, 
    date,
    events,
    highlight,
  } = props

  const PRESENT_DATE = moment(useDate()).format('DD-MM-YYYY')

  const handleClick = (weekNo: string) => {
    // @ts-ignore
    const isClosing = openEditor.openIndex.includes(index + 1 && !weekNo)
    return isClosing
    ? setOpenEditor({openIndex: ['none', 0]})
    : setOpenEditor({openIndex: [weekNo, index + 1]})
  }

  const isPresentDay = date === PRESENT_DATE

  const hasEvents = events?.length > 0

  return (
    <Card 
      handleOpen={() => handleClick(weekNo)}
      date={date}
      highlight={highlight}
      isPresentDay={isPresentDay}
      hasEvents={hasEvents}
    />
  )
}

export default Day