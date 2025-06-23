import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App.tsx';
import { Provider } from 'jotai';
import { BrowserRouter as Router } from 'react-router-dom';

const Root = () => (
  <Router>
    <App />
  </Router>
);

createRoot(document.getElementById('root')!).render(
  <Provider>
    <Root />
  </Provider>,
);
