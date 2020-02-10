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
  box-shadow: 0 0 30px 0 rgb(0, 0, 0, 0.6);
  background-color: ${({ theme }) => theme.backgroundLight};

  .header {
    display: inline-flex;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.border};
  }
`
