import React from 'react'
import styled from 'styled-components'

import Summary from '../Summary/Summary' 

interface IWeekProps {
  weekNo: string,
  openEditor: {openIndex: [string, number]},
  setOpenEditor: React.Dispatch<React.SetStateAction<{
    openIndex: [string, number]
  }>>,
  children: JSX.Element[],
}

const Week = ({weekNo, openEditor, setOpenEditor, children}: IWeekProps):JSX.Element  => {
  function handleClick() { 
    return setOpenEditor({openIndex: ['none', 0]})
  }

  const open = openEditor.openIndex.includes(weekNo)

  return (
    <Container>
      <div className='card-container'>
        {children}
      </div>
      <div className='summary-container'>
        {open 
        ? (
          <div style={{margin: '0.4rem 0.7rem'}}>
            <Summary click={() => handleClick()} />
          </div>
        ) : React.Fragment}
      </div>
    </Container>
  )
}

export default Week

const Container = styled.div`
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  align-items: stretch; 

  .card-container {
    width: 100%;
    display: flex;
  }

  .summary-container {
    min-height: 0;
  }
`