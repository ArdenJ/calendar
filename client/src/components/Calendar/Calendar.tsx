import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import moment from 'moment'
import styled from 'styled-components'

import CalendarHeader from './CalendarHeader/CalendarHeader'
import Nav from '../Nav/Nav'
import Summary from '../Summary/Summary'
import Card from '../Card/Card'
import Grid from './CalendarBody/Grid/Grid'

import { getStartDate, getAdditionalDays } from './utils/monthFormat'

import { useDate } from '../../contexts/date.context'

const Calendar = ({ setDarkMode }: any): JSX.Element => {
  console.log('here')
  return (
    <StyledCalendar>
      <div className="header">
        <CalendarHeader />
        <Nav toggle={setDarkMode} />
      </div>
        <CalendarBody />
    </StyledCalendar>
  )
}

export default Calendar

const rowLength = 7;

const CalendarBody = () => {
  const [openEditor, setOpenEditor] = useState({ openIndex: [] });

    // get the month presently in view
      let firstDay = `01-${moment(useDate()).format('MM-YYYY')}` // create date string for first of the month
      const start = moment(getStartDate(firstDay), 'DD-MM-YYYY') // ensure start is correctly formatted // TODO: change this 
      const additionalDays = getAdditionalDays(firstDay) // get the number of additional days (first sunday before start of month)
      const date = moment(useDate()).format('DD-MM-YYYY') // get the present date // TODO: start day could be abstracted from this rather than calling moment twice
  
      // gql query to find event in the month
      let { loading, error, data } = useQuery(QUERY_EVENTS_ON_MONTH, {
        variables: { DATE: date },
      })
      if (loading) return <>loading...</>
      if (error || !loading) console.log(error)
  
      // create an array of 42 cards (6 weeks)
      // spread the events into the cards
      const arr = Array(42)
        .fill(0)
        .map((_, index) => {
          const EVENTS = data.eventsByMonth.filter((i: any) => {
            return (
              moment(i.date, 'DD-MM-YYYY').format('D') ===
              (index + 1 + additionalDays).toString()
            )
          })
          return [index + 1 + additionalDays, [...EVENTS]]
        })

  const dayArray = arr.map((i: any, index: number) => {
    let weekNo = `week${Math.ceil((index + 1) / rowLength)}`;
    let inMonth =  moment(start, 'DD-MM-YYYY')
    .add(index, 'days')
    .format('MMM') === moment(date, 'DD-MM-YYYY').format('MMM')
    ? 'month'
    : 'hidden'
    return (
      <div className={`item ${inMonth}`} style={{display: 'flex', width: 'calc(100% / 7)', minHeight: 'calc(100% / 6)'}}>
      <Day
        key={`Card_${index}`}
        date={moment(start)
          .add(index, 'days')
          .format('DD-MM-YYYY')}
        events={arr[index][1]}
        highlight={inMonth}
        index={index}
        weekNo={weekNo}
        setOpenEditor={setOpenEditor}
        openEditor={openEditor}
      />
      </div>
    );
  });

  const splitDayArray = (arg: any) => {
    let innerArr = arg;
    let memo: any[] = [];
    const slicer = (innerArr: string | any[]) => {
      if (innerArr.length === 0) return memo;
      for (let day of innerArr) {
        if (innerArr.indexOf(day) + 1 === rowLength) {
          let arr = innerArr.slice(0, innerArr.indexOf(day) + 1);
          memo.push(arr);
          slicer(innerArr.slice(innerArr.indexOf(day) + 1));
        }
      }
      return memo;
    };
    return slicer(innerArr);
  };

  const splitArray = splitDayArray(dayArray);

  const weeks = splitArray.map((i, index) => {
    return (
      <Week
        weekNo={`week${index + 1}`}
        setOpenEditor={setOpenEditor}
        openEditor={openEditor}
      >
        {i}
      </Week>
    );
  });

  return (
    <div style={{width: '100%'}}>
      <Grid>
        <WeekContainer>{weeks}</WeekContainer>
      </Grid>
    </div>
  );
}

const WeekContainer = React.memo(props => {
  return <div>{props.children}</div>;
});

const Week = ({ weekNo, children, openEditor, setOpenEditor }:any) => {
  return (
    <div style={{width:'100%', height: '100%'}}>
      <div style={{width:'100%', display:'flex'}}>{children}</div>
      {openEditor.openIndex.includes(weekNo) ? (
        <Editor click={setOpenEditor} />
      ) : (
        React.Fragment
      )}
    </div>
  );
};

const Day = (props: any) => {
  const week = props.weekNo;
  const handleItemClick = (weekNo: any) => {
    const isClosing = props.openEditor.openIndex.includes(
      props.index + 1 && !weekNo
    );
    console.log(isClosing);
    return isClosing
      ? props.setOpenEditor({ openIndex: ["none", 0] })
      : props.setOpenEditor({ openIndex: [weekNo, props.index + 1] });
  };

  return (
    <Card
      handleOpen={() => handleItemClick(week)}
      date={props.date}
      events={props.events}
      highlight={props.highlight}
    />
  );
};

const Editor = (props: { click: (arg0: { openIndex: (string | number)[] }) => void }) => (
  <div style={{ minHeight: "24%", width: "100%" }}>
    <button onClick={() => props.click({ openIndex: ["none", 0] })}>x</button>
    <Summary />
  </div>
);

const QUERY_EVENTS_ON_MONTH = gql`
  query($DATE: String!) {
    eventsByMonth(date: $DATE) {
      id
      title
      date
    }
  }
`

// Styling 
const StyledCalendar = styled.main`
  box-sizing: border-box;
  display: grid;
  grid-template-areas:
    'header'
    'body';
  grid-template-rows: 1fr 8fr;
  min-height: 100%;
  width: 100%;
  padding: 1rem;
  background-color: #fff;
  border: 3px solid black;
  border-radius: 4px;
  box-shadow: 10px 10px paleturquoise;
  transform: translateX(-5px);
  
  .header {
    display: inline-flex;
    justify-content: space-between;
  }
`




