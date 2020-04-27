import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

// Context
import { useEventContext } from '../../contexts/event.context'

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
const StyledCard = styled.button`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  width: 100%;
  border: ${({theme}) => `3px solid ${theme.border}`};
  color: ${({theme}) => theme.textLight};
  background-color: transparent;
  align-items: center;
  justify-content: center;
  text-align: left;

  h1 {
    font-size: 1rem;
    font-weight: 400;
    padding: 0.3rem;
    border-radius: 50%;
  }
  ul {
    list-style: none;
    width: 100%;
  }
  li {
    position: relative;
    overflow-x: hidden;
  }
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow: hidden;
  }
`
