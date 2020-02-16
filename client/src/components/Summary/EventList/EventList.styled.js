import styled from 'styled-components'

export const StyledEventList = styled.section`
  box-sizing: border-box;
  width: 100%;

  margin-top: 1rem;

  .event,
  .createEvent {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: nowrap;
  }

  .eventButtons {
    display: flex;
    flex-direction: row;
    flex-wrap: no-wrap;
    box-shadow: none;
  }

  svg {
    fill: ${({ theme }) => theme.textLight};
    height: 1rem;
    width: 1rem;
  }
`
