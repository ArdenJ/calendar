import styled from 'styled-components'

export const StyledEventList = styled.section`
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
