import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 24px;
    
    @media (max-width: 1280px) {
      font-size: 21px;
    }

    @media (max-width: 1024px) {
      font-size: 20px;
    }

    @media (max-width: 768px) {
      font-size: 19px;
    }

    @media (max-width: 520px) {
      font-size: 17px;
    }
  }

  body {
    width: 100vw;
    height: 100vh;
    background: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.primary};
    font: 400 16px Roboto, sans-serif;
    overflow-y: overlay;
    overflow-x: hidden;
    scroll-behavior: smooth;
  }

  *::-webkit-scrollbar-track {
    background-color: #60606010;
  }

  *::-webkit-scrollbar {
    width: 12px;
    background-color: transparent;
  }

  *::-webkit-scrollbar-thumb
  {
    border-radius: 10px;
    background-color: #00000040;
  }

  #__next {
    height: 100%;
  }
`