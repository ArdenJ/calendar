import React, { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import crypto from 'crypto'
import moment from 'moment'
import styled from 'styled-components'

// Context
import { useDate } from '../../../../../contexts/date.context'

// Queries
import {
  QUERY_EVENTS_ON_DAY,
  QUERY_EVENTS_ON_MONTH,
  MUTATION_ADD_EVENT,
  MUTATION_UPDATE_EVENT,
  MUTATION_DELETE_EVENT,
} from '../../../../../queries/queries'

// Assets
import { Cross, Edit } from './assets/SVGS'

interface IEvent {
  id: string, 
  title: string, 
  date: string, 
  __typename: "EVENT"
}

// Helper functions
function genId(): string {
  return crypto.randomBytes(10).toString('hex')
}

// FIXME: There is no separation of concerns in this component 
// and nothing that would even begin to tell you what is happening 
// when things go wrong. 😫😫😫 it's just bad.

// Component
const EventList = (props: {ctx: string}): JSX.Element => {
  const dateCtx = props.ctx
  const monthCtx = moment(useDate(), 'YYYY-MM-DD')
    .format('DD-MM-YYYY')
    .toString()

  const [EVENT_ID, setEVENT_ID] = useState('')

  function readStore(store: any) {
    return store.readQuery({
      query: QUERY_EVENTS_ON_MONTH,
      variables: { DATE: monthCtx },
    })
  }

  // Create event mutation
  const [createEvent] = useMutation(MUTATION_ADD_EVENT, {
    update(store, { data: { createEVENT } }) {
      const newEvent = [createEVENT]
      const allEventsOnMonth: {eventsByMonth: any[]} = readStore(store)
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

  // update event mutation
  const [updateEvent] = useMutation(MUTATION_UPDATE_EVENT, {
    update(store, { data: { updateEVENT } }) {
      const newEvent = [updateEVENT]
      const allEventsOnMonth: {eventsByMonth: any[]} = readStore(store)
      store.writeQuery({
        query: QUERY_EVENTS_ON_MONTH,
        variables: { DATE: monthCtx },
        data: {
          eventsByMonth: allEventsOnMonth.eventsByMonth.filter(
            (i: IEvent) => i.id !== EVENT_ID
          ).concat(newEvent)
        }
      })
    },
    refetchQueries: [
      {
        query: QUERY_EVENTS_ON_DAY,
        variables: {
          DATE: dateCtx,
        },
      }
    ]
  })

  // Remove event mutation
  const [removeEvent] = useMutation(MUTATION_DELETE_EVENT, {
    update(store) {
      const allEventsOnMonth: {eventsByMonth: any[]} = readStore(store)
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
    const [eventUpdate, setEventUpdate] = useState({
      action: 'button'
    })

    let { loading, error, data } = useQuery(QUERY_EVENTS_ON_DAY, {
      variables: { DATE: dateCtx },
    })
    if (loading) return <>{'loading...'}</>
    if (error) {
      console.error(error)
      return <>{'Sorry pal, something went wrong'}</>
    }
    if (data.eventsByDay !== undefined) {
      const events: JSX.Element[] = data.eventsByDay.map(
        (i: IEvent, index: number) => {
          return (
            <div key={`event_${index}`} className="event" data-id={i.id}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <p>
                  {i.title}
                </p>
              </div>
              <div className="event-buttons">
                <UpdateEvent id={i.id} title={i.title} className="summaryUIButton" setEventUpdate={setEventUpdate}/>
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
          {/* 
          // @ts-ignore */} 
          <CreateEvent eventHook={[eventUpdate, setEventUpdate]}/>
        </>
      )
    } else {
      return <></>
    }
  }

  // Input component
  // FIXME: This gets used in a variety of ways and lacks consistency 
  const CreateEvent = ({eventHook}: any) => {
    const [eventUpdate, setEventUpdate] = eventHook
    const ref: any = useRef()

    // child component to avoid hook being called conditionally 
    // TODO: type type should be type of "create" | "update" but throws error at compile
    const EventAction = ({type, inputID = genId(), val = ''}:any) => {
      useEffect(() => {
        return ref.current.focus()
      })

      const [value, setValue] = useState(val)
      
      const handleSubmit = (type:{}, id:string, value:string) => {
        type === 'create' 
        ? (
          createEvent({
            variables: { title: value, date: dateCtx, id: id }
          })
        ) : (
          updateEvent({
            variables: { title: value, date: dateCtx, id: id }
          })
        )
      }

      return (
        <form
          className="create-event"
          onSubmit={e => {
            e.preventDefault()
            handleSubmit(type, inputID, value)
            ref.current.value = val
          }}>
          <input
            id="eventInput"
            className='event-input'
            type='text'
            value={value}
            // @ts-ignore
            onChange={e => setValue(e.target.value)}
            ref={ref}
          />
          <button type="submit">{type === 'create' ? 'Add Event' : 'Update'}</button>
        </form>
      )
    }

    if (dateCtx !== '') {

      const action = eventUpdate?.action

      switch (action) {
        case 'button': 
          return (
            <div>
              <button className='create-event-button' onClick={
                () => {setEventUpdate({action: 'new'})}
              }>
                create event
              </button>
            </div>
          )
        case 'update': 
          return (
          <div>
            <EventAction type={'update'} inputID={EVENT_ID} val={eventUpdate.title}/>
          </div>
          )
        case 'new':
          return (
            <div>
              <EventAction type={'create'} />
            </div>
          )
        default: 
          return <div>{`unhandled action: ${action}`}</div>
      }
    } else {
      return React.Fragment
    }  
  } 

  // delete button component
  const RemoveEvent = (props: {id: string, className: string}): JSX.Element => {
    return (
      <div>
        <button
          onClick={() => {
            setEVENT_ID(props.id)
            removeEvent({ variables: { id: props.id } })
          }}>
          <Cross />
        </button>
      </div>
    )
  }

  interface IArg {action: string, title: string}

  // update button component
  const UpdateEvent = (props: {
    className: string, 
    id: string, 
    setEventUpdate: (arg0: IArg) => void, 
    title: string}): JSX.Element => {
    return (
      <div>
        <button
          onClick={() => {
            setEVENT_ID(props.id)
            props.setEventUpdate({
              action: 'update',
              title: props.title
            })
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

// Styling 
const StyledEventList = styled.section`
  box-sizing: border-box;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  .event {
    padding: 0.5rem 0;
  border-bottom: ${({theme}) => `3px dashed ${theme.accent2}`};
  }

  .event,
  .create-event {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;

    p, input[type=text] {
      max-width: 62%;
      font-size: 1.4rem;
      font-weight: 700;
      color: ${({theme}) => theme.textLight};
      line-height: 1;
    }
  }

  .create-event {
    margin-top: 1rem;
  }

  .create-event-button {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .event-buttons {
    width: 34%;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: space-between;
    box-shadow: none;
  }
`