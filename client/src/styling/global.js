import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`

@import url('href="https://fonts.googleapis.com/css?family=Montserrat:500,700&display=swap"');
    
    * {
        padding: 0;
        margin: 0;
    }
    
    html, body {
        font-family: 'Montserrat', sans-serif;
    }
    *, *::after, *::before {
        box-sizing: border-box;
    }
    body {
        overflow-x: hidden;
        align-items: center;
        color: ${({ theme }) => theme.textLight};
        display: flex;
        height: 100vh;
        justify-content: center;
        text-rendering: optimizeLegibility;
        line-height: 1.5;
        background-color: ${({theme}) => theme.backgroundDark};
    }
    
    h1, h2, h3, h4, h5, h6 {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
        line-height: 1;
    }

    /* GLOBAL CLASSES */
    .hidden {
        display: none;
    }

    .has-events {
        background-color: ${({theme}) => theme.accent2};
    }

    .is-present-day {
        background-color: ${({theme}) => theme.accent2};
    }
`
