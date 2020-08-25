import { createGlobalStyle } from 'styled-components';
import background from '../assets/img/background.svg';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html, body, #root {
    min-height:100%;
  }
  body{
    background: #f0f0f5 url(${background}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
  }
  body, input, button {
    font-size: 16px;
    font-family: Arial, Helvetica, sans-serif;
  }
  button {
    cursor: pointer;
  }
  #root {
    max-width: 80%;
    margin: 0 auto;
    padding: 40px 20px;
  }
`;
