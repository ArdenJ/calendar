import styled from 'styled-components'

export const StyledCalendar = styled.main`
  display: grid;
  grid-template-areas:
    'header'
    'body';
  grid-template-rows: 3.4rem auto;
  height: 100%;
  width: 100%;
  padding: 1rem 1.8rem 1.8rem 1.8rem;
  box-shadow: ${({ theme }) => theme.shadow};
  background-color: ${({ theme }) => theme.backgroundLight};

  .header {
    display: inline-flex;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`
