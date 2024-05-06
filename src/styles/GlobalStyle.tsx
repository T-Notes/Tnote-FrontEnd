import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`

    ${reset}
    * {
        box-sizing: border-box;
      
        &::-webkit-scrollbar {
    background-color: transparent;
    width: 0.5rem;
    
  }
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  &::-webkit-scrollbar-track {
    height: auto;
  }

  &::-webkit-scrollbar-thumb {
    height: 3.2rem;
    border-radius: 4px;
    background-color: ${({ theme }) => theme.colors.gray900};
  }

    }
    html{
        font-family: Pretendard;
    }

    input, button {
    outline: none; 
    border: none;
    /* border-radius: 8px; */
    background-color: transparent;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

    button{
        cursor: pointer;
    }

    input {
        &:focus {
            outline: none;
        }
    }
    input[readOnly] {
  /* background-color: #f0f0f0; */
}
// input type이 "number"일 때 브라우저가 기본적으로 제공하는 화살표 스타일 없애기
input[type="number"] {
  -moz-appearance: textfield; /* Firefox */
}

/* Chrome, Safari, Edge 등 웹킷 기반 브라우저에서도 적용 */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
    textarea {
    border: none;
    background-color: transparent;
    resize: none;
    outline: none;
  }
  
 .pointer{
  cursor: pointer;
 }

`;

export default GlobalStyle;
