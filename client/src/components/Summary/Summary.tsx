import React, { useState, ComponentProps } from 'react'
import gql from 'graphql-tag'
import { onError } from 'apollo-link-error'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { useEventContext } from '../../contexts/event.context'

import { StyledSummary } from './Summary.styled'

const Summary = (props: JSX.ElementChildrenAttribute): JSX.Element => {
  const dateCtx = useEventContext().date.date

  const EventList = () => {
    let { loading, error, data } = useQuery(QUERY_EVENTS_ON_DAY, {
      variables: { DATE: dateCtx },
    })
    if (loading) return <>loading...</>
    if (error || !loading) console.log(error)
    if (data.eventsByDay !== undefined) {
      const events: JSX.Element[] = data.eventsByDay.map((i: any) => {
        return (
          <h2>
            {i.title}
            <RemoveEvent id={i.id} />
          </h2>
        )
      })
      return <>{events}</>
    } else {
      return <></>
    }
  }

  //  TODO: Caching!
  const CreateEvent = () => {
    let input: any
    const [value, setValue] = useState('')
    const [createEvent] = useMutation(MUTATION_ADD_EVENT)

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            createEvent({ variables: { title: value, date: dateCtx } }).then(
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
    const [removeEvent] = useMutation(MUTATION_DELETE_EVENT)

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

const QUERY_EVENTS_ON_DAY = gql`
  query($DATE: String!) {
    eventsByDay(date: $DATE) {
      id
      title
      date
    }
  }
`

const MUTATION_ADD_EVENT = gql`
  mutation($title: String!, $date: String!) {
    createEVENT(title: $title, date: $date) {
      title
      date
    }
  }
`

const MUTATION_DELETE_EVENT = gql`
  mutation($id: String!) {
    deleteEVENT(id: $id) {
      title
    }
  }
`
