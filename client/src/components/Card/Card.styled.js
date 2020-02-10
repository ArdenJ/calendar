import styled from 'styled-components'

export const StyledCard = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 0;
  box-shadow: 0 0 1px 0 ${({ theme }) => theme.shadow};
  background-color: transparent;
  padding: 0.8rem;
  margin: auto;
  text-align: left;
  color: ${({ theme }) => theme.textDark};

  /* FIXME: Confusing: all buttons in the correct month have the classname below but the background color won't update!? */
  .month {
    background-color: red !important;
  }

  h1 {
    font-size: 1rem;
    font-weight: 400;
    margin-bottom: 0.2rem;
  }
  ul {
    list-style: none;
    width: 100%;
  }
  li {
    position: relative;
    overflow-x: hidden;
  }
  .container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    overflow: hidden;
  }
`
