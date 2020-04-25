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
      <div style={{width:'100%', display: 'flex'}}>
        {children}
      </div>
      {openEditor.openIndex.includes(weekNo) 
      // this may break ⬇️
      ? <Summary click={() => handleClick()} />
      : React.Fragment}
    </Container>
  )
}

export default Week

const Container = styled.div`
  width: 100%; 
  display: flex; 
  flex-direction: column; 
  align-items: stretch; 
  padding-bottom: 0.2rem;
`