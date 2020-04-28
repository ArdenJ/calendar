import styled from 'styled-components'

export const StyledSummary = styled.section`
  box-sizing: border-box;
  width: 100%;
  padding: 2rem;
  border: ${({theme}) => `3px dashed ${theme.accent}`};

  input {
    background: transparent;
    border: none;
  }

  button {
    border: ${({theme}) => `3px solid ${theme.textLight}`};
    border-radius: 4px;
    padding: 0.6rem;
    background: none;
    color: ${({theme}) => theme.textLight}
  }

  svg {
    height: 1rem;
    width: 1rem;
    fill: ${({theme}) => `${theme.textLight} !important`}
  }
`
