import styled from 'styled-components'

export const StyledEventList = styled.section`
  box-sizing: border-box;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;

  .event {
    padding: 0.5rem 0;
    border-bottom: 3px dashed lightseagreen;
  }

  .event,
  .create-event {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;

    p, input[type=text] {
      font-size: 1.4rem;
      font-weight: 700;
      color: #000;
      line-height: 1;
    }
  }

  .create-event-button {
    margin-top: 1rem;
    font-size: 1.2rem;
    font-weight: 700;
  }

  .event-buttons {
    width: 14%;
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    justify-content: space-between;
    box-shadow: none;
  }
`
