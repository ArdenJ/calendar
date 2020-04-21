import React from 'react'
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

const Card = (props: any): JSX.Element => {
  const { events, date, highlight, handleOpen } = props 
  const { setDate } = useEventContext()

  const handleClick = () => {
    setDate({ date: date }) 
    handleOpen()
  };

  const EventList: React.FC = () => {
    if (events !== undefined && events.length > 0 === true) {
      const eventArr: JSX.Element[] = events.map(
        (i: IEventObj, index: number) => {
          const title =
            i.title.length >= 20 ? `${i.title.substr(0, 17)}...` : i.title
          return (
            <li key={index}>
              <div className="container" />
              {title}
            </li>
          )
        },
      )
      return <ul>{eventArr}</ul>
    } else {
      return <React.Fragment />
    }
  }
  return (
    <StyledCard
      onClick={() => handleClick()}>
      {/* onClick={() => setDate({ date: date })}> */} 
      <div className={highlight}>
        <h1>{moment(date, 'DD-MM-YYYY').format('DD')}</h1>
        <EventList />
      </div>
    </StyledCard>
  )
}

export default Card
