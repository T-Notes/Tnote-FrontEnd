import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset}
    * {
        box-sizing: border-box;
      
        &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.6rem;
    
  }

  &::-webkit-scrollbar-track {
    height: auto;
  }

  &::-webkit-scrollbar-thumb {
    height: 10rem;
    border-radius: 1.6rem;
    background-color: ${({ theme }) => theme.colors.gray900};
  }

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
