import ReactDOM from 'react-dom/client';
import App from './App';
import ModalsProvider from './modal/ModalsProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <ModalsProvider>
    <App />
  </ModalsProvider>,
);
