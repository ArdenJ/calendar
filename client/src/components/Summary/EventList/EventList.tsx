import React, { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import crypto from 'crypto'
import moment from 'moment'

// Context
import { useDate } from '../../../contexts/date.context'

// Queries
import {
  QUERY_EVENTS_ON_DAY,
  QUERY_EVENTS_ON_MONTH,
  MUTATION_ADD_EVENT,
  MUTATION_DELETE_EVENT,
} from '../../../queries/queries'

// Styling
import { StyledEventList } from './EventList.styled'

// Assets
import { Cross, Edit } from './icons/SVGS'

// Helper functions
function genId(): string {
  return crypto.randomBytes(10).toString('hex')
}

// Component
const EventList = (props: any): JSX.Element => {
  // FIXME: .date.date is dumb
  const dateCtx = props.ctx
  const monthCtx = moment(useDate(), 'YYYY-MM-DD')
    .format('DD-MM-YYYY')
    .toString()
  let EVENT_ID: string // TODO: Not a fan of relying on mutability, but useState was lagging behind on update... worth fixing? (useEffect)

  function readStore(a: any) {
    return a.readQuery({
      query: QUERY_EVENTS_ON_MONTH,
      variables: { DATE: monthCtx },
    })
  }

  // Create event mutation
  const [createEvent] = useMutation(MUTATION_ADD_EVENT, {
    update(store, { data: { createEVENT } }) {
      const newEvent = [createEVENT]
      const allEventsOnMonth: any = readStore(store)
      store.writeQuery({
        query: QUERY_EVENTS_ON_MONTH,
        variables: { DATE: monthCtx },
        data: {
          eventsByMonth: allEventsOnMonth.eventsByMonth.concat(newEvent),
        },
      })
    },
    refetchQueries: [
      {
        query: QUERY_EVENTS_ON_DAY,
        variables: {
          DATE: dateCtx,
        },
      },
    ],
  })

  // Remove event mutation
  const [removeEvent] = useMutation(MUTATION_DELETE_EVENT, {
    update(store) {
      const allEventsOnMonth: any = readStore(store)
      store.writeQuery({
        query: QUERY_EVENTS_ON_MONTH,
        variables: { DATE: monthCtx },
        data: {
          eventsByMonth: allEventsOnMonth.eventsByMonth.filter(
            (i: any) => i.id !== EVENT_ID,
          ),
        },
      })
    },
    refetchQueries: [
      {
        query: QUERY_EVENTS_ON_DAY,
        variables: { DATE: dateCtx },
      },
    ],
  })

  // Event list
  const Events = () => {
    let { loading, error, data } = useQuery(QUERY_EVENTS_ON_DAY, {
      variables: { DATE: dateCtx },
    })
    if (loading) {
      return <>loading...</>
    }
    if (error || !loading) console.log(error)
    if (data.eventsByDay !== undefined) {
      const events: JSX.Element[] = data.eventsByDay.map(
        (i: any, index: number) => {
          return (
            <div key={index} className="event">
              <div style={{display: 'flex', alignItems: 'center'}}>
                <p>
                  {i.title}
                </p>
              </div>
              <div className="event-buttons">
                <UpdateEvent id={i.id} className="summaryUIButton" />
                <RemoveEvent id={i.id} className="summaryUIButton" />
              </div>
            </div>
          )
        },
      )
      return (
        <>
          <div>
            {events}
          </div>
          <CreateEvent />
        </>
      )
    } else {
      return <></>
    }
  }

  // Input component
  const CreateEvent = () => {
    const [showing, setShowing] = useState(false)
    const [value, setValue] = useState('')
    const ref: any = useRef()

    // child component to avoids hook being called conditionally
    const NewEvent = () => {
      useEffect(() => {
        return ref.current.focus()
      }, [createEvent])

      return (
        <form
          className="create-event"
          onSubmit={e => {
            e.preventDefault()
            createEvent({
              variables: { title: value, date: dateCtx, id: genId() },
            }).then(
              res => console.log(res),
              err => console.log(err),
            )
            ref.current.value = ''
          }}>
          <input
            id="eventInput"
            className='event-input'
            type='text'
            value={value}
            onChange={e => setValue(e.target.value)}
            ref={ref}
          />
          <button type="submit">Add Event</button>
        </form>
      )
    }

    // Create event button component
    if (dateCtx !== '') {
      if (showing === true) {
        return (
          <div>
            <NewEvent />
          </div>
        )
      } else {
        return (
          <button className='create-event-button'
            onClick={() => {
              setShowing(!showing)
            }}>
            create event
          </button>
        )
      }
    } else return <></>
  }

  // delete button component
  const RemoveEvent = (props: any): JSX.Element => {
    return (
      <div>
        <button
          onClick={() => {
            console.log(props.id)
            EVENT_ID = props.id
            removeEvent({ variables: { id: props.id } }).then(
              res => console.log(res),
              err => console.log(err),
            )
          }}>
          <Cross />
        </button>
      </div>
    )
  }

  // update button component
  const UpdateEvent = (props: any): JSX.Element => {
    return (
      <div>
        <button
          onClick={() => {
            console.log(props.id)
            EVENT_ID = props.id
            removeEvent({ variables: { id: props.id } }).then(
              res => console.log(res),
              err => console.log(err),
            )
          }}>
          <Edit />
        </button>
      </div>
    )
  }

  // Return summary
  return (
    <StyledEventList>
      <Events />
    </StyledEventList>
  )
}

export default EventList
