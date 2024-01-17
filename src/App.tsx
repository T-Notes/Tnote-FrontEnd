import { RecoilRoot } from 'recoil';
import ReactModal from 'react-modal';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import Router from './components/Router';
import { RecoilEnv } from 'recoil';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
ReactModal.setAppElement('#root');

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
