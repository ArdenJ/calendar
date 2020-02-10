import styled from 'styled-components'

export const StyledCalendarHeader = styled.main`
  margin: auto 0;
  padding: 0.4rem 1rem;
  margin-bottom: 0.8rem;
  box-shadow: 0 0 2px 0 ${({ theme }) => theme.shadow};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;

  .date {
    padding-right: 0.8rem;
    border-right: 1px solid ${({ theme }) => theme.border};
    margin: auto;
  }
  .buttons {
    padding-left: 0.8rem;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }
`
