import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Router from './components/Router';

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}></ThemeProvider>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  );
}

export default App;
