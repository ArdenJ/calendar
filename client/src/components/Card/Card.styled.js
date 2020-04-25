import styled from 'styled-components'

export const StyledCard = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-shrink: 4;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 3px solid black;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  text-align: left;

  h1 {
    font-size: 1rem;
    font-weight: 400;
    padding: 0.3rem;
    border-radius: 50%;
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
