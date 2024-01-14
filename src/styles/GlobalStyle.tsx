import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
        
    }
    html{
        font-family: Pretendard;
    }

    input, button {
    outline: none; 
    border: none;
    border-radius: 8px;
    background-color: transparent;
  }

    button{
        cursor: pointer;
    }

    input {
        &:focus {
            outline: none;
        }
    }
    textarea {
    border: none;
    background-color: transparent;
    resize: none;
    outline: none;
  }
 

`;

export default GlobalStyle;
