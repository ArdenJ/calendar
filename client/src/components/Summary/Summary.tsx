import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import crypto from 'crypto'

// Context
import { useEventContext } from '../../contexts/event.context'

// Queries
import {
  QUERY_EVENTS_ON_DAY,
  QUERY_EVENTS_ON_MONTH,
  MUTATION_ADD_EVENT,
  MUTATION_DELETE_EVENT,
} from '../../queries/queries'

// Styling
import { StyledSummary } from './Summary.styled'

// Helper functions
function genId(): string {
  return crypto.randomBytes(10).toString('hex')
}

// At present, when a user click on a day in the calendar body, an event list is returned:
// TODO: Update calendar body when event list is updated
// TODO: Update event list when an event is deleted
// FIXME: Mutation logic should be in the largest possible scope within summary component
//

// Component
const Summary = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  const dateCtx = useEventContext().date.date

  // Create event mutation
  const [createEvent] = useMutation(MUTATION_ADD_EVENT, {
    update(store, { data: { createEVENT } }) {
      const newEvent = [createEVENT]
      const allEventsOnDay: any = store.readQuery({
        query: QUERY_EVENTS_ON_DAY,
        variables: { DATE: dateCtx },
      })
      console.log(allEventsOnDay)
      console.log(newEvent)
      debugger
      store.writeQuery({
        query: QUERY_EVENTS_ON_DAY,
        variables: { DATE: dateCtx },
        data: { eventsByDay: allEventsOnDay.eventsByDay.concat(newEvent) },
      })
    },
    refetchQueries: [
      {
        query: QUERY_EVENTS_ON_MONTH,
        variables: { DATE: dateCtx },
      },
    ],
  })

  // Remove event mutation
  const [removeEvent] = useMutation(MUTATION_DELETE_EVENT, {
    update(store, { data: { deleteEVENT } }) {
      const newEvent = deleteEVENT
      const allEventsOnDay: any = store.readQuery({
        query: QUERY_EVENTS_ON_DAY,
        variables: { DATE: dateCtx },
      })
      console.log(allEventsOnDay)
      console.log(newEvent)
      debugger
      store.writeQuery({
        query: QUERY_EVENTS_ON_DAY,
        variables: { DATE: dateCtx },
        data: {
          eventsByDay: allEventsOnDay.eventsByDay.filter(
            (i: any) => i.id != newEvent.id,
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
  const EventList = () => {
    let { loading, error, data } = useQuery(QUERY_EVENTS_ON_DAY, {
      variables: { DATE: dateCtx },
    })
    if (loading) return <>loading...</>
    if (error || !loading) console.log(error)
    if (data.eventsByDay !== undefined) {
      const events: JSX.Element[] = data.eventsByDay.map(
        (i: any, index: number) => {
          return (
            <h2 key={index}>
              {i.title}
              <RemoveEvent id={i.id} />
            </h2>
          )
        },
      )
      return <>{events}</>
    } else {
      return <></>
    }
  }

  // Input component
  const CreateEvent = () => {
    let input: any
    const [value, setValue] = useState('')

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            createEvent({
              variables: { title: value, date: dateCtx, id: genId() },
            }).then(
              res => console.log(res),
              err => console.log(err),
            )
            input.value = ''
          }}>
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            ref={node => {
              input = node
            }}
          />
          <button type="submit">Add Event</button>
        </form>
      </div>
    )
  }

  // delete component
  const RemoveEvent = (props: any): JSX.Element => {
    return (
      <div>
        <button
          onClick={() => {
            console.log(props.id)
            removeEvent({ variables: { id: props.id } }).then(
              res => console.log(res),
              err => console.log(err),
            )
          }}>
          x
        </button>
      </div>
    )
  }

  // Return summary
  return (
    <StyledSummary>
      <h1>{dateCtx}</h1>
      <EventList />
      <CreateEvent />
      {props.children}
    </StyledSummary>
  )
}

export default Summary
