import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import crypto from 'crypto'

import { useEventContext } from '../../contexts/event.context'

import {
  QUERY_EVENTS_ON_DAY,
  QUERY_EVENTS_ON_MONTH,
  MUTATION_ADD_EVENT,
  MUTATION_DELETE_EVENT,
} from '../../queries/queries'

import { StyledSummary } from './Summary.styled'

function genId(): string {
  return crypto.randomBytes(10).toString('hex')
}

function remove(arr: any[], value: any[]) {
  return arr.filter((i: any) => {
    return i !== value
  })
}

const Summary = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  const dateCtx = useEventContext().date.date

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

  const CreateEvent = () => {
    let input: any
    const [value, setValue] = useState('')

    // TODO: Abstract the cache update...
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

  const RemoveEvent = (props: any): JSX.Element => {
    const [removeEvent] = useMutation(MUTATION_DELETE_EVENT, {
      update(store, { data: { deleteEVENT } }) {
        const newEvent = [deleteEVENT]
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
          data: { eventsByDay: remove(allEventsOnDay.eventsByDay, newEvent) },
        })
      },
      refetchQueries: [
        {
          query: QUERY_EVENTS_ON_MONTH,
          variables: { DATE: dateCtx },
        },
      ],
    })

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
