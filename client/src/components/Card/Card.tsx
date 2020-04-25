import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

// Context
import { useEventContext } from '../../contexts/event.context'

// Styling
import { StyledCard } from './Card.styled'

interface IEventObj {
  id: string
  title: string
  date: string
}

interface ICardProps {
  handleOpen: () => void,
  date: string,
  highlight: string,
  isPresentDay: boolean,
  hasEvents: boolean,
}

const Card = (props: ICardProps): JSX.Element => {
  const { date, highlight, handleOpen, isPresentDay, hasEvents } = props 
  const { setDate } = useEventContext()

  const handleClick = () => {
    setDate({ date: date }) 
    handleOpen()
  };

  const HighlightCard = () => {
    return (
      <div className={highlight}>
        {
          hasEvents
          ? <h1 className='has-events'>{moment(date, 'DD-MM-YYYY').format('DD')}</h1>
          : <h1>{moment(date, 'DD-MM-YYYY').format('DD')}</h1>
        }
      </div>
    )
  }
  if (isPresentDay) {
    return (
      <div style={{width: '100%', margin: '2%'}}>
      <StyledCard onClick={() => handleClick()} className='is-present-day'>
        <HighlightCard />
      </StyledCard> 
      </div>
    )
  } else {
    return (
      <div style={{width: '100%', margin: '2%'}}>
      <StyledCard onClick={() => handleClick()}>
        <HighlightCard />
      </StyledCard> 
      </div>
    )
  }
}

export default Card

// Styling 
const Container = styled.div`

`
