import React from 'react'
import styled from 'styled-components'

import Summary from '../../../Summary/Summary' 

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

  return (
    <Container>
      <div className='card-container'>
        {children}
      </div>
        {openEditor.openIndex.includes(weekNo) 
        ? (
          <div className='summary-container'>
            <Summary click={() => handleClick()} />
          </div>
        ) : React.Fragment}
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
    padding: 0.4rem 0.7rem;
  }
`