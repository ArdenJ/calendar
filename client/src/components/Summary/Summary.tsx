import React, { useState } from 'react'
import gql from 'graphql-tag'
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
        return <h2>{i.title}</h2>
      })
      return <>{events}</>
    } else {
      return <></>
    }
  }

  // FIXME: Network error: Response not successful: Received status code 400
  // TODO: Implement better error handling, and solve above error
  //  TODO: Caching!
  const CreateEvent = () => {
    const [createEvent] = useMutation(MUTATION_ADD_EVENT)
    const [value, setValue] = useState('')
    let input: any

    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault()
            console.log(input.value, dateCtx)
            createEvent({ variables: { title: input.value, date: dateCtx } })
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
  mutation($TITLE: String!, $DATE: String!) {
    createEVENT(title: $TITLE, date: $DATE) {
      title
      date
    }
  }
`
