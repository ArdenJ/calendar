import styled from 'styled-components'

export const StyledCard = styled.button`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  border: 0;
  box-shadow: 0 0 1px 0 rgb(0, 0, 0, 0.2);
  background: transparent;
  padding: 0.8rem;
  margin: auto;
  text-align: left;

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

    /* background-image: linear-gradient(to left, white, rgb(0, 0, 0, 0) 27%); */
  }
`
