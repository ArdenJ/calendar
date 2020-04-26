import React, { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import crypto from 'crypto'
import moment from 'moment'

// Context
import { useDate } from '../../../contexts/date.context'

// Queries
import {
  QUERY_EVENT,
  QUERY_EVENTS_ON_DAY,
  QUERY_EVENTS_ON_MONTH,
  MUTATION_ADD_EVENT,
  MUTATION_UPDATE_EVENT,
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
  let EVENT_ID: string // TODO: Not a fan of relying on mutability

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

  // update event mutation
  const [updateEvent] = useMutation(MUTATION_UPDATE_EVENT, {
    update(store, { data: { updateEVENT } }) {
      const newEvent = [updateEVENT]
      const allEventsOnMonth: any = readStore(store)
      store.writeQuery({
        query: QUERY_EVENTS_ON_MONTH,
        variables: { DATE: monthCtx },
        data: {
          eventsByMonth: allEventsOnMonth.eventsByMonth.filter(
            (i: any) => i.id !== EVENT_ID
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
    const [eventUpdate, setEventUpdate] = useState({
      action: 'button'
    })

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
  const CreateEvent = ({eventHook}: any) => {
    const [eventUpdate, setEventUpdate] = eventHook
    const ref: any = useRef()

    // child component to avoids hook being called conditionally 
    const EventAction = ({type, inputID = genId(), val = ''}:any) => {
      console.log('from event action: ', type, val)
      useEffect(() => {
        return ref.current.focus()
      }, [createEvent])

      const [value, setValue] = useState(val)
      


      const handleSubmit = (type:{}, id:string, value:string):any => {
        console.log('on submit: ', type)
        type === 'create' 
        ? (
          createEvent({
            variables: { title: value, date: dateCtx, id: id }
          }).then(
            res => console.log(res),
            err => console.log(err),
          )
        ) : (
          updateEvent({
            variables: { title: value, date: dateCtx, id: id }
          }).then(
            res => console.log(res),
            err => console.log(err),
          )
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
            EVENT_ID = props.id
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
